varying vec2 v_uv;
varying vec3 v_color;

void main() {

    vec3 color;
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 15.0);
    color = mix(vec3(0.0), v_color, strength);

    gl_FragColor = vec4(color, strength);
}