const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    api_url: 'https://fnappt6c7s57cuv37w.azurewebsites.net/api/CosmosCRUD?code=ZqNwcLOkc3iNHTITf8-bVHgycjI0xIsOYuE-LDnODEboAzFuc4KXzg=='
  }
});
