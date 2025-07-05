"use client";

import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  ScrollText,
  Settings,
  Users,
  Mail,
  Wrench,
  Shield,
  CircleUserRound,
  CircleDollarSign,
  LogOut,
  Menu,
  X,
  HelpCircle,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Users2,
  Wallet,
  ArrowRightLeft,
  Receipt,
  Circle,
  Search,
  Heart,
  Calendar,
  UserPlus,
  MessageSquare,
  FileText,
  Clock,
  Baby,
  Flag,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: Users2,
    hasDropdown: true,
    subItems: [
      {
        name: 'All Users',
        href: '/dashboard/users',
        icon: Users2,
      },
      {
        name: 'Reported',
        href: '/dashboard/reported-users',
        icon: Flag,
        disabled: true,
      },
      {
        name: 'Flagged',
        href: '/dashboard/flagged-users',
        icon: Flag,
        disabled: true,
      },
    ]
  },
  {
    name: 'Matches',
    href: '/dashboard/matches',
    icon: Heart,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Mail,
  }
];

const otherNavigation = [
  {
    name: 'Platform Config',
    href: '/dashboard/config',
    icon: Wrench,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    name: 'Roles & Permissions',
    href: '/dashboard/roles',
    icon: Shield,
  },
  {
    name: 'Care Providers',
    href: '/dashboard/providers',
    icon: Users,
  },
  {
    name: 'Help & Support',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
];

// Sidebar Context
interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['Profiles']); // Profiles dropdown open by default
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const toggleDropdown = (itemName: string) => {
    if (isCollapsed) return; // Don't toggle dropdowns when collapsed
    
    setOpenDropdowns(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isDropdownOpen = (itemName: string) => openDropdowns.includes(itemName);

  const renderNavSection = (items: any[], sectionTitle?: string) => {
    return (
      <div className="space-y-1">
        {sectionTitle && !isCollapsed && (
          <p className="text-[10px] font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">
            {sectionTitle}
          </p>
        )}
        {items.map((item) => {
          const isActive = pathname === item.href || (item.subItems && item.subItems.some((subItem: any) => pathname === subItem.href));
          
          return (
            <div key={item.name}>
              {item.hasDropdown ? (
                <>
                  {/* Parent Item with Dropdown */}
                  <button
                    onClick={() => isCollapsed ? {} : toggleDropdown(item.name)}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all duration-200 group',
                      isCollapsed ? 'justify-center' : 'justify-between',
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-xs">{item.name}</span>
                      )}
                    </div>
                    {!isCollapsed && item.hasDropdown && (
                      <ChevronDown className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        !isDropdownOpen(item.name) && "rotate-180"
                      )} />
                    )}
                  </button>
                  
                  {/* Dropdown Items */}
                  {!isCollapsed && isDropdownOpen(item.name) && item.subItems && (
                    <div className="ml-6 mt-1 mb-1 space-y-1 border-l border-border pl-2">
                      {item.subItems.map((subItem: any) => {
                        const isSubActive = pathname === subItem.href;
                        const isDisabled = subItem.disabled;
                        
                        if (isDisabled) {
                          return (
                            <div key={subItem.name} className={cn(
                              'flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-not-allowed opacity-50',
                              isSubActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-muted-foreground'
                            )}>
                              <subItem.icon className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate text-xs">{subItem.name}</span>
                            </div>
                          );
                        }
                        
                        return (
                          <Link key={subItem.name} href={subItem.href}>
                            <div className={cn(
                              'flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer',
                              isSubActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                            )}>
                              <subItem.icon className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate text-xs">{subItem.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* Regular Menu Item */
                sectionTitle === 'Others' ? (
                  <div className={cn(
                    'flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all duration-200 cursor-not-allowed opacity-50',
                    isCollapsed ? 'justify-center' : '',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground'
                  )}
                  title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate text-xs">{item.name}</span>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <div className={cn(
                      'flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer',
                      isCollapsed ? 'justify-center' : '',
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                    )}
                    title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-xs">{item.name}</span>
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn(
      'fixed left-0 top-0 z-50 flex h-screen flex-col bg-card border-r border-border transition-all duration-300 overflow-hidden',
      isCollapsed ? 'w-14' : 'w-52',
      className
    )}>
      {/* Header with Logo */}
      <div className="flex h-14 items-center justify-center px-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-clash font-bold text-foreground transition-all duration-300",
            isCollapsed ? "text-sm" : "text-lg"
    )}>
            {isCollapsed ? "K" : "Karama"}
          </span>
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="ml-auto h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {isCollapsed && (
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-3 right-1 h-6 w-6 p-0 hover:bg-muted"
            onClick={toggleSidebar}
          >
            <Menu className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-3 py-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border-0 bg-muted pl-7 pr-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-4">
          {renderNavSection(navigation, 'Menu')}
          {renderNavSection(otherNavigation, 'Others')}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="mt-auto p-2 border-t border-border">
        <div className={cn(
          'flex items-center gap-2 p-2 rounded-md bg-muted mb-2',
          isCollapsed && 'justify-center'
        )}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Admin
              </p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
          </div>
          )}
        </div>
        <button
          onClick={logout}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium text-destructive hover:bg-destructive/10 transition-all duration-200',
            isCollapsed ? 'justify-center' : ''
          )}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-xs">Logout</span>}
        </button>
      </div>
    </div>
  );
}