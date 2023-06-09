import React from 'react';

type ReadModeProps = {
  readMode: 'random' | 'increment';
  isConnected: boolean;
  handleReadModeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isDeviceSelected: boolean;
};

/**
 * The ReadMode Component
 * @param param0 readMode, isConnected, handleReadModeChange, isDeviceSelected properties
 * @returns - the ReadMode dropdown
 */
function ReadMode ({ readMode, isConnected, handleReadModeChange, isDeviceSelected }: ReadModeProps) {
  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <label htmlFor="readModeSelect">Read Mode:</label>
        <select
          id="readModeSelect"
          className="form-select mb-3 custom-select"
          value={readMode}
          onChange={handleReadModeChange}
          disabled={!isDeviceSelected || isConnected}
        >
          <option value="increment">Increment</option>
          <option value="random">Random</option>
        </select>
      </div>
    </div>
  );
};

export default ReadMode;
