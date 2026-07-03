import { Button } from "@/src/components/blocks/button";

export function ButtonBlocksDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button withArrow>Start building</Button>
      <Button variant="secondary" withArrow>
        View components
      </Button>
      <Button variant="outline">Default action</Button>
    </div>
  );
}
