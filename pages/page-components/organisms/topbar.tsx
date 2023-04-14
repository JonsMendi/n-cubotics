import React from 'react';
import Image from 'next/image';

function TopBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center"
          target="_blank"
          href="https://www.nrobotics.com/"
        >
          <Image
            src="/n-robotics-logo.jpeg"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="ms-2 text-white">Robotics | challenge</span>
        </a>
      </div>
    </nav>
  );
};

export default TopBar;
