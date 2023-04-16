import * as THREE from "three";

/**
 * The Axis class
 * @returns - the 3 axis in their respective positions
 */
function Axis() {

  /**
   * Create an axis line
   * @param start - Start point of the line (THREE.Vector3)
   * @param end - End point of the line (THREE.Vector3)
   * @param color - Color of the line (string)
   * @returns - A THREE.Line object with the specified start, end, and color
   */
  const createAxisLine = (start: THREE.Vector3, end: THREE.Vector3, color: string) => {
    const material = new THREE.LineBasicMaterial({ color: new THREE.Color(color as THREE.ColorRepresentation) });
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const line = new THREE.Line(geometry, material);
    return line;
  };

   // Create the x-axis line with red color
   const xAxis = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0), 'red');
   // Create the y-axis line with green color
   const yAxis = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0), 'green');
   // Create the z-axis line with blue color
   const zAxis = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 3), 'blue'); 
 

  return (
    <>
      <primitive object={new THREE.Line(xAxis.geometry, xAxis.material)} />
      <primitive object={new THREE.Line(yAxis.geometry, yAxis.material)} />
      <primitive object={new THREE.Line(zAxis.geometry, zAxis.material)} />
    </>
  );
};

export default Axis;