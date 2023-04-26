import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xabaaaa)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/stone_basecolor.jpg'
  )
  const textureNormalMap = textureLoader.load('../static/img/stone_normal.jpg')
  const textureHeightMap = textureLoader.load('../static/img/stone_height.png')
  const textureRoughnessMap = textureLoader.load(
    '../static/img/stone_roughness.jpg'
  )

  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material1 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj1 = new THREE.Mesh(geometry, material1)
  obj1.position.x = -1.5
  scene.add(obj1)

  const material2 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  })
  const obj2 = new THREE.Mesh(geometry, material2)
  obj2.position.x = -0.5
  scene.add(obj2)

  const material3 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
  })
  const obj3 = new THREE.Mesh(geometry, material3)
  obj3.position.x = 0.5
  scene.add(obj3)

  const material4 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
    roughnessMap: textureRoughnessMap,
    roughness: 0.5,
  })
  const obj4 = new THREE.Mesh(geometry, material4)
  obj4.position.x = 1.5
  scene.add(obj4)

  function render(time) {
    time *= 0.001

    obj1.rotation.y += 0.01
    obj2.rotation.y += 0.01
    obj3.rotation.y += 0.01
    obj4.rotation.y += 0.01

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
