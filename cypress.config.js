const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    api_url: 'https://getviewcount.azurewebsites.net/api/cosmoscrud?code=OkwHY8gakf3eMKiX2xInvkDeJCm81Q2DlYUWyi8DZszdAzFud587gA%3D%3D'
  }
});
