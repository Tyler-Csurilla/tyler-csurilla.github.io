import React from "react";
import { useTheme } from "../../../../utils/hooks/useTheme";
import "./ThemeDemo.css";

const ThemeDemo: React.FC = () => {
  const { currentTheme } = useTheme();

  const colorSections = [
    {
      name: "Background",
      scale: currentTheme.background,
    },
    {
      name: "Primary",
      scale: currentTheme.primary,
    },
    {
      name: "Secondary",
      scale: currentTheme.secondary,
    },
    {
      name: "Accent",
      scale: currentTheme.accent,
    },
  ];

  return (
    <div className="theme-demo">
      <h2>Theme System Demo</h2>

      <details className="theme-demo__details">
        <summary>View Color Palette</summary>
        <div className="theme-demo__palette">
          {colorSections.map((section) => (
            <div key={section.name} className="theme-demo__color-section">
              <h3>{section.name} Colors</h3>
              <div className="theme-demo__color-row">
                {Object.entries(section.scale).map(([variant, color]) => (
                  <div
                    key={variant}
                    className="theme-demo__color-box"
                    style={{ backgroundColor: color as string }}
                  >
                    <span>{variant as string}</span>
                    <span>{color as string}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>

      <div className="theme-demo__examples">
        <h3>UI Elements</h3>

        <div className="theme-demo__example__wrapper">
          <div className="theme-demo__card">
            <h4>Card Title</h4>
            <p>
              This is a sample card showing how the theme colors apply to UI
              elements.
            </p>
            <button className="theme-demo__button theme-demo__button--primary">
              Primary Button
            </button>
            <button className="theme-demo__button theme-demo__button--secondary">
              Secondary Button
            </button>
          </div>
        </div>
        <div className="theme-demo__example__wrapper">
          <div className="theme-demo__form-example">
            <h4>Form Elements</h4>
            <div className="theme-demo__form-row">
              <label htmlFor="demo-input">Input:</label>
              <input type="text" id="demo-input" placeholder="Enter text..." />
            </div>
            <div className="theme-demo__form-row">
              <label htmlFor="demo-checkbox">
                <input type="checkbox" id="demo-checkbox" />
                Checkbox
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
