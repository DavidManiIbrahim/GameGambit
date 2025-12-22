# GameGambit

GameGambit is a web3 website focused on games, strategy, and community resources. It provides a lightweight front-end for discovering games, reading strategy guides, tracking favorites, and experimenting with leaderboards and community content.

> NOTE: This repository is a starting point  some features described here may be planned or in progress.

## What the site is about

- Discover and browse games and game-related content
- Read and publish short strategy guides and tips
- Track favorites and quick notes about strategies
- (Planned) Leaderboards and match history for supported games

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS 

## Getting started (run locally)

Open a terminal (cmd.exe) and run the following commands:

`
npm install
npm run dev
`

Then open http://localhost:3000 in your browser.

Files to look at while developing:

- app/page.js  main page content
- app/layout.js  site layout and global UI
- app/globals.css  global styles
- public/  static assets

Common npm scripts (check package.json):

- 
npm run dev  start dev server
- 
npm run build  build for production
- 
npm start  run the production build

## Deploy

This project deploys easily on Vercel. Connect the repository to Vercel and it will detect the Next.js app and handle builds automatically.

## Contributing

1. Fork the repository and create a branch for your change.
2. Make small, focused changes and include tests where appropriate.
3. Open a pull request describing your change.

If you'd like help choosing features or issues to work on, open an issue and we can discuss priorities.

## Google OAuth (NextAuth) Setup 🔐

Follow these steps to enable Google Sign-In using NextAuth:

1. Create OAuth credentials in Google Cloud Console:
   - Go to APIs & Services → Credentials → Create Credentials → OAuth client ID.
   - Set the application type to "Web application" and add the authorized redirect URI:
     - `http://localhost:3000/api/auth/callback/google` (for local dev)
   - Save the **Client ID** and **Client Secret**.

2. Add environment variables (create `.env.local` in project root):

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
NEXTAUTH_SECRET=some-random-secret (run `openssl rand -hex 32`)
NEXTAUTH_URL=http://localhost:3000
```

### Discord OAuth setup
1. Create an application in the Discord Developer Portal: https://discord.com/developers/applications
2. Under OAuth2 → OAuth2 URL Generator, select `identify` and `email` scopes (or others you need).
3. Add the redirect URI for local development:
   - `http://localhost:3000/api/auth/callback/discord`
4. Copy the Client ID and Client Secret and add them to `.env.local` (see above).
3. Install dependencies and run locally:

```
npm install
npm run dev
```

4. What we added for you:
- `npm i next-auth` (dependency)
- `app/api/auth/[...nextauth]/route.js` — NextAuth route with Google provider
- `lib/auth.js` — NextAuth `authOptions` + helper
- Sign-in page updated to call `signIn('google')`
- `components/Providers.js` wrapped with `SessionProvider`
- `components/Sidebar.js` uses `signOut()` to log out

5. Deploy: set the same env vars in Vercel and add production redirect URL(s) (e.g., `https://your-app.vercel.app/api/auth/callback/google`).

---

## License

See the GameGambit/LICENSE file for license details.

