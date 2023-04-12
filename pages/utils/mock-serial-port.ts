import { Readable, Writable } from "stream";
import SerialPort, { BaseBinding } from "serialport";

class MockSerialPort {
  static devices = ["Arduino", "Raspberry Pi", "ESP32"];
  static selectedDevice: string | null = null;
  static selectedBaudRate: number | null = null;

  constructor(options: SerialPort.OpenOptions) {
    /* MockSerialPort.selectedDevice = options.path; */
    MockSerialPort.selectedBaudRate = options.baudRate || null;
    console.log("MockSerialPort connected:", options.baudRate);
  }

  static list(): Promise<any> {
    return Promise.resolve(
      MockSerialPort.devices.map((device, index) => ({
        path: device,
        vendorId: `0x${index + 1}`,
        productId: `0x${index + 1}`,
      }))
    );
  }

  async open(): Promise<void> {
    return Promise.resolve();
  }

  async close(): Promise<void> {
    return Promise.resolve();
  }

  async read(buffer: Buffer, offset: number, length: number): Promise<any> {
    const randomInt = Math.floor(Math.random() * 361); // Random integer between 0-360
    buffer.writeInt32LE(randomInt, offset);
    return Promise.resolve({ bytesRead: length });
  }

  write(buffer: Buffer): Promise<any> {
    return Promise.resolve({ bytesWritten: buffer.length });
  }

  async update(): Promise<void> {
    return Promise.resolve();
  }

  async set(): Promise<void> {
    return Promise.resolve();
  }

  async get(): Promise<any> {
    return Promise.resolve({});
  }

  async drain(): Promise<void> {
    return Promise.resolve();
  }

  async flush(): Promise<void> {
    return Promise.resolve();
  }
}

interface MockBinding extends BaseBinding {
  Binding: typeof MockSerialPort;
}

const MockBinding: MockBinding = {
  Binding: MockSerialPort,
  ...MockSerialPort,
  open: MockSerialPort.prototype.open,
  close: MockSerialPort.prototype.close,
  read: MockSerialPort.prototype.read,
  write: MockSerialPort.prototype.write,
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
