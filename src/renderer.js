import "./index.css";
import "./react-main";
import * as Sentry from "@sentry/electron/renderer";

Sentry.init();

console.log(
  '👋 This message is being logged by "renderer.js", included via Vite',
);
