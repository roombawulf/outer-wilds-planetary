varying vec2 v_uv;
uniform float time;

void main() {
    vec3 pos = position;
    float speed = -time * 0.5;

    pos.x += sin(8.0 * uv.y + speed) * uv.y;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec4 viewPos = viewMatrix * worldPos;
    vec4 projectedPos = projectionMatrix * viewPos;

    v_uv = uv;

    gl_Position = projectedPos;
}