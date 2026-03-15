# Gaming Platform API Research

Research on retrieving player achievements and stats from various gaming platforms.
Last updated: March 2026.

---

## ✅ Steam (Implemented)

**Status:** Fully working. Public REST API with API key.

### How to get credentials
1. Go to https://steamcommunity.com/dev/apikey
2. Sign in with your Steam account
3. Register a domain name (any domain works) to get your API key
4. Your Steam ID (64-bit) is in your profile URL or use https://steamid.io

### Key endpoints
| Endpoint | Description |
|----------|-------------|
| `IPlayerService/GetRecentlyPlayedGames/v1` | Recently played games (last 2 weeks) |
| `ISteamUserStats/GetPlayerAchievements/v1` | Player achievements per game (includes unlock timestamps) |
| `ISteamUserStats/GetSchemaForGame/v2` | Achievement metadata (names, descriptions, icon URLs) |
| `IPlayerService/GetOwnedGames/v1` | All owned games with playtime stats |

### Notes
- Base URL: `https://api.steampowered.com/`
- Profile achievements must be set to **Public** in Steam privacy settings
- Rate limits: Undocumented but generous. We sample up to 50 games to avoid hammering.
- No OAuth needed — just the API key as a query parameter
- Revalidation interval: 5 hours (achievements don't change that frequently)

---

## ⚠️ Xbox / Windows (Viable via OpenXBL)

**Status:** Possible using third-party proxy API. No official public API from Microsoft.

### OpenXBL (xbl.io)
- **Website:** https://xbl.io
- **Type:** Unofficial third-party proxy that authenticates with Xbox Live on your behalf
- **Free tier:** 150 requests/hour

### How to get credentials
1. Go to https://xbl.io and sign in with your Xbox/Microsoft account
2. You'll get an API key from the dashboard
3. Your XUID (Xbox User ID) is shown in the dashboard or can be looked up

### Key endpoints
| Endpoint | Description |
|----------|-------------|
| `GET /api/v2/achievements/player/{xuid}` | Player achievements across all games |
| `GET /api/v2/achievements/title/{xuid}/{titleId}` | Achievements for a specific game |
| `GET /api/v2/player/summary/{xuid}` | Player profile summary |

### Notes
- All requests need header: `X-Authorization: YOUR_API_KEY`
- Returns Xbox Live achievements including gamerscore
- Works for Xbox, PC Game Pass, and Windows Store games
- **Risk:** This is unofficial. Microsoft could block it, but it has been stable for years.
- Alternative: Microsoft Graph API has some Xbox endpoints but requires complex OAuth app registration

---

## ❌ Epic Games Store

**Status:** NOT feasible. No public API for player achievements.

### Why it doesn't work
- Epic has the **Epic Online Services (EOS) SDK** but it's for game **developers/publishers** only
- There is no REST API to query a player's achievement data externally
- The Epic Games Store launcher shows achievements, but that data is not exposed via any public endpoint
- No known third-party proxy services exist for Epic achievements

### Alternatives considered
- **EOS SDK:** Requires registering as a game developer. Cannot be used to fetch your own player profile.
- **Web scraping:** Epic's achievement pages are behind authentication and heavily JavaScript-rendered. Fragile and against ToS.

### Recommendation
Wait for Epic to release a public player API. There have been community requests but no timeline from Epic.

---

## ❌ Ubisoft Connect

**Status:** NOT feasible. No public API at all.

### Why it doesn't work
- Ubisoft has **no public REST API** for player data
- The only known libraries are reverse-engineered unofficial ones:
  - They require your Ubisoft account credentials (email + password)
  - They use internal Ubisoft endpoints that can change without notice
  - **Risk of account ban** — Ubisoft's ToS prohibits unauthorized API access
- No third-party proxy services exist

### Libraries found (NOT recommended)
- `ubisoft-api-python` (Python) — requires login credentials, reverse-engineered
- Various Node.js wrappers — same approach, same risks

### Recommendation
Do not attempt. The risk of account ban and the maintenance burden of reverse-engineered APIs is not worth it.

---

## Summary

| Platform | API Available | Auth Method | Risk Level | Recommended |
|----------|:------------:|-------------|:----------:|:-----------:|
| **Steam** | ✅ Official | API Key | None | ✅ Yes |
| **Xbox** | ⚠️ OpenXBL | API Key | Low | ✅ Yes |
| **Epic** | ❌ None | N/A | N/A | ❌ No |
| **Ubisoft** | ❌ None | Credentials | High | ❌ No |

### Next steps
1. **Xbox:** Register at https://xbl.io, get API key and XUID
2. Add `XBOX_API_KEY` and `XBOX_XUID` to GitHub secrets and Azure SWA app settings
3. Create `/api/xbox` route similar to `/api/steam`
4. Combine stats from Steam + Xbox in the achievement widget
