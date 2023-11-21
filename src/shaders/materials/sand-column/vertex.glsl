varying vec2 v_uv;
varying vec3 v_pos;
varying vec3 v_normal;

void main(){

    v_uv = uv;
    v_pos = position;
    v_normal = normal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}