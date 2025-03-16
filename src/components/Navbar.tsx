import { useState } from "react";
import { useAuth } from "../Provider/userContexProvider";

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Cancel any scheduled close
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Delay of 300ms before closing
  };

  return (
    <nav className="navbar">
      <h1>Job Application Manager</h1>
      
      <div className="nav-right">
        <a href="#/dashboard">Dashboard</a>

        {user && (
          <div
            className="user-menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="username">{user.displayName}</span>
            {isDropdownOpen && (
              <div className="dropdown">
                <button onClick={logout}>Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
