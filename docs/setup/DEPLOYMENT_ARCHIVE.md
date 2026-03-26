# Deployment Archive
## Oracle vs. Critic Experiment Platform

**Current Status:** ✅ Platform deployed at https://demo-project-two-peach.vercel.app/

This document archives the deployment process for reference. The platform is already live and functional.

---

## Deployment Summary

### Live Environment
- **URL:** https://demo-project-two-peach.vercel.app/
- **Hosting:** Vercel
- **Database:** Supabase (9 tables + 4 views)
- **Status:** Production-ready, pilot testing phase

### Environment Variables Configured
- `NEXT_PUBLIC_SUPABASE_URL`: https://rdcuqbsqnyzwxnyvndsq.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Configured in Vercel Dashboard
- `NEXT_PUBLIC_APP_NAME`: Oracle vs. Critic Experiment
- `NEXT_PUBLIC_ENABLE_DEBUG_MODE`: true (for testing)
- `NEXT_PUBLIC_SKIP_POST_TEST_DELAY`: true (for testing)

---

## Original Deployment Process

### Initial Deployment (Completed)

1. **Vercel CLI Installation**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy to Production**
```bash
cd "/Users/anastassiya/Desktop/Demo project"
vercel --prod
```

4. **Configure Environment Variables**
   - Went to Vercel Dashboard → Settings → Environment Variables
   - Added all NEXT_PUBLIC_* variables
   - Redeployed to apply changes

### Verification Steps Completed

✅ Homepage loads at deployment URL
✅ Registration form functional
✅ User assignment to 4 groups (Oracle×High, Oracle×Calibrated, Critic×High, Critic×Calibrated)
✅ Both interfaces (Oracle blue, Critic purple) working
✅ Data logging to Supabase verified
✅ Randomization active
✅ Database schema applied (9 tables + 4 views)

---

## Future Redeployment

If you need to redeploy:

### Quick Redeploy
```bash
vercel --prod
```

### Force Rebuild
```bash
vercel --prod --force
```

### View Deployment Logs
```bash
vercel logs
```

### List Deployments
```bash
vercel ls
```

---

## Database Schema

Applied via Supabase SQL Editor:
- 9 core tables (users, sessions, case_interactions, evidence_exploration, ui_events, nfc_responses, likert_assessments, interview_transcripts, group_assignments)
- 4 analysis views (overreliance_by_group, learning_gain_by_group, sdt_metrics_by_group, randomization_balance)

Schema file: `supabase/schema.sql`

---

## Production Checklist

Before launching full study (N=120):
- [ ] Update environment variables for production mode:
  - `NEXT_PUBLIC_ENABLE_DEBUG_MODE=false`
  - `NEXT_PUBLIC_SKIP_POST_TEST_DELAY=false`
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Test all 25 cases
- [ ] Verify foil distribution (30% errors in Calibrated groups)
- [ ] Run pilot test with N=5-10 users

---

## Monitoring

### Check Platform Status
Visit: https://demo-project-two-peach.vercel.app/

### Check Database
Visit: https://app.supabase.com/project/rdcuqbsqnyzwxnyvndsq

### View Logs
```bash
vercel logs --prod
```

### Check Randomization Balance
In Supabase SQL Editor:
```sql
SELECT * FROM randomization_balance;
```

Expected: ~25% of users in each of 4 groups (after sufficient N)

---

## Rollback Procedure

If issues arise:

1. **Redeploy previous version**
```bash
vercel rollback
```

2. **Or specify deployment**
```bash
vercel ls
vercel rollback [deployment-url]
```

3. **Check database integrity**
```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM case_interactions;
```

---

## Support Contacts

**Vercel Dashboard:** https://vercel.com/dashboard
**Supabase Dashboard:** https://app.supabase.com
**GitHub Repository:** (if configured)

---

**Deployment Date:** March 24, 2026
**Platform Version:** 1.0.0
**Status:** ✅ Live and operational
