import Shell from "gi://Shell";

export default function getFocusedAppName() {
  const windowTracker = Shell.WindowTracker.get_default();
  const name = windowTracker.focus_app
    ? windowTracker.focus_app.get_name()
    : "Unknown";

  if (windowTracker) {
    return name;
  }

  return "No application focused";
}
