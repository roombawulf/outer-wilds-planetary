void main() {

    float distanceFactor = pow(2.0 - distance(position, vec3(0.0)), 1.5);
    float size = distanceFactor * 1.5 + 3.0;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = size;
    
    // Size attenuation;
    gl_PointSize *= (1.0 / - viewPosition.z);

}