"use client";

import { useState } from "react";
import { CartesianGrid, Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock childcare data
const data = [
  { name: "Jul 1", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 2", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 3", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 4", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 5", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 6", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
  { name: "Jul 7", families: 0, caregivers: 0, matches: 0, bookings: 0, hours_care: 0 },
];

const timeRanges = [
  { value: '1W', label: '7D' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1Y', label: '1Y' },
];

const chartMetrics = [
  { 
    value: 'families', 
    label: 'Active Families', 
    dataKey: 'families',
    formatValue: (value: number) => value.toString(),
    tooltipLabel: 'Active Families'
  },
  { 
    value: 'caregivers', 
    label: 'Available Caregivers', 
    dataKey: 'caregivers',
    formatValue: (value: number) => value.toString(),
    tooltipLabel: 'Available Caregivers'
  },
  { 
    value: 'matches', 
    label: 'New Matches', 
    dataKey: 'matches',
    formatValue: (value: number) => value.toString(),
    tooltipLabel: 'New Matches'
  },
  { 
    value: 'bookings', 
    label: 'Care Bookings', 
    dataKey: 'bookings',
    formatValue: (value: number) => value.toString(),
    tooltipLabel: 'Care Bookings'
  },
  { 
    value: 'hours_care', 
    label: 'Hours of Care', 
    dataKey: 'hours_care',
    formatValue: (value: number) => `${(value / 1000).toFixed(1)}K hrs`,
    tooltipLabel: 'Hours of Care'
  },
];

interface CareChartProps {
  legendItems?: {
    label: string;
    color: string;
    indicator: string;
  }[];
}

const CareChart = ({ legendItems }: CareChartProps) => {
  const [timeRange, setTimeRange] = useState('1W');
  const [selectedMetric, setSelectedMetric] = useState('families');

  const currentMetric = chartMetrics.find(metric => metric.value === selectedMetric) || chartMetrics[0];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-1 text-sm">{label}</p>
          <p className="text-primary font-semibold text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            {currentMetric.tooltipLabel}: {currentMetric.formatValue(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg font-semibold">Care Analytics</CardTitle>
          
          <div className="flex items-center gap-3">
            {/* Metric Selector Dropdown */}
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chartMetrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value} className="text-xs">
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Time Range Buttons */}
            <div className="flex gap-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range.value)}
                  className="px-2 py-1 h-7 text-xs"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="careGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={currentMetric.formatValue}
                width={60}
              />
              <Tooltip content={customTooltip} />
              <Area
                type="monotone"
                dataKey={currentMetric.dataKey}
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#careGradient)"
                dot={false}
                activeDot={{ 
                  r: 5, 
                  fill: 'hsl(var(--primary))', 
                  stroke: '#fff', 
                  strokeWidth: 2 
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareChart;