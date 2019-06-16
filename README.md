# mia-real-agent
An website to management chat history and bot training

## Stack
- NodeJS
- Wit.ai
- MongoDB
- Socket.io

## Instruction
- Install packages

```
yarn
// or
npm install
```

- Build Mia Real Agent

```
yarn build
```

- Start built binary

```
yarn start:propd
```

- Running Mia in dev mode

```
yarn start
```

## Required Token
- FB_PAGE_TOKEN - Facebook Fanpage Token

  You can get **FB_PAGE_TOKEN** by follow the following steps
  <ol type="number">
    <li>Open App dashboard</li>
    <li>Under `Products` tab, select `Messenger`</li>
    <li>Searching for `Access Tokens` on `Messenger` product page</li>
    <li>Select a page you want to get token. If you haven't had any page yet, you can create new one</li>
  </ol>

- FB_APP_SECRET - Facebook App Token

  You can get **FB_APP_SECRET** by follow the following steps
  <ol type="number">
    <li>Open App dashboard</li>
    <li>Navigate to `Settings` and then select `Basic`</li>
    <li>Click `Show` button on `App Secret` field to reveal the token</li>
  </ol>


- WIT_TOKEN - Wit.ai **server** Token

  You can get **WIT_TOKEN** by follow the following steps
  <ol type="number">
    <li>Open your Wit.ai app dashboard</li>
    <li>Navigate to `Setting` screen by clicking `Setting` button on the **top right**</li>
    <li>Take a look at `API Details` and you will find your **Server token** of your app</li>
  </ol>

## Architecture

- null
