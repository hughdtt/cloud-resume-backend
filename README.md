# Getviewcount Web API

## Overview

The `getviewcount` Web API is an Azure Function that increments and retrieves a view count from a CosmosDB database. It's designed to be triggered via HTTP, supporting both GET and POST methods. This repository contains the necessary code and configuration for deploying the function to Azure with unit testing with Jest and E2E testing with Cypress.

The web api serves as a view counter RESTful API for the [frontend](https://github.com/hughdtt/cloud-resume-frontend) of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

### Functionality

The `CosmosCRUD` directory houses the function code, including the `function.json` file that defines the function's bindings, and `index.js` that contains the implementation.

- **HTTP Trigger:** The function can be triggered using HTTP GET or POST methods.
- **CosmosDB Interaction:** The function increments the view count in a CosmosDB container and retrieves the updated count. The function code is written in Javascript so we rely on an Azure/Cosmos package to create client connection.
- **Environment Variables:** The function relies on environment variables `COSMOS_ENDPOINT` and `COSMOS_KEY` to access the CosmosDB instance.

### CI/CD Pipeline

### Web API Architecture

### Azure resource group relationships
![alt text](/webapi/assets/resource-visualiser.PNG)

## Install

You can download the repo to test it locally if you'd like. You'll just need to have Azure Function Core Tools installed.

### Local Development

1. Clone the repository
2. Install the dependencies using `npm install`
3. Install Azure Functions Core Tools using `npm install -g azure-functions-core-tools --unsafe-perm true` (read more at [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cportal%2Cv2%2Cbash&pivots=programming-language-csharp)
4. Run locally `azurefunctions run`
5. [Optional] Run unit tests using `npm test`
6. [Optional] Run smoke tests using `npm cypress` (although my cypress config points to my production api endpoint, you might need to change it. More on [environment variables](https://docs.cypress.io/guides/guides/environment-variables))

### Deployment strategy

The repository is configured with a GitHub Action workflow that automates the deployment of the function to Azure Functions. Here's an overview of the workflow:

0. **Track changes for certain folder** For efficiency, I only want workflow to run when certain folders have been changed. Ie not when readme has changed.
1. **Checkout Code:** Clones the repository code.
2. **Install Dependencies:** Installs all required dependencies.
3. **Run Jest Tests:** Executes unit tests using Jest.
4. **Clean Libraries:** Removes development dependencies to create a lightweight package for deployment.
5. **Create ZIP Package:** Zips necessary files and directories for deployment.
6. **Deploy to Azure Functions:** Uses `Azure/functions-action@v1` to deploy the ZIP package to the specified Azure Functions app.
7. **Run Cypress Tests:** Executes integration tests using Cypress.

### Deploy to your own Azure infrastructure

If you're going to deploy your own. Make sure to configure the necessary environment variables in your Azure Functions app settings:

- `COSMOS_ENDPOINT`: The endpoint URL of your CosmosDB instance.
- `COSMOS_KEY`: The authentication key for your CosmosDB instance.

More on those [Azure environment keys](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal)

### Acknowledgements
This was done as part of Forrest Brazeal's [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

### Task list
- [x] Local files reflect Azure function
- [x] Function works locally
- [x] Unit test w/ Jest
- [x] E2E test w/ Cypress
- [x] Git init
- [x] Deploy yaml
    - [x] Tests, build artifacts, deploy to Azure
- [ ] Diagrams
    - [ ] CI/CD Pipeline
    - [ ] Web API Architecture
    - [x] Resource group relations
- [ ] ARM template/ bicep files for resource group (environment agnostic ie staging/prod)
- [ ] YAML infrastructure deploy
