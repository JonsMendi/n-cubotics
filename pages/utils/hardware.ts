import SerialPort from "serialport";
import MockBinding from "./mock-serial-port";

SerialPort.Binding = MockBinding;