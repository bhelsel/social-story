import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="studies"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Studies
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.logoRight}>
        <img src="logo256.png" alt="Logo" />
      </div>
    </header>
  );
}

export default MainNavigation;
