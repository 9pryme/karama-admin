"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturedCaregiversCard() {
  return (
    <div className="bg-primary text-white rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Caregivers</h2>
        </div>

        <div className="flex items-center justify-center py-8">
          <p className="text-white/80 text-sm">Feature coming soon...</p>
        </div>
      </div>
    </div>
  );
}