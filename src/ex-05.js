import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xe6e6e6)

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

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff7f00 })
  const obj1 = new THREE.Mesh(geometry, material1)
  obj1.position.x = -3
  scene.add(obj1)

  const material2 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 0.7,
    roughness: 0.3,
    // wireframe: true,
    // transparent: true,
    // opacity: 0.5,
  })
  const obj2 = new THREE.Mesh(geometry, material2)
  obj2.position.x = -1.5
  scene.add(obj2)

  const material3 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1,
    clearcoatRoughness: 0.3,
  })
  const obj3 = new THREE.Mesh(geometry, material3)
  obj3.position.x = 0
  scene.add(obj3)

  const material4 = new THREE.MeshLambertMaterial({ color: 0xff7f00 })
  const obj4 = new THREE.Mesh(geometry, material4)
  obj4.position.x = 1.5
  scene.add(obj4)

  const material5 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 60,
    specular: 0x004fff,
  })
  const obj5 = new THREE.Mesh(geometry, material5)
  obj5.position.x = 3
  scene.add(obj5)

  function render(time) {
    time *= 0.001

    obj1.rotation.y += 0.01
    obj2.rotation.y += 0.01
    obj3.rotation.y += 0.01
    obj4.rotation.y += 0.01
    obj5.rotation.y += 0.01

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
