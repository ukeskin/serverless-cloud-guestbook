import react from "@vitejs/plugin-react";
import withCloud from "@serverless/cloud/vite";

/** @type {import('vite').UserConfig} */
const config = withCloud({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.CLOUD_PORT}`,
    },
  },
});

export default config;
