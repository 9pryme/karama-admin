"use client";

import { useState, useEffect } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import CareChart from "@/components/dashboard/CareChart";
import CareActivityList from "@/components/dashboard/CareActivityList";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/skeleton-loader";
import NyraLoading from "@/components/ui/nyra-loading";

// Mock childcare data
const mockChildcareData = {
  totalFamilies: 0,
  totalCaregivers: 0,
  activeCare: 0,
  todayMatches: 0,
  todayBookings: 0,
  familyGrowth: 0,
  caregiverGrowth: 0,
  matchGrowth: 0,
  matches: 0
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <NyraLoading size="lg" className="min-h-[60vh]" />;
  }

  return (
    <div className="space-y-3 lg:space-y-4 max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl lg:text-2xl">Welcome to Karama Care!</h1>
        <p className="text-muted-foreground mt-1 text-sm">Connecting families with trusted caregivers every day.</p>
      </motion.div>
      
      <div className="flex flex-col xl:flex-row gap-3 min-w-0">
        <div className="flex-1 space-y-3 lg:space-y-4 min-w-0">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MetricCard 
              title="Total Families" 
              value={mockChildcareData.totalFamilies.toLocaleString()} 
              change={mockChildcareData.familyGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="Active Caregivers" 
              value={mockChildcareData.totalCaregivers.toLocaleString()} 
              change={mockChildcareData.caregiverGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="Families Being Cared" 
              value={mockChildcareData.activeCare.toString()} 
              change={mockChildcareData.matchGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="Today's Matches" 
              value={mockChildcareData.todayBookings.toString()} 
              change={mockChildcareData.bookingGrowth}
              changeType="increase"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CareChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CareActivityList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}