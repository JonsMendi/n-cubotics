import React from 'react';

const BaudRates = [9600, 19200, 38400, 57600, 115200];

type BaudRateProps = {
  baudRate: number;
  isConnected: boolean;
  handleBaudRateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isDeviceSelected: boolean;
};

const BaudRate: React.FC<BaudRateProps> = ({
  baudRate,
  isConnected,
  handleBaudRateChange,
  isDeviceSelected
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-10 mx-auto">
        <label htmlFor="">Baud rate:</label>
        <select
          className="form-select serial-port-select"
          value={baudRate}
          onChange={handleBaudRateChange}
          disabled={!isDeviceSelected || isConnected}
        >
          {BaudRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BaudRate;
