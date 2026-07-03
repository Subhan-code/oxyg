import { SetupSteps } from "../oxygen-ui/setup-steps";

const ONBOARDING_STEPS = [
  { id: "1", title: "Welcome Aboard" },
  { id: "2", title: "Verifying Details" },
  { id: "3", title: "Account Created" },
  { id: "4", title: "Configuring Workspace" },
  { id: "5", title: "Finalizing Setup" },
];

const INSTALL_STEPS = [
  { id: "1", title: "Cloning repository" },
  { id: "2", title: "Installing dependencies" },
  { id: "3", title: "Compiling assets" },
  { id: "4", title: "Running migrations" },
  { id: "5", title: "Starting dev server" },
];

export function SetupStepsDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Onboarding flow — 3 s per step
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 flex flex-col items-center justify-center min-h-[360px]">
          <SetupSteps steps={ONBOARDING_STEPS} duration={3000} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Install flow — 2 s per step
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 flex flex-col items-center justify-center min-h-[360px]">
          <SetupSteps steps={INSTALL_STEPS} duration={2000} />
        </div>
      </div>
    </div>
  );
}

export default SetupStepsDemo;
