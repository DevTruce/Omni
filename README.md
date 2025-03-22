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

- Create a folder named "json" within the project root & leave it empty
- Create a .env file located within the project root & provide neccessary details

  ```.env
  ###################################
  #### Discord Application Setup ####
  BOT_TOKEN=""
  BOT_APP_ID=""
  GUILD_ID=""

  ##########################
  #### Authorized Users ####
  OWNER_ID=""
  ADMIN_IDS=[]

  #########################
  #### API Information ####
  NINJAS_API_URL="https://api.api-ninjas.com/v1/"
  NINJAS_API_KEY=""

  ###################################
  #### RSS Feed Discord Channels ####
  RSS_GITHUB_CHANNEL_ID=""
  RSS_FREECODECAMP_CHANNEL_ID=""
  RSS_DEVTO_CHANNEL_ID=""
  RSS_CSS_TRICKS_CHANNEL_ID=""
  RSS_SMASHING_MAG_CHANNEL_ID=""
  RSS_SITEPOINT_CHANNEL_ID=""
  ```

## Contact

Email: [DevTruce@Outlook.com]()
