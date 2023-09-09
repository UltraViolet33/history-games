import { useState } from "react";
import { KINGS, QUEENS, BATTLES, WRITERS } from "../constants";

export const Header = ({ setData }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }>
        <ul>
          <li>
            <a
              onClick={() => {
                setData(KINGS);
                setIsNavExpanded(false);
              }}>
              Rois de France
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setData(QUEENS);
                setIsNavExpanded(false);
              }}>
              Reines de France
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setData(BATTLES);
                setIsNavExpanded(false);
              }}>
              Batailles de France
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setData(WRITERS);
                setIsNavExpanded(false);
              }}>
              Ecrivains
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
