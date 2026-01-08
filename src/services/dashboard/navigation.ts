import {
  CalendarPlus,
  CreditCard,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

// Types for your navigation items
type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

// 1. Common Routes (Everyone sees these)
export const commonNav: NavItem[] = [
  {
    title: "Account",
    url: "/profile",
    icon: Settings,
    isActive: true,
    items: [
      { title: "My Profile", url: "/my-profile" },
      { title: "Security", url: "/settings/security" }, //
      { title: "Verification", url: "/profile/verification" },
    ],
  },
];

// 2. Role-Based Routes
export const roleNavs: Record<string, NavItem[]> = {
  ADMIN: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        { title: "All Users", url: "/admin/users" },
        { title: "Hosts", url: "/admin/hosts" },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: ShieldCheck,
      items: [{ title: "Logs", url: "/admin/logs" }],
    },
  ],
  HOST: [
    {
      title: "Dashboard",
      url: "/host/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Events",
      url: "/host/events",
      icon: CalendarPlus,
      items: [
        { title: "Create Event", url: "/host/events/create" },
        { title: "My Events", url: "/host/events" },
      ],
    },
    {
      title: "Finance",
      url: "/host/payments",
      icon: CreditCard,
    },
  ],
  USER: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Become a Host",
      url: "/host-request",
      icon: UserCheck,
    },
  ],
};
