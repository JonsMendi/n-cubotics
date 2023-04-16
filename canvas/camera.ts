import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type CameraControlsProps = {
  orbitCamera: 'left' | 'right' | null;
  cubeAnimationRef: React.RefObject<THREE.Mesh>;
};

/**
 * CameraControls component
 * @param param0 - orbitCamera parameter controls the direction of the camera's orbit
 * @returns - null, since it doesn't render anything in the scene
 */
function CameraControls ({ orbitCamera, cubeAnimationRef }: CameraControlsProps) {
  const { camera } = useThree();

  useFrame(() => {
    if (cubeAnimationRef.current && camera) {
      // Clone the position of cubeAnimation object
      const targetPosition = cubeAnimationRef.current.position.clone();
      // Define the axis of rotation
      const orbitAxis = new THREE.Vector3(0, 0, 1);
      // Define the speed of rotation
      const rotationSpeed = 0.01;

      // Check if orbitCamera is 'left' or 'right' and set the direction accordingly
      if (orbitCamera === 'left' || orbitCamera === 'right') {
        const direction = orbitCamera === 'left' ? -1 : 1;
        // Clone the camera position
        const currentPos = camera.position.clone();
        // Clone the target position
        const orbitCenter = targetPosition.clone();
        // Calculate the distance between the camera and the target
        const distance = currentPos.distanceTo(orbitCenter);

        // Create a quaternion for rotation
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(orbitAxis, direction * rotationSpeed);

        // Calculate the new position of the camera after rotation
        camera.position.sub(orbitCenter);
        camera.position.applyQuaternion(quaternion);
        camera.position.add(orbitCenter);
        // Update the camera's lookAt target
        camera.lookAt(orbitCenter);
      }
    }
  });

  return null;
};

export default CameraControls;
