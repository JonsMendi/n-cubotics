# N-Cubotics
## 3D Cube with Serial Port Connection

This is a web application built with Next.js and Typescript that displays a 3D cube using Three.js. The cube can be connected to a device through a serial port, using the SerialPort library. A list of possible mock devices is provided, including "Arduino", "Raspberry Pi" and "ESP32". The connected device will emit values between 0 and 360 degrees, which will cause the cube to rotate accordingly.

## Live Demo

Check out the live demo [here](https://your-demo-url.com).

## Usage

To use the app, follow these steps:

1. Choose a device from the list provided
2. Select the baud rate (either "9600", "19200", "38400", "57600" or "115200")
3. Select the read mode (either "Random" or "Increment")
4. Click "Connect" to activate the device and start receiving values
5. Use the orbit camera to view the cube from different angles
6. To switch to a different device, baud rate, or read mode, first click "Disconnect" the current device, then choose a new device and settings, and click "Connect" again.

## Technologies Used

This app was built using the following technologies:

- Next.js
- Typescript
- Three.js
- SerialPort
- Tween.js
- Bootstrap
- (Used Node.js version = v16.17.0)
## Installation

To install and run the app locally, follow these steps:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Open a web browser and navigate to `http://localhost:3000`

That's it! If you have any questions or issues, please feel free to contact us.

## Acknowledgements

We would like to thank the following people and resources for their help and inspiration:

- [Three.js documentation](https://threejs.org/docs/)
- [SerialPort library documentation](https://serialport.io/docs/)
- [Bootstrap documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [Tween.js documentation](https://github.com/tweenjs/tween.js/)
- [Next.js documentation](https://nextjs.org/docs/)

## License

This app is licensed under the MIT license. See the LICENSE file for more details.