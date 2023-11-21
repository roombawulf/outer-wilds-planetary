varying vec2 v_uv;
varying vec3 v_pos;
varying vec3 v_normal;
uniform float time;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

void main(){

    float F = 0.1;
    float A = 2.0;

    vec3 temporalPos = vec3(
        1.0 * v_pos.x,
        0.1 * v_pos.y - (5.0 * time),
        1.0 * v_pos.z
    );

    float sand = A * noise(F * temporalPos);
    sand = smoothstep(
        0.25, 
        0.75,
        floor(sand * 25.0) / 30.0
    );

    vec3 sandy = vec3(0.8, 0.6, 0.6) * 0.2;
    gl_FragColor = vec4(sandy, sand);
}