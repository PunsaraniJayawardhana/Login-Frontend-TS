import { defineConfig } from "cypress";
import fs from 'fs'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', 
     projectId: "yj48hv",
    setupNodeEvents(on, config) {
      
    },

    //Screenshots and screenrecordings are enabled.
    screenshotsFolder: 'cypress/screenshots',
    videosFolder:'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,
  },
});
