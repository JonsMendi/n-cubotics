import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center text-center">
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
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
