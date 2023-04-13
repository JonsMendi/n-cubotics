import React from 'react';

type ConnectProps = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  isDeviceSelected: boolean;
};

const Connect: React.FC<ConnectProps> = ({ isConnected, connect, disconnect, isDeviceSelected }) => {
  return (
    <div className="row mt-4 mb-4">
      <div className="col-md-3 mx-auto">
        {!isConnected && (
          <button
            className="button-connection w-100"
            type="button"
            onClick={connect}
            disabled={!isDeviceSelected}
          >
            Connect
          </button>
        )}
        {isConnected && (
          <button
            className="button-connection w-100"
            type="button"
            onClick={disconnect}
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Connect;
