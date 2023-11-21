varying float v_phase;
varying vec2 v_uv;
varying vec3 v_color;

uniform float time;

void main() {

    float F = 0.25; // pulse speed
    float A = 2.5; // pulsation intensity (half of desired range)

    float period = 12.5 + 2.5 * sin(2.0 * 3.14159 * F * time + v_phase) * A;

    vec3 color;
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, period);
    color = mix(vec3(0.0), v_color, strength);

    gl_FragColor = vec4(color, strength);
}