import React from 'react';
import CosmicSpectrum from '../oxygen-ui/CosmicSpectrum';

export function CosmicSpectrumDemo() {
  return (
    <div className="w-full min-h-[70vh] rounded-3xl border border-border overflow-hidden bg-[#0A0A0A] relative flex flex-col justify-between">
      <CosmicSpectrum color="original" blur />
    </div>
  );
}

export default CosmicSpectrumDemo;
