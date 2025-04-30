# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  # Disable automatic resource provider registration
  skip_provider_registration = true
}

# Generate a random suffix for unique resource names
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# Create a resource group
resource "azurerm_resource_group" "rg" {
  name     = "esnapup-resources"
  location = "East US"
}

# Create an App Service Plan (shared by both frontend and API)
resource "azurerm_service_plan" "appserviceplan" {
  name                = "esnapup-plan-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}

# Create the Frontend Web App
resource "azurerm_linux_web_app" "frontend" {
  name                = "esnapup-ui-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id

  site_config {
    application_stack {
      node_version = "16-lts"
    }
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITE_NODE_DEFAULT_VERSION"        = "~16"
    "SCM_DO_BUILD_DURING_DEPLOYMENT"      = "true"
    "REACT_APP_API_URL"                   = "https://esnapup-api-${random_string.suffix.result}.azurewebsites.net/api"
  }
}

# Create the API Web App
resource "azurerm_linux_web_app" "api" {
  name                = "esnapup-api-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id

  site_config {
    application_stack {
      node_version = "16-lts"
    }
    cors {
      allowed_origins     = ["https://esnapup-ui-${random_string.suffix.result}.azurewebsites.net"]
      support_credentials = true
    }
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITE_NODE_DEFAULT_VERSION"        = "~16"
    "SCM_DO_BUILD_DURING_DEPLOYMENT"      = "true"
    "NODE_ENV"                           = "production"
  }
}

# Output the website URLs
output "frontend_url" {
  value = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "api_url" {
  value = "https://${azurerm_linux_web_app.api.default_hostname}/api"
}

output "frontend_name" {
  value = azurerm_linux_web_app.frontend.name
}

output "api_name" {
  value = azurerm_linux_web_app.api.name
}