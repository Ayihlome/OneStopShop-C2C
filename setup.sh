#!/bin/bash
echo "Setting up environment files..."

# Copy env files
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo "Created backend/.env"
else
  echo "backend/.env already exists, skipping"
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env"
else
  echo ".env already exists, skipping"
fi

# Install snapd if not present
if ! command -v snap &> /dev/null; then
  echo "Installing snapd..."
  sudo apt update
  sudo apt install -y snapd
  sudo systemctl enable --now snapd
  echo "snapd installed"
else
  echo "snapd already installed, skipping"
fi

# Install ngrok if not present
if ! command -v ngrok &> /dev/null; then
  echo "Installing ngrok..."
  sudo snap install ngrok
  echo "ngrok installed"
else
  echo "ngrok already installed, skipping"
fi

# Prompt for ngrok authtoken
echo ""
read -p "Enter your ngrok authtoken (press Enter to skip): " NGROK_TOKEN
if [ ! -z "$NGROK_TOKEN" ]; then
  ngrok config add-authtoken $NGROK_TOKEN
  echo "ngrok authtoken saved"
fi

echo ""
echo "✅ Setup complete!"
echo "1. Edit your .env files with your actual values (passwords and secrets)."
echo "2. Run: docker-compose up"
echo "3. Run: ngrok http 5173"