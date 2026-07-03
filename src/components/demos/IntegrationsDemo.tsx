import React from 'react';
import { Integrations } from '../oxygen-ui/integrations';

export function IntegrationsDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
        SaaS Integrations List
      </p>
      <div className="py-4">
        <Integrations />
      </div>
    </div>
  );
}

export default IntegrationsDemo;
