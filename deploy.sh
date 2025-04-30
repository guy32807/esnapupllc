#!/bin/bash

# Exit on any error
set -e

echo "==== Deploying ESnapup Application to Azure ===="

# Get the web app names from Terraform outputs
FRONTEND_NAME=$(terraform output -raw frontend_name)
API_NAME=$(terraform output -raw api_name)

echo "Using the following web app names:"
echo "Frontend: $FRONTEND_NAME"
echo "API: $API_NAME"

# Build and deploy the frontend
echo "Building frontend application..."
cd esnapup-ui
npm install
npm run build

echo "Deploying frontend to Azure Web App..."
cd build
zip -r ../../frontend-build.zip *
cd ../..

# Build and deploy the API
echo "Building API application..."
cd esnapup-api
npm install
# Create a production build directory for the API
mkdir -p dist
cp -r src/* dist/
cp package.json dist/
cp package-lock.json dist/

echo "Deploying API to Azure Web App..."
cd dist
zip -r ../../api-build.zip *
cd ../..

# Deploy using Azure CLI
echo "Uploading frontend build..."
az webapp deploy --resource-group esnapup-resources --name $FRONTEND_NAME --src-path frontend-build.zip --type zip

echo "Uploading API build..."
az webapp deploy --resource-group esnapup-resources --name $API_NAME --src-path api-build.zip --type zip

echo "==== Deployment completed successfully! ===="
echo "Frontend URL: https://$FRONTEND_NAME.azurewebsites.net"
echo "API URL: https://$API_NAME.azurewebsites.net/api"

# Cleanup
rm frontend-build.zip api-build.zip#!/bin/bash

# Exit on any error
set -e

echo "==== Deploying ESnapup Application to Azure ===="

# Get the web app names from Terraform outputs
FRONTEND_NAME=$(terraform output -raw frontend_name)
API_NAME=$(terraform output -raw api_name)

echo "Using the following web app names:"
echo "Frontend: $FRONTEND_NAME"
echo "API: $API_NAME"

# Build and deploy the frontend
echo "Building frontend application..."
cd esnapup-ui
npm install
npm run build

echo "Deploying frontend to Azure Web App..."
cd build
zip -r ../../frontend-build.zip *
cd ../..

# Build and deploy the API
echo "Building API application..."
cd esnapup-api
npm install
# Create a production build directory for the API
mkdir -p dist
cp -r src/* dist/
cp package.json dist/
cp package-lock.json dist/

echo "Deploying API to Azure Web App..."
cd dist
zip -r ../../api-build.zip *
cd ../..

# Deploy using Azure CLI
echo "Uploading frontend build..."
az webapp deploy --resource-group esnapup-resources --name $FRONTEND_NAME --src-path frontend-build.zip --type zip

echo "Uploading API build..."
az webapp deploy --resource-group esnapup-resources --name $API_NAME --src-path api-build.zip --type zip

echo "==== Deployment completed successfully! ===="
echo "Frontend URL: https://$FRONTEND_NAME.azurewebsites.net"
echo "API URL: https://$API_NAME.azurewebsites.net/api"

# Cleanup
rm frontend-build.zip api-build.zip
