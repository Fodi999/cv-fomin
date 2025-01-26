"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "@/context/ThemeContext"; // Подключаем контекст темы
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { isDarkMode, toggleTheme } = useTheme(); // Используем состояние и функцию переключения

  return (
    <SwitchPrimitives.Root
      checked={isDarkMode} // Связываем состояние с контекстом
      onCheckedChange={toggleTheme} // Вызываем функцию toggleTheme при переключении
      className={cn(
        "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950 dark:data-[state=checked]:bg-green-400 dark:data-[state=unchecked]:bg-gray-700",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-gray-950"
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };




