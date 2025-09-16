import React, { useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { Atom, MenuIcon, X } from "lucide-react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className={landingPageStyles.container}>
      {/* header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <Atom className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>NexusCV</span>
          </div>
          {/* MOBILE MENU */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={landingPageStyles.mobileMenuIcon} size={24} />
            ) : (
              <MenuIcon
                className={landingPageStyles.mobileMenuIcon}
                size={24}
              />
            )}
          </button>
          {/* nav links */}
          <div className="hidden md:flex items-center">
            {/* {user} */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
