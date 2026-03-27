import { cn } from "@/src/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/logo.png" 
        alt="SwiftRecharge Logo" 
        className="h-full w-auto object-contain drop-shadow-sm"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image is not found
          e.currentTarget.src = "https://picsum.photos/seed/swiftrecharge/400/200";
        }}
      />
      {!iconOnly && (
        <span className="sr-only">SwiftRecharge</span>
      )}
    </div>
  );
}
