# Getviewcount Web API

## Overview

The `getviewcount` Web API is an **Azure Function** that increments and retrieves a "view count" variable from a **CosmosDB database**. It's designed to be triggered via HTTP, supporting both GET and POST methods. This repository contains the necessary code and configuration for deploying the function to Azure with unit testing with Jest and E2E testing with Cypress.

The web api serves as a view counter RESTful API for the [frontend](https://github.com/hughdtt/cloud-resume-frontend) of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

### Functionality

The `CosmosCRUD` directory houses the function code, including the `function.json` file that defines the function's bindings, and `index.js` that contains the implementation.

- **HTTP Trigger:** The function can be triggered using HTTP GET or POST methods.
- **CosmosDB Interaction:** The function increments the view count in a CosmosDB container and retrieves the updated count. The function code is written in Javascript so we rely on an Azure/Cosmos package to create client connection.
- **Environment Variables:** The function relies on environment variables `COSMOS_ENDPOINT` and `COSMOS_KEY` to access the CosmosDB instance.
- **Node.js:** The function itself is written in Javascript and uses the @Azure/CosmosDB package to handle the connection to the DB.

## Install

You can download the repo to test it locally if you'd like. You'll just need to have Azure Function Core Tools installed.

### Local Development

1. Clone the repository
2. Install the dependencies using `npm install`
3. Install Azure Functions Core Tools using `npm install -g azure-functions-core-tools --unsafe-perm true` (read more at [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cportal%2Cv2%2Cbash&pivots=programming-language-csharp)
4. Run locally `azurefunctions run`
5. [Optional] Run unit tests using `npm test`
6. [Optional] Run smoke tests using `npm cypress` (although my cypress config points to my production api endpoint, you might need to change it. More on [environment variables](https://docs.cypress.io/guides/guides/environment-variables))

## Code deployment strategy

For illustrative purposes, the setup for the github actions workflow has been drawn below.

### Workflow diagram

![workflow-diagram.png](./assets/ci-cd.PNG)

### Workflow description

The repository is configured with a GitHub Action workflow that automates the deployment of the function to Azure Functions. The steps for the workflow are in .github/workflows/deploy.yml. Here's an overview of the workflow:

**Track changes for certain folders** For efficiency, I only want workflow to run when certain folders have been changed - ie. not when readme has changed.
**Checkout Code:** Clones the repository code.
**Install Dependencies:** Installs all required dependencies (including tests).
**Run Jest Tests:** Executes unit tests using Jest.
**Clean Libraries:** Removes development dependencies (omitting dev) to create a lightweight package for deployment.
**Create ZIP Package:** Zips necessary files and directories for deployment.
**Deploy to Azure Functions:** Uses `Azure/functions-action@v1` to deploy the ZIP package to the specified Azure Functions app.
**Run Cypress Tests:** Executes integration tests using Cypress at the end.

### Considerations

The CI/CD pipeline above is quite simple and doesn't really simulate what you might see in a production environment. You'd really want to add something like deploying "Staging" resources and deploy code there first to preview. Once integration tests pass in the "Staging" environment, you could then destory the resources before deploying code to production.

## Infrastructure deployment strategy

Infrastructure-as-Code (ARM/ Bicep templates) have also been provided. You could manually run the github action workflow `insert workflow name` to deploy. You'll need to update your repository with the relevant secrets etc.

Once you get it working, it should deploy the following resources below.

### Azure resource group relationship model
The resource group created from the IaC template looks like this:
![resource-visualiser.png](./assets/resource-visualiser.PNG)


### Applying correct environment variables

Once you have your resource group sorted. Make sure to configure the necessary environment variables in your Azure Functions app settings:

- `COSMOS_ENDPOINT`: The endpoint URL of your CosmosDB instance.
- `COSMOS_KEY`: The authentication key for your CosmosDB instance.

More on those [Azure environment keys](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal)

This way, when you run the deploy workflow, it's deploying to the correct resources.

### Acknowledgements
This was done as part of Forrest Brazeal's [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

### Task list
- [x] Manually setup azure function + cosmosDB
- [x] Using Azure Portal GUI, write function and get function to increment and update cosmosdb entry
- [x] Download Azure function files to test locally (Kudu app service via portal)
- [x] Install Azure function core tools and Azure code extensions.
- [x] Test function locally
- [x] Unit test w/ Jest
- [x] E2E test w/ Cypress
- [x] Git repo as source
- [x] Deploy yaml
    - [x] Tests, build artifacts, deploy to Azure
- [x] Diagrams
    - [x] CI/CD Pipeline
    - [x] Web API Architecture
    - [x] Resource group relations
- [ ] ARM template/ bicep files for resource group (environment agnostic ie staging/prod)
- [ ] YAML infrastructure deploy
