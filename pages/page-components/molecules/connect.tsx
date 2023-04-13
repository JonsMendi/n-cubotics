import React from 'react';

type ConnectProps = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  isDeviceSelected: boolean;
};

const Connect: React.FC<ConnectProps> = ({ isConnected, connect, disconnect, isDeviceSelected }) => {
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        {!isConnected && (
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={connect}
            disabled={!isDeviceSelected}
          >
            Connect
          </button>
        )}
        {isConnected && (
          <button
            className="btn btn-primary w-100"
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
