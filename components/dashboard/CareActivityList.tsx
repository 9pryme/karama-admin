"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function CareActivityList() {
  return (
    <div className="bg-card rounded-md shadow-sm border border-border/40">
      <div className="p-4">
        <h3 className="text-base font-semibold mb-4">Recent Care Activity</h3>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium mb-2">Coming Soon!</h4>
          <p className="text-sm text-muted-foreground max-w-sm">
            We're working hard to bring you care activity tracking. Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}