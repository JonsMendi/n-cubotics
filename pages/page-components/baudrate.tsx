import { useState } from "react";

const BaudRates = [9600, 19200, 38400, 57600, 115200];

type BaudRateProps = {
  onUpdate: (baudRate: number) => void;
  disabled: boolean;
  currentBaudRate: number;
};

export default function BaudRate({
  onUpdate,
  disabled,
  currentBaudRate,
}: BaudRateProps) {
  const [baudRate, setBaudRate] = useState(currentBaudRate);

  const handleBaudRateChange = (event: { target: { value: string } }) => {
    const newBaudRate = parseInt(event.target.value, 10);
    setBaudRate(newBaudRate);
    onUpdate(newBaudRate);
  };

  return (
    <div className="baudrates">
      <select
        value={baudRate}
        onChange={handleBaudRateChange}
        disabled={disabled}
      >
        {BaudRates.map((rate) => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </select>
    </div>
  );
}
