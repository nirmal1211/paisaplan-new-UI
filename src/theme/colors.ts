// Nude/neutral color palette for light and dark modes

export const nudeColors = {
  light: {
    primary: "#b89e8c", // soft nude brown
    accent: "#e7d7c1", // light nude accent
    bg: "#f8f5f2", // very light nude background
    card: "#fffaf6", // card background
    text: "#3d2c22", // deep brown for text
    border: "#e0d6cc", // subtle border
    muted: "#b8a89a", // muted text
    shadow: "0 4px 24px 0 #e7d7c144, 0 1.5px 6px 0 #b89e8c22, 0 0.5px 1.5px 0 #b89e8c11",
    white: "#fff",
  },
  dark: {
    primary: "#b89e8c",
    accent: "#3d2c22",
    bg: "#23201c",
    card: "#2d2722",
    text: "#f8f5f2",
    border: "#4a3e36",
    muted: "#b8a89a",
    shadow: "0 4px 24px 0 #3d2c2244, 0 1.5px 6px 0 #b89e8c22, 0 0.5px 1.5px 0 #b89e8c11",
    white: "#23201c",
  },
};

export type NudeColorMode = 'light' | 'dark';
