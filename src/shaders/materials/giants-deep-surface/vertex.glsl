varying vec3 v_position;
varying vec3 v_normal;

void main(){

    v_position = position;
    v_normal = normal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}