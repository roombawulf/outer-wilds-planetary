in vec3 colors;

varying vec2 v_uv;
varying vec3 v_color;

void main() {

    v_uv = uv;
    v_color = colors;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 1000.0;
    
    // Size attenuation;
    gl_PointSize *= (1.0 / - viewPosition.z);

}