<img src="public/logo.png" alt="Sample Image" style="width: 300px;">

Relay library for creating extendable backend UI's

**Technologies:** Relay, GraphQL, React, TypeScript, Tailwind, Vite

### Setup

- Create your project with react, vite and tailwind
  - https://tailwindcss.com/docs/guides/vite?utm_source=chatgpt.com
  - `--template react-ts` instead of `--template react` (TypeScript)
- Add relay (https://relay.dev/docs/getting-started/installation-and-setup/)
- `npm install relay-bee`
- Add peer dependencies:
  - `npm install found-relay` (router)
  - `npm install react-error-boundary`
- Create an extendable backend UI fast!

### Authentication

RelayBee uses JWT-Authentication.  
If you use ApiPlatform (Symfony, PHP) for the backend, this Bundle is recommended: https://symfony.com/bundles/LexikJWTAuthenticationBundle/current/index.html
