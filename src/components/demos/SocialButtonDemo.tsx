import React from 'react';
import SocialButton from '../oxygen-ui/social-button';

export function SocialButtonDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-6 space-y-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Interactive Social Button Group
      </p>
      <div className="rounded-2xl border border-border bg-surface/50 p-12 flex flex-col items-center justify-center gap-6">
        <SocialButton />
      </div>
    </div>
  );
}

export default SocialButtonDemo;
