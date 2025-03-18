import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import NavbarLinks from "./NavbarLinks";
import { Link } from "react-router-dom";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  if (!menuOpen) return null;

  return (
    <div ref={menuRef} className="md:hidden bg-white shadow-md py-4 px-6 absolute top-16 w-full text-center">
      <ul className="flex flex-col gap-4 text-black font-medium">
        {NavbarLinks.map((link, index) => (
          <li key={index} className="cursor-pointer hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 mt-4">
        <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded" onClick={() => setMenuOpen(false)}>
          Book Now
        </button>
        <button className="bg-yellow-500 text-black px-4 py-1 rounded" onClick={() => setMenuOpen(false)}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
