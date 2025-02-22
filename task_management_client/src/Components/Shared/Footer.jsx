import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer w-11/12 mx-auto text-textDark items-center py-4">
      <aside className="grid-flow-col items-center">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved ||{" "}
          <a
            className="font-semibold hover:underline"
            href="https://ripanulalam.netlify.app"
          >
            Ripanul Alam
          </a>
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://www.facebook.com/rrdesignhub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="w-6 h-6 text-primary hover:text-primary transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/ripanul-alam-ridoy-ab00652a6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="w-6 h-6 text-primary hover:text-primary transition-colors" />
        </a>
        <a href="https://github.com/RRDesignHub" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-6 h-6 text-primary hover:text-primary transition-colors" />
        </a>
      </nav>
    </footer>
  );
}
