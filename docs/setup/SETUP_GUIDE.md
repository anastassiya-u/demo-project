# Setup Guide
## Oracle vs. Critic Experiment Platform

**Platform Status:** ✅ Already deployed at https://demo-project-two-peach.vercel.app/

This guide covers local development setup. For deployment information, see [DEPLOYMENT_ARCHIVE.md](DEPLOYMENT_ARCHIVE.md).

---

## Quick Start (5 Minutes)

### Prerequisites
- Node.js ≥18.0.0
- npm ≥9.0.0
- Supabase account

### 1. Install Node.js (if needed)

Check if installed:
```bash
node --version
```

If not installed:
```bash
# macOS (Homebrew)
brew install node@20

# Or download from nodejs.org
```

### 2. Install Dependencies

```bash
cd "/Users/anastassiya/Desktop/Demo project"
npm install
```

Takes 2-3 minutes. Installs ~100 packages.

### 3. Configure Supabase

Get credentials from [app.supabase.com](https://app.supabase.com):
1. Select your project
2. Go to **Settings** → **API**
3. Copy **Project URL** and **anon public key**

Create `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
NEXT_PUBLIC_APP_NAME="Oracle vs. Critic Experiment"
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
NEXT_PUBLIC_SKIP_POST_TEST_DELAY=false
```

### 4. Initialize Database

Copy schema:
```bash
cat supabase/schema.sql | pbcopy
```

Then:
1. Open [app.supabase.com](https://app.supabase.com)
2. Click **SQL Editor** → **New query**
3. Paste (Cmd+V) and click **Run**

Expected: "Success. No rows returned"

Verify in **Table Editor**: should see 9 tables (users, sessions, case_interactions, etc.)

### 5. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Verification

### Test Registration
1. Fill in test data:
   - Student ID: TEST001
   - Age: 25
   - Gender: Male
   - Medical School: Astana Medical University
   - Year: 3
   - Check consent
2. Click "Begin Experiment"

Expected:
- Redirects to Pre-Test phase
- Console shows: "Logger initialized for user [uuid] (oracle/critic / high/calibrated)"
- Supabase users table shows 1 row

### Test Interfaces

**If assigned to Oracle (Blue):**
- Immediate AI recommendation
- All evidence visible at once
- No hypothesis input required

**If assigned to Critic (Purple):**
- Must enter diagnosis before seeing AI
- Contrastive evidence (FOR/AGAINST)
- Progressive reveal buttons

### Switch Groups

To test the other interface:
```javascript
// In browser console (F12)
localStorage.clear()
// Refresh and register with TEST002
```

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection fails
Verify environment variables:
```bash
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

If undefined: check `.env.local` exists and restart server.

### Port 3000 in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Cases not loading
```bash
node -e "console.log(require('./src/data/cases.json').cases.length)"
```

Should output: 25

---

## Testing Checklist

Before pilot testing:
- [ ] Both interfaces work (Oracle and Critic)
- [ ] All 25 cases load
- [ ] Pre-test, NFC, Intervention phases function
- [ ] Progressive reveal works (Critic)
- [ ] Data logs to Supabase
- [ ] Randomization active
- [ ] Session persists across refreshes

---

## Production Configuration

Before data collection:
- [ ] Set `NEXT_PUBLIC_ENABLE_DEBUG_MODE=false`
- [ ] Set `NEXT_PUBLIC_SKIP_POST_TEST_DELAY=false`
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Review API usage limits

---

## Support

**Data Export:**
Supabase → Table Editor → case_interactions → ... → Download as CSV

**Reset User:**
Delete rows from users, sessions, and case_interactions tables for that user_id

**Change Case Count:**
Edit cases.json and update SessionOrchestrator.jsx

---

**Setup Complete!** Ready for pilot testing with N=5-10 users before full launch (N=120).
