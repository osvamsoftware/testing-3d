import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x404040);
const light = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
const width = window.innerWidth * 0.8;  // Ancho del área de la pantalla
const height = window.innerHeight * 0.8;  // Altura del área de la pantalla

scene.add( light );
//const camera = new THREE.Camera();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

 // Camera
 const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
 camera.position.set(0, 10, 0);
 //camera.fov = 90; // Ajusta el valor según sea necesario
 //const aspectRatio = width / height;
//camera.aspect = aspectRatio;
// camera.updateProjectionMatrix(); // Actualiza la matriz de proyección
const renderer = new THREE.WebGLRenderer();
//renderer.setSize(width, height);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function loadSTLModel(path, position) {
    return new Promise((resolve, reject) => {
        const loader = new STLLoader();
        loader.load(path, (geometry) => {
            /* const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); */
            //const material = new THREE.MeshBasicMaterial();
            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.5,
                roughness: 1,
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            mesh.scale.set(0.1, 0.1, 0.1);
                 // Rotar el objeto 3D alrededor de su eje Y por 180 grados
                 mesh.rotateY(Math.PI); // Math.PI es 180 grados en radianes

            scene.add(mesh);

            resolve();

            controls = new OrbitControls(camera, renderer.domElement);
            /* controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0; */
          /*   controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            controls.dampingFactor = 0.25;
            controls.screenSpacePanning = false; */
            //controls.maxPolarAngle = Math.PI / 2;
        }, undefined, reject);
    });
}

async function init() {
    const modelPath1 = '1-I-libson.stl';
    const modelPath2 = '0-S-libson.stl';
    const modelPath3 = 'BiteAverage_Normal Bite.stl';


    await Promise.all([
        loadSTLModel(modelPath1, new THREE.Vector3(0, 0, 1)),
        loadSTLModel(modelPath2, new THREE.Vector3(0, 0, 2)),
        //loadSTLModel(modelPath3, new THREE.Vector3(0, 0, 0)),
    ]);

    /* camera.position.z = 1;
    camera.position.x = 1; */
    //camera.position.y = 0;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
/* 
window.addEventListener('resize', () => {
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);

/*     const newWidth = window.innerWidth * 0.5;
    const newHeight = window.innerHeight * 0.5;

    renderer.setSize(newWidth, newHeight);
 
   const newAspectRatio = newWidth / newHeight;
    camera.aspect = newAspectRatio;
    camera.updateProjectionMatrix(); 
}); */

init();