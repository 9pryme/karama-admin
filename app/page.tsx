import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  // Generate non-overlapping positions for stickers using a grid system
  const gridSize = 4; // 4x4 grid
  const cellSize = 100 / gridSize; // Cell size as percentage
  
  const stickers = Array.from({ length: 15 }, (_, i) => {
    // Calculate grid position
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    
    // Add some randomness within the cell
    const top = row * cellSize + (Math.random() * (cellSize/2));
    const left = col * cellSize + (Math.random() * (cellSize/2));
    
    return {
      id: i + 1,
      src: `/stickers/${i + 1}.png`,
      top: Math.min(Math.max(top, 5), 95), // Ensure within 5-95% bounds
      left: Math.min(Math.max(left, 5), 95),
      rotation: Math.random() * 60 - 30, // Random rotation between -30 and 30 degrees
      size: 100, // Fixed size to prevent overlap
      zIndex: 1, // All stickers have zIndex 1
    };
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-primary relative overflow-hidden">
      {/* Random Stickers */}
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute pointer-events-none transition-transform duration-300 hover:scale-110"
          style={{
            top: `${sticker.top}%`,
            left: `${sticker.left}%`,
            transform: `rotate(${sticker.rotation}deg)`,
            zIndex: sticker.zIndex,
          }}
        >
          <Image
            src={sticker.src}
            alt={`Sticker ${sticker.id}`}
            width={sticker.size}
            height={sticker.size}
            className="animate-pulse"
          />
        </div>
      ))}

      {/* Centered Login Form */}
      <div className="w-full max-w-md relative z-20">
       
        <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-xl border border-border/20 p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Karama Care Logo"
                width={200}
                height={80}
                className="mx-auto"
                priority
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Connect families with trusted caregivers
            </p>
          </div>
          
          <LoginForm />
          
         
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-white/80">
            © 2025 Karama Care. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}