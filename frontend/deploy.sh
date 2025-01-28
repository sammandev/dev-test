#!/bin/bash

ENV=${1:-production}
echo "Starting $ENV deployment..."

# Create logs directory
mkdir -p logs

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build and deploy based on environment
if [ "$ENV" = "production" ]; then
    npm run deploy:prod
else
    npm run deploy:dev
fi

# Check deployment status
pm2 status

echo "Deployment completed for $ENV environment!"