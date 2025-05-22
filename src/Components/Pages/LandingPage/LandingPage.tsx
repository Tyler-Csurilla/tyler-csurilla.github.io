import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import isColorLight from "../../../utils/calculation/isColorLight";
import { useTheme } from "../../../utils/hooks/useTheme";
import LogoHeadshot from "../../Logo/LandingLogo";
import ScreenExtender from "../../ScreenExtender/ScreenExtender";
import TimelineSegment from "../../TimelineSegment/TimelineSegment";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const tagRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { currentTheme } = useTheme();
  const backgroundColor = currentTheme.background.base;
  const contrastColor = isColorLight(backgroundColor) ? "#000" : "#fff";

  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  //   handling scroll behavior for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    function handleScroll() {
      setShowScrollIndicator(window.scrollY === 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const graduationCapIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );

  const rightArrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );

  const bookCheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 21V7" />
      <path d="m16 12 2 2 4-4" />
      <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
    </svg>
  );

  const backpackIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 10h8" />
      <path d="M8 18h8" />
      <path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );

  const laptopCheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M2 20h20" />
      <path d="m9 10 2 2 4-4" />
      <rect x="3" y="4" width="18" height="12" rx="2" />
    </svg>
  );

  const educationEvents = [
    {
      timePeriod: "2015–2019",
      label: "Pittsburgh Science & Technology Academy",
      icon: backpackIcon,
      description: (
        <div className="tt-card">
          <p className="tt-heading">
            <strong>High School Education</strong>
          </p>

          <ul className="tt-list">
            <li>Magnet high school with STEM focus</li>
            <li>Introduction to programming fundamentals</li>
            <li>Foundation in computer science concepts</li>
          </ul>
        </div>
      ),
      link: "https://en.wikipedia.org/wiki/Pittsburgh_Science_and_Technology_Academy",
    },
    {
      timePeriod: "2019–2021",
      label: "Community College of Allegheny County",
      icon: graduationCapIcon,
      description: (
        <div className="tt-card">
          <p className="tt-heading">
            <strong>Computer Information Systems</strong>
          </p>

          <ul className="tt-list">
            <li>Advanced networking concepts</li>
            <li>Computer architecture fundamentals</li>
            <li>Practical software‑dev skills</li>
          </ul>

          <p className="tt-note">
            <em>
              Completed ~2 years of coursework towards an Associate's degree
            </em>
            <br />
            <br />
            While I was nearly finished with my degree, I had felt for a while
            that I was ready to enter the workforce so I made the strategic
            decision to pursue a career on my own instead.
          </p>
        </div>
      ),
      link: "https://en.wikipedia.org/wiki/Community_College_of_Allegheny_County",
    },
    {
      timePeriod: "2021 – 2022",
      label: "Year Up – Application Development & Support",
      icon: laptopCheckIcon,
      description: (
        <div className="tt-card">
          <p className="tt-heading">
            <strong>Intensive Software‑Dev Training</strong>
          </p>

          <ul className="tt-list">
            <li>6‑month accelerated program</li>
            <li>Professional development hard/soft skills</li>
            <li>Preparation for BNY internship</li>
          </ul>

          <p className="tt-note">
            <em>
              Selected for competitive program partnered with 200+ companies.
            </em>
            <br />
            <br />
            Here I was able to really prepare for the professional world. I was
            finally given the freedom to focus on my technical and soft skills
            which I had been developing since high school.
          </p>
        </div>
      ),
      link: "https://www.yearup.org/",
    },
  ];

  const experienceEvents = [
    {
      timePeriod: "2022 – 2022",
      label: "BNY Mellon – CRM Software Intern",
      icon: bookCheckIcon,
      description: (
        <div className="tt-card">
          <p
            className="tt-heading"
            style={{ textAlign: "center", display: "block" }}
          >
            <strong>First Professional Role</strong>
            <br />
            <br />
          </p>

          <p className="tt-subtitle" style={{ textAlign: "center" }}>
            <em>6‑month internship on the Dynamics 365 Sales team</em>
          </p>

          <ul className="tt-list">
            <li>Implemented Full-Stack Stories</li>
            <li>
              Configured:
              <br /> <br /> <hr /> <br /> Dynamics 365 <br /> Dataverse <br />{" "}
              Power Apps
            </li>
            <li>
              Worked with many different people across the business with varying
              roles to get fully acquainted with how I can be most efficient as
              a developer.
            </li>
          </ul>

          <p className="tt-note">
            <em>
              During this internship, I was able to learn a lot about the
              professional world and how best to work with a large team of
              experts.
            </em>
            <br />
            <br />I had studied a lot of the concepts I was using in my free
            time, but I was finally able to apply them in a real-world setting.
          </p>
        </div>
      ),
      link: "https://www.bny.com/",
    },
    {
      timePeriod: "2022 – Present",
      label: "BNY Mellon – Full‑Stack Developer",
      icon: rightArrowIcon,
      description: (
        <div className="tt-card">
          <p className="tt-heading">
            <strong>Current Position</strong>
          </p>

          <p className="tt-subtitle">
            <em>Hybrid role based in Pittsburgh</em>
          </p>

          <br />
          <ul className="tt-list">
            <li>
              Developed projects using: <br /> <br />
              <hr />
              <br />
              JavaScript/TypeScript, React, Angular, .NET & Java
            </li>
            <li>
              Worked to improve user experience and performance of internal apps
              used by thousands.
            </li>
            <li>
              Lead major changes on rewrite of critical internal CRUD
              applications.
            </li>
          </ul>

          <p className="tt-note">
            <em>
              At BNY I continue to learn and grow as a developer. I am
              constantly challenged to think outside the box and find new ways
              to solve increasingly complex and interesting problems.
            </em>
          </p>
        </div>
      ),
      link: "https://www.bny.com/",
    },
  ];

  return (
    <div className="landing-page">
      <div className="landing-page__header">
        <LogoHeadshot />
      </div>

      <div className="landing-page__section">
        <div className="grid gap-2">
          <div className="col-full social-links">
            <a
              href="https://github.com/tyler-csurilla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/csurilla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          <motion.div
            ref={tagRef}
            whileInView={{ opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 3 }}
            className="tagline__container col-12 faded-corner-borders"
          >
            <div>
              <h2>Full-Stack</h2>
              <h2>Developer</h2>
            </div>
            <h3 style={{ fontStyle: "italic" }}>
              <span style={{ whiteSpace: "nowrap" }}>
                3+ years of experience.
              </span>
            </h3>
          </motion.div>
        </div>
      </div>

      <ScreenExtender>
        <div
          className={`scroll-down-indicator scroll-down-indicator--bottom`}
          ref={scrollIndicatorRef}
          style={{
            opacity: showScrollIndicator ? 1 : 0,
            pointerEvents: showScrollIndicator ? "auto" : "none",
            transition: "opacity 0.4s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <Link
            to="#My-Education"
            aria-label="Scroll to timeline"
            className="scroll-down-link"
          >
            <span className="scroll-down-text"></span>
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mouse-svg-wrapper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke={contrastColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="7" />
                <path d="M12 6v4" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </ScreenExtender>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="My-Education"></div>
      <h1 className="timeline__header">
        <span style={{ fontStyle: "italic" }}>Education</span>
      </h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <TimelineSegment height={50} events={educationEvents} />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div id="My-Experience"></div>
      <h1 className="timeline__header">
        <span style={{ fontStyle: "italic" }}>Experience</span>
      </h1>
      <br />
      <br />
      <br />
      <br />
      <TimelineSegment height={45} events={experienceEvents} />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LandingPage;
