#define POINTS_FROM_CAMERA 4 // number sample points along camera ray
#define OPTICAL_DEPTH_POINTS 4 // number sample points along light ray

uniform vec3 cameraPos;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;

uniform vec3 sunPosition;
uniform vec3 planetPosition; // planet position in world space

uniform float planetRadius; // planet radius for height calculations
uniform float atmosphereRadius; // atmosphere radius (calculate from planet center)

uniform float falloffFactor; // controls exponential opacity falloff
uniform float sunIntensity; // controls atmosphere overall brightness
uniform float scatteringStrength; // controls color dispersion
uniform float densityModifier; // density of the atmosphere

uniform vec3 wavelength;

vec3 worldFromUV(float depth) {
    vec4 position = viewMatrixInverse * projectionMatrixInverse * vec4(vec3(vUv, depth) * 2.0 - 1.0, 1.0);
    return position.xyz / position.w;
}

bool rayIntersectSphere(vec3 rayOrigin, vec3 rayDir, vec3 spherePosition, float sphereRadius, out float t0, out float t1) {
    vec3 relativeOrigin = rayOrigin - spherePosition; // rayOrigin in sphere space

    float a = 1.0;
    float b = 2.0 * dot(relativeOrigin, rayDir);
    float c = dot(relativeOrigin, relativeOrigin) - sphereRadius*sphereRadius;
    
    float d = b*b - 4.0*a*c;

    if(d < 0.0) return false; // no intersection

    float r0 = (-b - sqrt(d)) / (2.0*a);
    float r1 = (-b + sqrt(d)) / (2.0*a);

    t0 = min(r0, r1);
    t1 = max(r0, r1);

    return (t1 >= 0.0);
}

float densityAtPoint(vec3 densitySamplePoint) {
    float heightAboveSurface = length(densitySamplePoint - planetPosition) - planetRadius; // actual height above surface
    float height01 = heightAboveSurface / (atmosphereRadius - planetRadius); // normalized height between 0 and 1
    
    float localDensity = densityModifier * exp(-height01 * falloffFactor); // density with exponential falloff
    localDensity *= (1.0 - height01); // make it 0 at maximum height

    return localDensity;
}

float opticalDepth(vec3 rayOrigin, vec3 rayDir, float rayLength) {

    float stepSize = rayLength / (float(OPTICAL_DEPTH_POINTS) - 1.0); // ray length between sample points
    
    vec3 densitySamplePoint = rayOrigin; // that's where we start
    float accumulatedOpticalDepth = 0.0;

    for(int i = 0 ; i < OPTICAL_DEPTH_POINTS ; i++) {
        float localDensity = densityAtPoint(densitySamplePoint); // we get the density at the sample point

        accumulatedOpticalDepth += localDensity * stepSize; // linear approximation : density is constant between sample points

        densitySamplePoint += rayDir * stepSize; // we move the sample point
    }

    return accumulatedOpticalDepth;
}

vec3 calculateLight(vec3 rayOrigin, vec3 rayDir, float rayLength) {

    vec3 samplePoint = rayOrigin; // first sampling point coming from camera ray

    vec3 sunDir = normalize(sunPosition - planetPosition); // direction to the light source

    vec3 scatteringCoeffs = pow(1063.0 / wavelength.xyz, vec3(4.0)) * scatteringStrength; // the scattering is inversely proportional to the fourth power of the wave length;
    // about the 1063, it is just a constant that makes the scattering look good
    scatteringCoeffs /= planetRadius; // Scale invariance by Yincognyto https://github.com/BarthPaleologue/volumetric-atmospheric-scattering/issues/6#issuecomment-1432409930

    float stepSize = rayLength / (float(POINTS_FROM_CAMERA) - 1.0); // the ray length between sample points

    vec3 inScatteredLight = vec3(0.0); // amount of light scattered for each channel

    for (int i = 0 ; i < POINTS_FROM_CAMERA ; i++) {

        float sunRayLengthInAtm = atmosphereRadius - length(samplePoint - planetPosition); // distance traveled by light through atmosphere from light source
        float t0, t1;
        if(rayIntersectSphere(samplePoint, sunDir, planetPosition, atmosphereRadius, t0, t1)) {
            sunRayLengthInAtm = t1;
        }

        float sunRayOpticalDepth = opticalDepth(samplePoint, sunDir, sunRayLengthInAtm); // scattered from the sun to the point
        
        float viewRayLengthInAtm = stepSize * float(i); // distance traveled by light through atmosphere from sample point to cameraPosition
        float viewRayOpticalDepth = opticalDepth(samplePoint, -rayDir, viewRayLengthInAtm); // scattered from the point to the camera
        
        vec3 transmittance = exp(-(sunRayOpticalDepth + viewRayOpticalDepth) * scatteringCoeffs); // exponential scattering with coefficients
        
        float localDensity = densityAtPoint(samplePoint); // density at sample point

        inScatteredLight += localDensity * transmittance * scatteringCoeffs * stepSize; // add the resulting amount of light scattered toward the camera
        
        samplePoint += rayDir * stepSize; // move sample point along view ray
    }

    // scattering depends on the direction of the light ray and the view ray : it's the rayleigh phase function
    // https://glossary.ametsoc.org/wiki/Rayleigh_phase_function
    float costheta = dot(rayDir, sunDir);
    float phaseRayleigh = 3.0 / (16.0 * PI) * (1.0 + costheta * costheta);
    
    inScatteredLight *= phaseRayleigh; // apply rayleigh pahse
    inScatteredLight *= sunIntensity; // multiply by the intensity of the sun

    return inScatteredLight;
}

vec3 scatter(vec3 originalColor, vec3 rayOrigin, vec3 rayDir, float maximumDistance) {
    float impactPoint, escapePoint;
    if (!(rayIntersectSphere(rayOrigin, rayDir, planetPosition, atmosphereRadius, impactPoint, escapePoint))) {
        return originalColor; // if not intersecting with atmosphere, return original color
    }

    impactPoint = max(0.0, impactPoint); // cannot be negative (the ray starts where the camera is in such a case)
    escapePoint = min(maximumDistance, escapePoint); // occlusion with other scene objects

    float distanceThroughAtmosphere = max(0.0, escapePoint - impactPoint); // probably doesn't need the max but for the sake of coherence the distance cannot be negative
    
    vec3 firstPointInAtmosphere = rayOrigin + rayDir * impactPoint; // the first atmosphere point to be hit by the ray

    vec3 light = calculateLight(firstPointInAtmosphere, rayDir, distanceThroughAtmosphere); // calculate scattering
    
    return originalColor * (1.0 - light) + light; // blending scattered color with original color
}

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {

    vec3 deepestPoint = worldFromUV( depth ) - cameraPos;
    float maximumDistance = length(deepestPoint);

    vec3 rayOrigin = cameraPos;
    vec3 rayDir = deepestPoint / length(deepestPoint);
    vec3 finalColor = scatter(inputColor.rgb, rayOrigin, rayDir, maximumDistance);

	outputColor = vec4(finalColor, 1.0);
}