import React from 'react';
import SpinnerDefault from './SpinnerDefault';
import SpinnerCircleFilled from './SpinnerCircleFilled';
import SpinnerThrobber from './SpinnerThrobber';
import SpinnerBars from './SpinnerBars';
import { OrbitalSpinner } from '../oxygen-ui/orbital-spinner';
import { SpinnerOpticsDemo } from './SpinnerOpticsDemo';

export default function SpinnersDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background text-foreground min-h-[300px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center text-center">
        <div className="flex flex-col items-center gap-3">
          <SpinnerDefault />
          <span className="text-xs text-muted-foreground font-medium">Default</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SpinnerCircleFilled />
          <span className="text-xs text-muted-foreground font-medium">Circle Filled</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SpinnerThrobber />
          <span className="text-xs text-muted-foreground font-medium">Throbber</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SpinnerBars />
          <span className="text-xs text-muted-foreground font-medium">Bars</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <OrbitalSpinner size="md" />
          <span className="text-xs text-muted-foreground font-medium">Orbital</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SpinnerOpticsDemo />
          <span className="text-xs text-muted-foreground font-medium">iOS Optics</span>
        </div>
      </div>
    </div>
  );
}
