export type NudeColorMode = "light" | "dark";

export const nudeColors = {
  light: {
    // Primary brand color
    primary: "#b92250", // Maroon color from theme.css

    // Background colors
    background: "#ffffff",
    foreground: "#0f172a",

    // Card and surface colors
    card: "#ffffff",
    cardForeground: "#0f172a",

    // Muted colors
    muted: "#64748b",
    mutedForeground: "#475569",

    // Border colors
    border: "#e2e8f0",
    input: "#e2e8f0",

    // Ring colors for focus states
    ring: "#b92250",

    // Accent colors
    accent: "#f1f5f9",
    accentForeground: "#0f172a",

    // Secondary colors
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",

    // Destructive/error colors
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",

    // Success colors
    success: "#10b981",
    successForeground: "#ffffff",

    // Warning colors
    warning: "#f59e0b",
    warningForeground: "#ffffff",

    // Info colors
    info: "#3b82f6",
    infoForeground: "#ffffff",
  },
  dark: {
    // Primary brand color (same in dark mode)
    primary: "#b92250",

    // Background colors
    background: "#0f172a",
    foreground: "#f8fafc",

    // Card and surface colors
    card: "#1e293b",
    cardForeground: "#f8fafc",

    // Muted colors
    muted: "#64748b",
    mutedForeground: "#94a3b8",

    // Border colors
    border: "#334155",
    input: "#334155",

    // Ring colors for focus states
    ring: "#b92250",

    // Accent colors
    accent: "#1e293b",
    accentForeground: "#f8fafc",

    // Secondary colors
    secondary: "#1e293b",
    secondaryForeground: "#f8fafc",

    // Destructive/error colors
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",

    // Success colors
    success: "#10b981",
    successForeground: "#ffffff",

    // Warning colors
    warning: "#f59e0b",
    warningForeground: "#ffffff",

    // Info colors
    info: "#3b82f6",
    infoForeground: "#ffffff",
  },
};

// Export individual color palettes for convenience
export const lightColors = nudeColors.light;
export const darkColors = nudeColors.dark;

// Helper function to get colors by mode
export const getColors = (mode: NudeColorMode) => nudeColors[mode];
