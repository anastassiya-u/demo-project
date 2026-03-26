#!/bin/bash
# Automated Vercel Deployment Script

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Oracle vs. Critic - Vercel Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "/Users/anastassiya/Desktop/Demo project"

# Check if already logged in
if vercel whoami &> /dev/null; then
    USERNAME=$(vercel whoami)
    echo "✓ Already logged in as: $USERNAME"
    echo ""
else
    echo "🔐 Step 1: Login to Vercel"
    echo "────────────────────────────────────────────────"
    echo "Choose your login method when prompted."
    echo ""
    vercel login
    echo ""
    echo "✓ Login successful!"
    echo ""
fi

# Deploy
echo "🚀 Step 2: Deploying to Production"
echo "────────────────────────────────────────────────"
echo ""
echo "The CLI will ask a few questions:"
echo "  - Set up and deploy? → Y"
echo "  - Link to existing project? → N"
echo "  - Project name? → Press Enter"
echo "  - Directory? → Press Enter"
echo "  - Override settings? → N"
echo ""
read -p "Press Enter to start deployment..."

vercel --prod

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANT: Configure Environment Variables"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select project: oracle-critic-experiment"
echo "3. Settings → Environment Variables"
echo "4. Add these variables:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL=https://rdcuqbsqnyzwxnyvndsq.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
echo "   NEXT_PUBLIC_ENABLE_DEBUG_MODE=true"
echo ""
echo "5. Save and Redeploy"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Your deployment URL will be shown above."
echo "   Share it so I can test the platform!"
echo ""
