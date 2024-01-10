uniform sampler2D sceneBuffer;
uniform vec2 resolution;
varying vec3 v_position_world;
varying vec3 v_normal_world;
varying mat4 v_projection_matrix;



void main() {

    vec3 eye_vector = normalize(v_position_world - cameraPosition);
    float inv_fresnel = abs(dot(eye_vector, v_normal_world));
    float fresnel = 1.0 - inv_fresnel;
    fresnel = pow(fresnel, 25.0);
    float grav_lens = 3.0 * pow((1.0 - fresnel), exp(4.0));

    vec3 v_inv_normal_world = -v_normal_world;
    v_inv_normal_world = (viewMatrix * vec4(v_inv_normal_world, 1.0)).xyz;
    vec2 xy = v_inv_normal_world.xy;

    float black_hole = round(smoothstep(0.0, 0.015, fresnel));
    float dist = distance(cameraPosition, v_position_world);
    float fov = 0.4363;
    float vert_h = 2.0 * tan(fov/2.0) * dist;
    float scale = 1.0 / vert_h;


    vec2 screen_uv = gl_FragCoord.xy / resolution;
    vec4 out_color = texture2D(sceneBuffer, screen_uv + (xy * grav_lens * scale));
    out_color *= black_hole;

    gl_FragColor = out_color;

    #include <colorspace_fragment>
}