import React from 'react';
import { LogoCloud } from '../oxygen-ui/logo-cloud';

export function LogoCloudDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
        Logo Grid Showcase
      </p>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <LogoCloud />
      </div>
    </div>
  );
}

export default LogoCloudDemo;
