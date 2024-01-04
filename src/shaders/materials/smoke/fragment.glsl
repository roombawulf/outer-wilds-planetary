varying vec2 v_uv;
uniform sampler2D map;
uniform float time;

void main() {

    vec2 uv = v_uv;
    uv.y -= 0.1 * time;
    vec4 diffuse = texture2D(map, uv);

    gl_FragColor = vec4(diffuse.rgb, diffuse.a * sin(4.0 * v_uv.y));
    #include <colorspace_fragment>
}