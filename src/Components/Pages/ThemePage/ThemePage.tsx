import { useEffect, useState } from "react";
import isColorLight from "../../../utils/calculation/isColorLight";
import { useTheme } from "../../../utils/hooks/useTheme";
import { defaultThemes } from "../../ThemeProvider/ThemesData";
import "./ThemePage.css";

interface CustomTheme {
  title: string;
  bg_Color: string;
  primary_Color: string;
  secondary_Color: string;
  accent_Color: string;
  accentHover_Color: string;
  font_family: string;
}

const validateColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

const ThemePage: React.FC = () => {
  const { currentTheme, addNewTheme, switchToThemeName } = useTheme();
  const [customTheme, setCustomTheme] = useState<CustomTheme>({
    title: "",
    bg_Color: currentTheme.bg_Color ?? "",
    primary_Color: currentTheme.primary_Color ?? "",
    secondary_Color: currentTheme.secondary_Color ?? "",
    accent_Color: currentTheme.accent_Color ?? "",
    accentHover_Color: currentTheme.accentHover_Color ?? "",
    font_family: currentTheme.font_family ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomTheme, string>>
  >({});

  const handleThemeChange = (prop: keyof CustomTheme, value: string) => {
    setCustomTheme((prev) => ({ ...prev, [prop]: value }));
  };

  useEffect(() => {
    setCustomTheme({
      ...customTheme,
      bg_Color: currentTheme.bg_Color ?? "",
      primary_Color: currentTheme.primary_Color ?? "",
      secondary_Color: currentTheme.secondary_Color ?? "",
      accent_Color: currentTheme.accent_Color ?? "",
      accentHover_Color: currentTheme.accentHover_Color ?? "",
      font_family: currentTheme.font_family ?? "",
    });
  }, [currentTheme]);

  const validateTheme = (): boolean => {
    const newErrors: Partial<Record<keyof CustomTheme, string>> = {};

    if (!customTheme.title.trim()) {
      newErrors.title = "Title is required";
    }

    const colorKeys: (keyof CustomTheme)[] = [
      "bg_Color",
      "primary_Color",
      "secondary_Color",
      "accent_Color",
      "accentHover_Color",
    ];
    colorKeys.forEach((key) => {
      if (!validateColor(customTheme[key])) {
        newErrors[key] = "Invalid color format";
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

  const colorProps = [
    { label: "Background", key: "bg_Color" },
    { label: "Primary", key: "primary_Color" },
    { label: "Secondary", key: "secondary_Color" },
    { label: "Accent", key: "accent_Color" },
    { label: "Accent Hover", key: "accentHover_Color" },
  ];

  return (
    <div className="theme-page">
      <div className="theme-page__swatches">
        {colorProps.map(({ label, key }) => {
          const colorValue = currentTheme[key as keyof typeof currentTheme];
          const textColor = isColorLight(colorValue) ? "#000" : "#fff";

          return (
            <div
              key={key}
              className="theme-page__swatch"
              style={{ backgroundColor: colorValue, color: textColor }}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>
      <div className="theme-page__customizer">
        <h2 style={{ color: currentTheme.primary_Color }}>
          Customize Your Theme
        </h2>
        <h2 style={{ color: currentTheme.primary_Color }}>
          Current Selected Theme: {currentTheme.title}
        </h2>
        <div
          className="theme-page__form"
          style={{ color: currentTheme.primary_Color }}
        >
          <hr />
          <div className="theme-page__input-group">
            <h2>Theme Name:</h2>
            <input
              id="themeName"
              type="text"
              className="theme-page__theme-name-input"
              value={customTheme.title}
              onChange={(e) => handleThemeChange("title", e.target.value)}
            />
            {errors.title && (
              <span className="theme-page__error">{errors.title}</span>
            )}
          </div>
          {colorProps.map(({ label, key }) => (
            <div key={key} className="theme-page__input-group">
              <label htmlFor={key}>{label} Color:</label>
              <div className="theme-page__color-input-wrapper">
                <input
                  id={key}
                  type="color"
                  value={customTheme[key as keyof CustomTheme]}
                  onChange={(e) =>
                    handleThemeChange(key as keyof CustomTheme, e.target.value)
                  }
                  className="theme-page__color-input"
                />
                <input
                  type="text"
                  value={customTheme[key as keyof CustomTheme]}
                  onChange={(e) =>
                    handleThemeChange(key as keyof CustomTheme, e.target.value)
                  }
                  className="theme-page__hex-input"
                />
              </div>
              {errors[key as keyof CustomTheme] && (
                <span className="theme-page__error">
                  {errors[key as keyof CustomTheme]}
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          className="theme-page__save-button"
          onClick={saveAndSwitchTheme}
        >
          Save Custom Theme &amp; Switch to it
        </button>
      </div>
    </div>
  );
};

export default ThemePage;
