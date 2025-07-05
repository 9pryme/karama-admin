"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceManagement() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border/40">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Service Management</h2>
          <p className="text-muted-foreground">Manage childcare services and features</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground text-sm">Service management coming soon...</p>
      </div>
    </div>
  );
}