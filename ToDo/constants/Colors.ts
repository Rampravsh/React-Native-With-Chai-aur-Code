const commonColor = {
  primary: "#f59e0b",
  primaryMuted: "rgba(245,158,11,0.15)",
  statusDone: "#4ade80",
  statusInProgress: "#fbbf24",
  statusTodo: "#38bdf8",
};

const Colors = {
  light: {
    Background: "#f3f4f6", // light background
    surface: "#ffffff",
    surfaceLight: "#e5e7eb",
    border: "#d1d5db",

    primary: commonColor.primary,
    primaryMuted: commonColor.primaryMuted,

    textPrimary: "#111827",
    textSecondary: "#6b7280",

    statusDone: commonColor.statusDone,
    statusInProgress: commonColor.statusInProgress,
    statusTodo: commonColor.statusTodo,
  },
  dark: {
    Background: "#09090b",
    surface: "#18181b",
    surfaceLight: "#27272a",
    border: "#3f3f46",

    primary: commonColor.primary,
    primaryMuted: commonColor.primaryMuted,

    textPrimary: "#fafafa",
    textSecondary: "#a1a1aa",

    statusDone: commonColor.statusDone,
    statusInProgress: commonColor.statusInProgress,
    statusTodo: commonColor.statusTodo,
  },
} as const;

export default Colors;
