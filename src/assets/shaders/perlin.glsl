
uniform vec3 iResolution;
uniform float iTime;

float function(float x) {
  x = 1.0 - pow(1.0 - x, 5.0);
  if (x < 0.5) return 0.0;
  return 1.0;
}

vec2 n22(vec2 p) {
  vec3 a = fract(p.xyx * vec3(123.34, 234.34, 345.65));
  a += dot(a, a + 34.45);
  return fract(vec2(a.x * a.y, a.y * a.z));
}

vec2 get_gradient(vec2 pos) {
  float angle = (n22(pos).x * 6.283185) + (iTime * 0.5);
  return vec2(cos(angle), sin(angle));
}

float perlin_noise(vec2 uv, float cells_count) {
  vec2 pos = uv * cells_count;
  vec2 cell = floor(pos);
  vec2 local = pos - cell;
  vec2 blend = local * local * (3.0 - 2.0 * local);

  vec2 lt = cell + vec2(0, 1);
  vec2 rt = cell + vec2(1, 1);
  vec2 lb = cell;
  vec2 rb = cell + vec2(1, 0);

  float lt_dot = dot(pos - lt, get_gradient(lt));
  float rt_dot = dot(pos - rt, get_gradient(rt));
  float lb_dot = dot(pos - lb, get_gradient(lb));
  float rb_dot = dot(pos - rb, get_gradient(rb));

  float val = mix(mix(lb_dot, rb_dot, blend.x), mix(lt_dot, rt_dot, blend.x), blend.y);
  float normalized = 0.5 + 0.5 * (val / 0.7);
  return function(abs((normalized * 2.0) - 1.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.y;
  float val = perlin_noise(uv, 10.0);
  gl_FragColor = vec4(vec3(val), 1.0);
}