#!/bin/bash

echo "Starting backend build process..."

# Clean npm cache
npm cache clean --force

# Remove node_modules and package-lock.json for clean install
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "Installing dependencies..."
npm install

# Verify installation
echo "Verifying installation..."
npm list --depth=0

echo "Backend build complete!"
