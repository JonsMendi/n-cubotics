import SerialPort from 'serialport/test';

// Create a mock serial port object
const mockSerialPort = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600,
});

// Use the mock serial port object to send data
mockSerialPort.write('123');

// Open the serial port to start communication
mockSerialPort.open(() => {
  console.log('Serial port opened');
});