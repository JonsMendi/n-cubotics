import React from 'react';

type ConnectProps = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  isDeviceSelected: boolean;
};

/**
 * The Connect Component
 * @param param0 - isConnected, connect, disconnect, isDeviceSelected properties
 * @returns - the Connect button
 */
function Connect ({ isConnected, connect, disconnect, isDeviceSelected }: ConnectProps) {
  return (
    <div className="row mt-5 mb-4">
      <div className="col-md-10 mx-auto">
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
