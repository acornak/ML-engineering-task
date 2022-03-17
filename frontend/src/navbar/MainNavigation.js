import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarNavMenu,
  NavbarNavMenuUser,
  NavbarNavMenuUserLink,
  NavbarNavMenuUserMenu,
  NavbarNavMenuUserMenuItem,
  NavbarNavMenuUserMenuDivider,
} from "@vismaux/react-nc4";
import userIcon from "../css/user_icon.jpg";

const MainNavigation = () => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);

  const toggleNavMenuHandler = () => {
    setToggleNavMenu(!toggleNavMenu);
  };

  return (
    <Navbar variant="default">
      <NavbarBrand isDropdown>
        <a
          aria-expanded="false"
          aria-label="Visma Project Name"
          role="button"
          href="/"
        >
          Visma.net Online Learning App
        </a>
      </NavbarBrand>
      <NavbarNav>
        <NavbarNavMenu position="right">
          <NavbarNavMenuUser expanded={toggleNavMenu} showIcon>
            <NavbarNavMenuUserLink name="User" onClick={toggleNavMenuHandler} />
            <NavbarNavMenuUserMenu>
              <NavbarNavMenuUserMenuItem>
                <a
                  href="/#"
                  className="user-details-area clear"
                  role="menuitem"
                  tabIndex={0}
                >
                  <div title="example@example.com">
                    <div className="user-image">
                      <img
                        style={{
                          borderRadius: "50%",
                        }}
                        src={userIcon}
                        alt=""
                      />
                    </div>
                    <div className="user-text">
                      <span>John Doe</span>
                      <span className="text-disabled">example@example.com</span>
                    </div>
                  </div>
                </a>
              </NavbarNavMenuUserMenuItem>
              <NavbarNavMenuUserMenuDivider isStrong />
              <NavbarNavMenuUserMenuItem>
                <button role="menuitem" type="button">
                  Log Out
                </button>
              </NavbarNavMenuUserMenuItem>
            </NavbarNavMenuUserMenu>
          </NavbarNavMenuUser>
        </NavbarNavMenu>
      </NavbarNav>
    </Navbar>
  );
};

export default MainNavigation;
