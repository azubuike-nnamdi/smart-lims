// InputWithIcon.tsx
import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";

interface InputWithIconProps extends InputProps {
  icon: LucideIcon;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({ icon: Icon, ...props }) => (
  <div className="relative flex items-center">
    <span className="absolute left-3 text-gray-400">
      <Icon size={20} />
    </span>
    <Input className="pl-10" {...props} />
  </div>
);
