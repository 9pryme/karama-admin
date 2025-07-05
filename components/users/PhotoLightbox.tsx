import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ProfilePicture } from "@/lib/services/user";

interface PhotoLightboxProps {
  photos: ProfilePicture[];
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number | null;
  onNavigate: (direction: 'prev' | 'next') => void;
  userName: string;
}

export function PhotoLightbox({ 
  photos, 
  isOpen, 
  onClose, 
  selectedIndex, 
  onNavigate, 
  userName 
}: PhotoLightboxProps) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate('prev');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (selectedIndex === null || !photos[selectedIndex]) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 bg-black/20 text-white hover:bg-black/40"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="relative">
            <div className="relative aspect-square max-h-[80vh] w-full">
              <Image
                src={photos[selectedIndex].path}
                alt={`${userName} photo ${selectedIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            
            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                  onClick={() => onNavigate('prev')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                  onClick={() => onNavigate('next')}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} of {photos.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 