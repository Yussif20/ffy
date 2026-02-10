"use client";

import {
  LogOut,
  ArrowLeft,
  Users,
  Home,
  CreditCard,
  Layers,
  Handshake,
} from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/api/userApi";
import Topbar from "./Topbar";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

// Define navigation items
const navigation = [
  {
    label: "Manage Users",
    route: "/overview/user-management",
    icon: Users,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Manage Pay Method",
    route: "/overview/pay-method-management",
    icon: CreditCard,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Manage Platform",
    route: "/overview/platform-management",
    icon: Layers,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Manage Broker",
    route: "/overview/broker-management",
    icon: Handshake,
    roles: ["SUPER_ADMIN"],
  },

  {
    label: "Home",
    route: "/",
    icon: Home,
    roles: ["SUPER_ADMIN", "USER"],
  },
];

const SidebarSkeleton = ({ isOpen }: { isOpen: boolean }) => (
  <div
    className={cn(
      "pt-16 z-40 h-screen bg-background border-r border-border flex flex-col transition-all duration-500 relative",
      isOpen ? "min-w-64 w-64" : "w-16 min-w-16"
    )}
  >
    {/* Navigation Skeleton */}
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {/* Skeleton for navigation items */}
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <div
              className={cn(
                "flex items-center space-x-3 p-2 rounded-lg",
                !isOpen && "justify-center"
              )}
            >
              <Skeleton className="h-5 w-5 rounded" />
              {isOpen && <Skeleton className="h-4 w-24" />}
            </div>
          </li>
        ))}

        {/* Logout button skeleton */}
        <li className="pt-2">
          <div
            className={cn(
              "flex items-center space-x-3 p-2 rounded-lg",
              !isOpen && "justify-center"
            )}
          >
            <Skeleton className="h-5 w-5 rounded" />
            {isOpen && <Skeleton className="h-4 w-16" />}
          </div>
        </li>
      </ul>
    </nav>

    {/* Footer Skeleton */}
    <div className="p-4">
      {/* User info skeleton */}
      {isOpen && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-muted/50 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      )}

      {/* Toggle button skeleton */}
      <div className="text-end flex justify-end items-end -mr-8">
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const { data, isLoading, error } = useGetMeQuery(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  // Show skeleton during loading
  if (isLoading) {
    return (
      <>
        <Topbar isOpen={isOpen} />
        <SidebarSkeleton isOpen={isOpen} />
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <>
        <Topbar isOpen={isOpen} />
        <div
          className={cn(
            "pt-16 z-40 h-screen  border-r border-border flex flex-col transition-all duration-500 relative",
            isOpen ? "min-w-64 w-64" : "w-16 min-w-16"
          )}
        >
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Failed to load user data</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (path === "/privacy-policy") {
    return null;
  }

  const userData = data?.data?.user;
  return (
    <>
      {/* Sidebar */}
      <Topbar isOpen={isOpen} />
      <div
        className={cn(
          "pt-16 z-40 h-screen border-r border-border flex flex-col transition-all duration-500 relative",
          isOpen ? "min-w-64 w-64" : "w-16 min-w-16"
        )}
      >
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = path === item.route;
              const Icon = item.icon;

              // Only display the menu if the USER has the correct role
              if (!item.roles.includes(userData?.role || "")) {
                return null;
              }

              return (
                <Link href={item.route} key={item.route} className="block">
                  <Button
                    size={isOpen ? "default" : "icon"}
                    className={cn(
                      "justify-center overflow-hidden relative border-0 shadow-none hover:bg-primary/10  transition-all duration-300",
                      isOpen && "justify-start w-full",
                      isActive && "bg-primary/20 "
                    )}
                    variant={"ghost"}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="block absolute left-10 w-max">
                      {item.label}
                    </span>
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              onClick={handleLogOut}
              className={cn(
                "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent relative group",
                !isOpen && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="ml-3">Log Out</span>}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Log Out
                </div>
              )}
            </Button>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4">
          {/* User info */}
          {isOpen && userData && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-foreground truncate">
                {userData?.fullName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userData?.email}
              </p>
            </div>
          )}

          {/* Toggle button */}
          <div className="text-end flex justify-end items-end -mr-8">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="flex justify-center"
            >
              <ArrowLeft
                className={`transition-all duration-400 ${
                  isOpen ? "" : "rotate-y-180"
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
