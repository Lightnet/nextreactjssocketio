
import { useSession, signOut, signIn } from "next-auth/react";
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree,render, events } from '@react-three/fiber';

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Foo(props){
  const state = useThree();

  console.log(state);
  /*
  return (<mesh
    {...props}
    ref={ref}
    >

  </mesh>)
  */
}


export default function Component() {

  useEffect(async () => {
    //const state = useThree();
    //const set = useThree((state) => state.set)

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (<>
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  </>);

}