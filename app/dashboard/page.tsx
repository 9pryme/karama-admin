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
import { useUsers } from "@/hooks/use-users";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate metrics from real user data
  const metrics = users ? {
    totalFamilies: users.families.length,
    totalCaregivers: users.caregivers.length,
    totalNewUsers: users.newUsers.length,
    totalUsers: users.families.length + users.caregivers.length + users.newUsers.length,
    activeUsers: [...users.families, ...users.caregivers, ...users.newUsers].filter(user => user.activity_status === "ACTIVE").length,
    // For growth metrics, we'll set to 0 since we don't have historical data
    familyGrowth: 0,
    caregiverGrowth: 0,
    newUserGrowth: 0,
    activeGrowth: 0
  } : {
    totalFamilies: 0,
    totalCaregivers: 0,
    totalNewUsers: 0,
    totalUsers: 0,
    activeUsers: 0,
    familyGrowth: 0,
    caregiverGrowth: 0,
    newUserGrowth: 0,
    activeGrowth: 0
  };

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
              value={isLoadingUsers ? "..." : metrics.totalFamilies.toLocaleString()} 
              change={metrics.familyGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="Active Caregivers" 
              value={isLoadingUsers ? "..." : metrics.totalCaregivers.toLocaleString()} 
              change={metrics.caregiverGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="New Users" 
              value={isLoadingUsers ? "..." : metrics.totalNewUsers.toString()} 
              change={metrics.newUserGrowth}
              changeType="increase"
            />
            <MetricCard 
              title="All Users" 
              value={isLoadingUsers ? "..." : metrics.activeUsers.toString()} 
              change={metrics.activeGrowth}
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