#define NUM_OCTAVES 5

varying vec3 v_position;
varying vec3 v_normal;
uniform float time;

float max3 (vec3 v) {
    return max (max (v.x, v.y), v.z);
}

// Precision-adjusted variations of https://www.shadertoy.com/view/4djSRW
float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }

float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);
    vec3 i = floor(x);
    vec3 f = fract(x);
    float n = dot(i, step);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
                mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

// fractal noise from https://www.shadertoy.com/view/tltXWM )
float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100.0);
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

vec3 generateSurface(vec3 x){
    vec3 f1 = vec3(0.0);
    vec3 f2 = vec3(0.0);
    float v = 0.0;

    vec3 color = vec3(0.0);

    x.z *= 3.0;
    f1 = vec3( fbm(x + 0.01 * time), fbm(x), fbm(x));
    f2 = vec3( fbm(x + f1 + 0.02 * time), fbm(x+f1), fbm(x+f1) );
    v = fbm(x + f2 + 0.05 * time);

    vec3 topColor = vec3(0.0, 0.0, 0.1);
    vec3 botColor = vec3(0.0, 0.0, 0.1);
    vec3 midColor1 = vec3(0.0, 0.0, 0.2);
    vec3 midColor2 = vec3(0.0, 0.2, 0.3);
    vec3 midColor3 = vec3(0.0, 0.5, 0.0);
    
    vec3 midColor = mix( midColor1, midColor2, clamp(f2, 0.0, 1.0) );
    midColor = mix( midColor, midColor3, clamp(f1, 0.0, 1.0) );
    midColor = midColor;

    float pos = v * 2.0 - 1.0;
    color = mix( midColor, topColor, clamp(pos, 0.0, 1.0) );
    color = mix( color, botColor, clamp(-pos, 0.0, 1.0) );

    color = color / max3(color);

    color = (clamp((0.4 * pow(v,3.) + pow(v,2.) + 0.0*v), 0.0, 1.0) * 0.9 + 0.1) * color;

    return color;
}


vec3 lambertLighting( vec3 diffuse, vec3 normal ) {
    vec3 lightColor = vec3( 0.75, 0.0, 0.0 );
    vec3 lightPos = vec3( -25.0, 25.0, 0.0 );

    vec3 lightDir = normalize( lightPos - v_position );
    vec3 color = dot( lightDir, normal ) * diffuse + ( diffuse * 0.5 );

    return color;
}

void main(){
    vec3 pos = v_position;
    vec3 normal = v_normal;

    vec3 outColor = generateSurface( pos );
    outColor = lambertLighting( outColor, normal);
    gl_FragColor = vec4(outColor, 1.0);
}