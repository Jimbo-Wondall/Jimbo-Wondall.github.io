<template>
  <div class="shader-container">
    <canvas ref="shaderCanvas" class="shader-canvas"></canvas>
    <div class="overlay-text">
      <h1>
        <span class="stroke-text">Jack Swain</span>
        <span class="fill-text">Jack Swain</span>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const shaderCanvas = ref(null)
let renderer, scene, camera, uniforms

onMounted(() => {
  const canvas = shaderCanvas.value
  const parent = canvas?.parentElement

  scene = new THREE.Scene()
  camera = new THREE.Camera()
  camera.position.z = 1

  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(parent.clientWidth, parent.clientHeight)

  uniforms = {
    iTime: { value: 0 },
    iResolution: {
      value: new THREE.Vector3(parent.clientWidth, parent.clientHeight, 1)
    }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    fragmentShader: `
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
      float angle = n22(pos).x * 6.283185 * (iTime * 0.2);
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
    }`
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  function animate(t) {
    uniforms.iTime.value = t * 0.001
    renderer.setSize(parent.clientWidth, parent.clientHeight)
    uniforms.iResolution.value.set(parent.clientWidth, parent.clientHeight, 1)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
  window.addEventListener('resize', () => animate(0))
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => animate(0))
})
</script>

<style scoped>
.shader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shader-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
}

.overlay-text {
  position: relative;
  top: 50%;
}

.overlay-text h1 {
  position: relative;
  font-size: 5rem;
  font-family: 'KabisatDemo', sans-serif;
  margin: 0;
  line-height: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 1;
  padding: 1rem;
}

.stroke-text,
.fill-text {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: nowrap;
  width: 100%;
  height: 100%;
}

.stroke-text {
  color: transparent;
  -webkit-text-stroke: 25px black;
  z-index: 0;
}

.fill-text {
  color: white;
  z-index: 1;
}

</style>
