'use client';

import { useActionState } from 'react';
import { unlockDashboard } from '@/app/[lang]/dashboard/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DashboardLogin({ lang }) {
  const [state, action, pending] = useActionState(unlockDashboard.bind(null, lang), null);

  return (
    <main className="grid min-h-svh place-items-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <CardDescription>Enter the dashboard password to see submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dashboard-password">Password</Label>
              <Input
                id="dashboard-password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                aria-invalid={state?.error ? true : undefined}
                className="h-11"
              />
              {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            </div>
            <Button type="submit" className="h-11" disabled={pending}>
              {pending ? 'Checking…' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
