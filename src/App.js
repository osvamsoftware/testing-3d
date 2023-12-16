import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas
          camera={{ position: [2, 2, 2] }}
          style={{ height: '80vh', width: '80vw' }}
          // shadowMap // Habilita el mapeo de sombras en el canvas
        >
          {/* <Scene /> */}
          <Box />
          <ambientLight intensity={.3}/>
          <spotLight position= {[2, 5, 2]} angle= {0.5} intensity={10}/>
          <OrbitControls />
        </Canvas>
      </header>
    </div>
  );
}

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );}

