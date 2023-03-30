import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x00ff00)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const geometry1 = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const material1 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj1 = new THREE.Mesh(geometry1, material1)
  obj1.position.x = -2
  scene.add(obj1)

  const geometry2 = new THREE.ConeGeometry(0.6, 0.9, 6)
  const material2 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj2 = new THREE.Mesh(geometry2, material2)
  scene.add(obj2)

  const geometry3 = new THREE.IcosahedronGeometry(0.5, 0)
  const material3 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj3 = new THREE.Mesh(geometry3, material3)
  obj3.position.x = 2
  scene.add(obj3)

  function render(time) {
    time *= 0.0005

    obj1.rotation.y = time
    obj2.rotation.y = time
    obj3.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
