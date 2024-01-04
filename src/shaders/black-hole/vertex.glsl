varying vec3 v_position_world;
varying vec3 v_normal_world;
varying mat4 v_projection_matrix;

void main(){


    vec4 position_world = modelMatrix * vec4(position, 1.0); 
    vec4 position_view = viewMatrix * position_world; 
    vec4 position_projection = projectionMatrix * position_view;

    v_position_world = position_world.xyz;
    v_normal_world = (modelMatrix * vec4(normal, 1.0)).xyz;
    v_projection_matrix = projectionMatrix;

    gl_Position = position_projection;
}