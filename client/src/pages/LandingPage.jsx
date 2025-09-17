import React, { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { Atom, MenuIcon, X } from "lucide-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // authentication
  const [openAuthModel, setOpenAuthModel] = useState(false);
  // user data from usercontext
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModel(true)}
              >
                <div
                  className={landingPageStyles.desktopAuthButtonOverlay}
                ></div>
                <span className={landingPageStyles.desktopAuthButtonText}>
                  Get Started
                </span>
              </button>
            )}
          </div>
        </div>
        {/* mobile menu */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenu}>
            <div className={landingPageStyles.mobileMenuContainer}>
              {user ? (
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>
                    Welcome Back
                  </div>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button
                  className={landingPageStyles.mobileAuthButton}
                  onClick={() => {
                    setOpenAuthModel(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      {/* main content */}
      <main className={landingPageStyles.main}>
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* left Content */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>
              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft</span>
                <span className={landingPageStyles.headingGradient}>
                  Professional
                </span>
                <span className={landingPageStyles.headingText}>Resumes</span>
              </h1>
              <p className={landingPageStyles.description}>
                Create job-winning with expertly designed
                templates.ATS-friendly,recruiter-approved,and tailored to your
                career goal.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
