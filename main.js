import './style.css'

import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
const loader = new GLTFLoader()

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render( scene, camera)

const geometry = new THREE.TorusGeometry(5, 1, 4, 25)
const material = new THREE.MeshStandardMaterial({ 
  color: 0xffffff,
  wireframe: true
})
const torus = new THREE.Mesh(geometry, material)

const torus2 = new THREE.Mesh(geometry, material)

// scene.add(torus)
// scene.add(torus2)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,10,15)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(5,10,15)
scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)


const addStar = () => {
  const geometry = new THREE.OctahedronGeometry(0.25, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true
  })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y,z)  
  scene.add(star)
}

Array(300).fill().forEach(addStar)

const starFieldTexture = new THREE.TextureLoader().load('starField.jpeg')
scene.background = starFieldTexture

loader.load( '/austonLowPolyRough.glb', function ( gltf ) {

	scene.add( gltf.scene )

}, undefined, function ( error ) {

	console.error( error )

} )


function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += -0.005
  torus.rotation.y += -0.005
  torus.rotation.z += -0.005

  torus2.rotation.x -= -0.005
  torus2.rotation.y -= -0.003
  torus2.rotation.z -= -0.003

  scene.rotation.z += 0.001
  scene.rotation.y += 0.001

  controls.update()

  renderer.render(scene, camera)
}

animate()

function moveCamera(){

  const t = document.body.getBoundingClientRect().top
  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
  camera.rotateOnAxis.z = t * -1


}

document.body.onscroll = moveCamera