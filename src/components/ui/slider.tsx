import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center group", className)}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/15"
      style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
    >
      <SliderPrimitive.Range
        className="absolute h-full rounded-full bg-gradient-to-r from-primary to-accent"
        style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-3 w-3 rounded-full bg-white shadow-md ring-offset-background transition-all duration-200 hover:scale-125 hover:shadow-[0_0_12px_hsl(var(--primary)/0.8)] focus-visible:scale-125 focus-visible:shadow-[0_0_12px_hsl(var(--primary)/0.8)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
