import { Readable, Writable } from "stream";
import SerialPort, { BaseBinding } from "serialport";

// A mock implementation of the SerialPort library for testing purposes
class MockSerialPort {
  static devices = ["Arduino", "Raspberry Pi", "ESP32"];
  static selectedDevice: string | null = null;
  static selectedBaudRate: number | null = null;
  static currentValue = 0;
  static readMode: 'random' | 'increment' = 'random';

  constructor(options: SerialPort.OpenOptions) {
    MockSerialPort.selectedBaudRate = options.baudRate || null;
  }

  // A static method that returns a list of mocked devices
  static list(): Promise<any> {
    return Promise.resolve(
      MockSerialPort.devices.map((device, index) => ({
        path: device,
        vendorId: `0x${index + 1}`,
        productId: `0x${index + 1}`,
      }))
    );
  }

  // A method that simulates opening a serial port
  async open(): Promise<void> {
    return Promise.resolve();
  }

  // A method that simulates closing a serial port
  async close(): Promise<void> {
    return Promise.resolve();
  }
  
  // A method that simulates reading data from a serial port with a given read mode
  async read(buffer: Buffer, offset: number, length: number, mode: 'random' | 'increment'): Promise<any> {
    let value: number;

    if (mode === 'random') {
      value = Math.floor(Math.random() * 361);
    } else {
      value = MockSerialPort.currentValue;
      MockSerialPort.currentValue = (MockSerialPort.currentValue + 1) % 361;
    }

    buffer.writeInt32LE(value, offset);
    return Promise.resolve({ bytesRead: length });
  }

  // A method that simulates writing data to a serial port
  write(buffer: Buffer): Promise<any> {
    return Promise.resolve({ bytesWritten: buffer.length });
  }

  // A method that simulates updating the serial port settings
  async update(): Promise<void> {
    return Promise.resolve();
  }

  // A method that simulates setting serial port control signals
  async set(): Promise<void> {
    return Promise.resolve();
  }

  // A method that simulates getting the current serial port control signals
  async get(): Promise<any> {
    return Promise.resolve({});
  }

  // A method that simulates waiting for all writes to finish
  async drain(): Promise<void> {
    return Promise.resolve();
  }

  // A method that simulates clearing the serial port buffer
  async flush(): Promise<void> {
    return Promise.resolve();
  }
}

// A binding that extends the BaseBinding interface from the SerialPort library
interface MockBinding extends BaseBinding {
  Binding: typeof MockSerialPort;
}

const MockBinding: MockBinding = {
  Binding: MockSerialPort,
  ...MockSerialPort,
  open: MockSerialPort.prototype.open,
  close: MockSerialPort.prototype.close,
  // Override the read method to use the read mode defined in the MockSerialPort class
  read: function (buffer: Buffer, offset: number, length: number): Promise<any> {
    // Default mode to 'random' if not provided
    const mode = this.Binding.readMode || 'random';
    return MockSerialPort.prototype.read.call(this, buffer, offset, length, mode);
  },
  write: MockSerialPort.prototype.write,
  // Override the read method to use the read mode defined in the MockSerialPort class
  update: async function (options: { baudRate: number }): Promise<void> {
    if (!this.Binding.selectedDevice) {
      throw new Error("Device not connected");
    }

    this.Binding.selectedBaudRate = options.baudRate;
    console.log("MockBinding update", this.Binding.selectedDevice, this.Binding.selectedBaudRate);
    return Promise.resolve();
  },
  set: MockSerialPort.prototype.set,
  get: MockSerialPort.prototype.get,
  drain: MockSerialPort.prototype.drain,
  flush: MockSerialPort.prototype.flush,
};


export default MockBinding;
