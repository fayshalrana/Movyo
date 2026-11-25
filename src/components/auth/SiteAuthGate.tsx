'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';

import { CTAButton } from '@/components/ui';
import { cn } from '@/lib/helper/utils';

type SiteAuthGateProps = {
  needsAuth: boolean;
  children: React.ReactNode;
};

export function SiteAuthGate({ needsAuth, children }: SiteAuthGateProps) {
  const router = useRouter();
  const formId = useId();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!needsAuth) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [needsAuth]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setPending(true);
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok) {
          setError(data.error ?? 'Could not sign in.');
          return;
        }
        setPassword('');
        router.refresh();
      } catch {
        setError('Something went wrong. Try again.');
      } finally {
        setPending(false);
      }
    },
    [password, router],
  );

  if (!needsAuth) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col pointer-events-none select-none blur-md',
          'opacity-40 transition-opacity',
        )}
        aria-hidden
      >
        {children}
      </div>

      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
      >
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white p-6 shadow-xl">
          <h2
            id={`${formId}-title`}
            className="font-sf text-lg font-semibold text-[#111]"
          >
            Enter site password
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            This site is protected. Enter the password to continue.
          </p>
          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111] outline-none ring-[#7eb1e6] focus:border-[#7eb1e6] focus:ring-2"
                placeholder="Password"
                required
                disabled={pending}
              />
            </label>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <CTAButton
              type="submit"
              disabled={pending}
              className={cn('w-full min-w-0 justify-center cursor-pointer')}
            >
              {pending ? 'Checking…' : 'Continue'}
            </CTAButton>
          </form>
        </div>
      </div>
    </div>
  );
}
