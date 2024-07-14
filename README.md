## Getting Started

### Prerequisites

- Download and install node.js

  ```sh
  https://nodejs.org/en/download
  ```

- Verify node version [v20.12.2+]
  ```sh
  node -v
  ```
- Verify npm version [v10.7.0+]
  ```sh
  npm -v
  ```
- Install latest npm [optional]
  ```sh
  npm install npm@latest -g
  ```

### Installation

- Clone the repo
  ```sh
  git clone https://github.com/DevTruce/Omni
  ```
- Install NPM packages
  ```sh
  npm install
  ```
- Deploy Commands
  ```sh
  npm run build
  ```
- Deploy Development Environment

  ```sh
  npm run dev
  ```

### Configuration

- Create a .env file located within the project root & provide neccessary details

  ```sh
  OWNER_ID=0

  BOT_TOKEN=""
  BOT_APP_ID=0
  GUILD_ID=0
  TIMEOUT_INTERVAL_MS=5000

  NINJAS_API_URL="https://api.api-ninjas.com/v1/"
  NINJAS_API_KEY=""
  ```
