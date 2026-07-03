"use client";

import { useState, useId } from "react";
import { Switch } from "@/src/components/ui/switch";
import { Label } from "@/src/components/ui/label";
import { BellOff, BellRing } from "lucide-react";

const SwitchWithIconDemo = () => {
  const id = useId();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor={id} className="cursor-pointer">
        Notifications{" "}
        {enabled ? (
          <BellOff className="size-4 inline-block ml-2" />
        ) : (
          <BellRing className="size-4 inline-block ml-2" />
        )}
      </Label>
    </div>
  );
};

export default SwitchWithIconDemo;
