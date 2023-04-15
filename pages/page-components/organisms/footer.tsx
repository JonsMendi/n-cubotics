import React from 'react';
import Link from 'next/link';

/**
 * Footer Component
 * @param param0 - - axisVisible properties
 * @returns - the Footer Component
 */
function Footer({ axisVisible }: any) {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container">
        <div className="row footer-section">
          <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-10 d-flex justify-content-md-end justify-content-center align-items-center text-center">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} João Borges Mendonça. All rights
              reserved. &nbsp;|&nbsp;
              <Link
                href="https://jonsmendi.github.io/3d-portfolio-joaobmendonca/"
                passHref
                target="_blank"
                className="footer-portfolio"
              >
                <span className="cursor-pointer" role="link" tabIndex={0}>
                  Portfolio
                </span>
              </Link>
              {axisVisible && (
                <>
                  &nbsp;|&nbsp;
                  <span style={{ color: "red" }}>x-axis</span>,{" "}
                  <span style={{ color: "green" }}>y-axis</span>,{" "}
                  <span style={{ color: "blue" }}>z-axis</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
