#!/bin/bash

# Login to Azure (if not already logged in)
az account show &> /dev/null || az login

echo "Registering essential Azure resource providers..."

# Register only the essential providers needed for our deployment
az provider register --namespace Microsoft.Web
az provider register --namespace Microsoft.Network

echo "Waiting for resource providers to register (this may take a few minutes)..."
az provider show -n Microsoft.Web --query "registrationState" -o tsv
az provider show -n Microsoft.Network --query "registrationState" -o tsv

echo "Resource providers registration completed."
