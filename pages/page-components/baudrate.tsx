type BaudRateProps = {
  selectedDevice: string;
  baudRates: Record<string, number>;
  handleBaudRateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BaudRate = ({ selectedDevice, baudRates, handleBaudRateChange }: BaudRateProps) => {
  const baudRateSelect = [9600, 19200, 38400, 57600, 115200];

  return (
    <div className='baudrate'>
      <label htmlFor="baudRate">Select the Baud Rate:</label>
      <select
        id="baudRate"
        name="baudRate"
        value={baudRates[selectedDevice]}
        onChange={handleBaudRateChange}
      >
        {baudRateSelect.map(baudRate => (
          <option key={baudRate} value={baudRate}>
            {baudRate}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaudRate;
