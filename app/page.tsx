/**
 * Main Entry Point - Next.js App Router
 * Renders the SessionOrchestrator which manages entire experimental flow
 */

import SessionOrchestrator from '@/components/SessionOrchestrator';

// Force dynamic rendering since we use client-side localStorage
export const dynamic = 'force-dynamic';

export default function Home() {
  return <SessionOrchestrator />;
}
