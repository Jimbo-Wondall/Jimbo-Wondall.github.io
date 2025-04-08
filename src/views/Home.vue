<template>
  <div class="shader-container">
    <canvas ref="shaderCanvas" class="shader-canvas"></canvas>
    <div class="overlay-text">
      <h1 :style="{ fontSize: fontSize }">
        <span class="stroke-text">Jack Swain</span>
        <span class="fill-text">Jack Swain</span>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import fragmentShader from '!!raw-loader!@/assets/shaders/perlin.glsl'

const shaderCanvas = ref(null)
let renderer, scene, camera, uniforms
const fontSize = ref('5rem')

const updateFontSize = () => {
  const width = window.innerWidth
  const size = Math.min(width * 0.5, 1000) / 10
  fontSize.value = `${size}px`
}

onMounted(() => {
  updateFontSize()
  window.addEventListener('resize', updateFontSize)
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
    fragmentShader
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
  window.removeEventListener('resize', updateFontSize)
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
  font-family: 'Kabisat', sans-serif;
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
  -webkit-text-stroke: 30px black;
  z-index: 0;
}

.fill-text {
  color: white;
  z-index: 1;
}

</style>
