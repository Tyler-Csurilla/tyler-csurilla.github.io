import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultThemes } from "../../../data/ThemesData";
import { Theme } from "../../../types/theme";
import isColorLight from "../../../utils/calculation/isColorLight";
import { useTheme } from "../../../utils/hooks/useTheme";
import { generateColorScale } from "../../../utils/theme/generateColorScale";
import { safeGetColorScale } from "../../../utils/theme/safeColorScale";
import "./ThemePage.css";

interface CustomTheme extends Theme {}

const validateColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

const ThemePage: React.FC = () => {
  const { currentTheme, addNewTheme, switchToThemeName } = useTheme();

  // Define the color group keys explicitly for type safety
  const colorGroupKeys = [
    "background",
    "primary",
    "secondary",
    "accent",
  ] as const;

  type ColorGroupKey = (typeof colorGroupKeys)[number];

  // Define color groups with proper typing
  const colorGroups = [
    { label: "Background", key: "background" as ColorGroupKey },
    { label: "Primary", key: "primary" as ColorGroupKey },
    { label: "Secondary", key: "secondary" as ColorGroupKey },
    { label: "Accent", key: "accent" as ColorGroupKey },
  ];

  // Initialize custom theme
  const [customTheme, setCustomTheme] = useState<CustomTheme>({
    title: "",
    background: safeGetColorScale(currentTheme, "background"),
    primary: safeGetColorScale(currentTheme, "primary"),
    secondary: safeGetColorScale(currentTheme, "secondary"),
    accent: safeGetColorScale(currentTheme, "accent"),
    font_family: currentTheme?.font_family || '"Segoe UI", sans-serif',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomTheme | string, string>>
  >({});

  const handleBaseColorChange = (
    colorGroup: keyof CustomTheme,
    value: string
  ) => {
    if (!validateColor(value)) {
      setErrors((prev) => ({ ...prev, [colorGroup]: "Invalid color format" }));
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[colorGroup];
      return newErrors;
    });

    const colorScale = generateColorScale(value);

    setCustomTheme((prev) => {
      const updated = { ...prev };

      // Update the color scale
      if (
        colorGroup === "background" ||
        colorGroup === "primary" ||
        colorGroup === "secondary" ||
        colorGroup === "accent"
      ) {
        updated[colorGroup] = colorScale;
      }

      return updated;
    });
  };

  const handleFontFamilyChange = (value: string) => {
    setCustomTheme((prev) => ({ ...prev, font_family: value }));
  };

  const handleTitleChange = (value: string) => {
    setCustomTheme((prev) => ({ ...prev, title: value }));
  };

  useEffect(() => {
    // Safe update when theme changes
    setCustomTheme({
      title: "",
      background: safeGetColorScale(currentTheme, "background"),
      primary: safeGetColorScale(currentTheme, "primary"),
      secondary: safeGetColorScale(currentTheme, "secondary"),
      accent: safeGetColorScale(currentTheme, "accent"),
      font_family: currentTheme?.font_family || '"Segoe UI", sans-serif',
    });
  }, [currentTheme]);

  const validateTheme = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!customTheme.title.trim()) {
      newErrors.title = "Title is required";
    }

    colorGroupKeys.forEach((group) => {
      if (!validateColor(customTheme[group].base)) {
        newErrors[group] = "Invalid base color format";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAndSwitchTheme = () => {
    if (!validateTheme()) {
      return;
    }
    for (const theme of Object.values(defaultThemes)) {
      if (theme.title === customTheme.title) {
        alert(
          "A default theme with that name already exists. Choose a different name."
        );
        return;
      }
    }
    const storedCustomThemes = JSON.parse(
      localStorage.getItem("customThemes") || "{}"
    );
    storedCustomThemes[customTheme.title] = customTheme;
    localStorage.setItem("customThemes", JSON.stringify(storedCustomThemes));
    addNewTheme(customTheme.title, customTheme);
    switchToThemeName(customTheme.title);
  };

  return (
    <div className="theme-page">
      {/* Current Theme Display */}
      <div className="theme-page__current-theme">
        <h1 className="theme-page__current-theme-name">
          <span style={{ fontWeight: "bold" }}>Theme</span>:{" "}
          {currentTheme?.title || "Custom Theme"}
        </h1>
      </div>

      {/* Color Swatches */}
      <div className="theme-page__swatches">
        {colorGroups.map(({ label, key }) => {
          const colorScale = safeGetColorScale(currentTheme, key);
          const baseColor = colorScale.base;
          const textColor = isColorLight(baseColor) ? "#000" : "#fff";

          return (
            <div
              key={key}
              className="theme-page__swatch"
              style={{ backgroundColor: baseColor, color: textColor }}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Demo Link */}
      <div className="theme-page__demo-link-wrapper">
        <Link to="/theme/demo" className="theme-page__demo-link">
          View Theme Demo
        </Link>
      </div>

      <div className="theme-page__customizer">
        <h2 className="theme-page__section-title">Create Your Own Theme</h2>

        <div className="theme-page__form">
          <div className="theme-page__input-group">
            <h2>Theme Name</h2>
            <input
              id="themeName"
              type="text"
              placeholder="Enter a name for your theme"
              className="theme-page__theme-name-input"
              value={customTheme.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            {errors.title && (
              <span className="theme-page__error">{errors.title}</span>
            )}
          </div>

          <hr />

          {colorGroups.map(({ label, key }) => {
            const colorScale = safeGetColorScale(customTheme, key);

            return (
              <div key={key} className="theme-page__input-group">
                <label htmlFor={key}>{label} Base Color</label>
                <div className="theme-page__color-input-wrapper">
                  <input
                    id={key}
                    type="color"
                    value={colorScale.base}
                    onChange={(e) =>
                      handleBaseColorChange(
                        key as keyof CustomTheme,
                        e.target.value
                      )
                    }
                    className="theme-page__color-input"
                  />
                  <input
                    type="text"
                    value={colorScale.base}
                    onChange={(e) =>
                      handleBaseColorChange(
                        key as keyof CustomTheme,
                        e.target.value
                      )
                    }
                    className="theme-page__hex-input"
                  />
                </div>
                {errors[key] && (
                  <span className="theme-page__error">{errors[key]}</span>
                )}

                {/* Preview of generated color scales */}
                <div className="theme-page__generated-scales">
                  {Object.entries(colorScale).map(([variant, color]) => {
                    if (variant === "base") return null;
                    return (
                      <div
                        key={variant}
                        className="theme-page__scale-preview"
                        style={{
                          backgroundColor: color,
                          color: isColorLight(color) ? "#000" : "#fff",
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {color}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="theme-page__input-group">
            <label htmlFor="font_family">Font Family</label>
            <input
              id="font_family"
              type="text"
              value={customTheme.font_family}
              placeholder='e.g. "Inter", sans-serif'
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="theme-page__theme-name-input"
            />
          </div>
        </div>
        <button
          className="theme-page__save-button"
          onClick={saveAndSwitchTheme}
        >
          Save & Apply Theme
        </button>
      </div>
    </div>
  );
};

export default ThemePage;
