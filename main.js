import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(8, 2, 2, 100)
const saturnRingTexture = new THREE.TextureLoader().load('./assets/saturnRingTexture.jpeg')
const material = new THREE.MeshStandardMaterial({ map: saturnRingTexture} )
const saturnRing = new THREE.Mesh(geometry, material)
saturnRing.rotation.x += 5

scene.add(saturnRing)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    // const startTexture = new THREE.TextureLoader().load('./assets/starTexture.jpeg')
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    // const material = new THREE.MeshStandardMaterial({map: startTexture})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() =>  THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg')
scene.background = spaceTexture

// Saturn

const saturnTexture = new THREE.TextureLoader().load('./assets/saturnTexture.jpg')
const saturnGroundTexture = new THREE.TextureLoader().load('./assets/normal.jpg')
const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32,32),
    new THREE.MeshStandardMaterial({
    map: saturnTexture,
    normalMap: saturnGroundTexture
})
)
saturn.rotation.x += 0.5

scene.add(saturn)


function moveCamera () {
    const t = document.body.getBoundingClientRect().top

    saturn.rotation.x += 0.05
    saturn.rotation.y += 0.075
    saturn.rotation.z += 0.05

    saturnRing.rotation.x += 0.05
    saturnRing.rotation.y += 0.075
    saturnRing.rotation.z += 0.05
    
    camera.rotation.x = t * -0.05
    camera.rotation.y = t * -0.075
    camera.rotation.z = t * -0.05
}

document.body.onscroll = moveCamera


function animate() {
    requestAnimationFrame(animate);

    saturnRing.rotation.z += 0.0035

    renderer.render(scene, camera)

    controls.update()
}

animate()
