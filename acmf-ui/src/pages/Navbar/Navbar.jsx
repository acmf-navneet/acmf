import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/Auth/Action";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo2 from "../../assets/logo2.png";

const components = [
  {
    title: "Dashboard",
    href: "/dashboard",
    // description: "Overview of your projects and activities.",
  },
  {
    title: "Settings",
    href: "/settings",
    // description: "Manage your account and application settings.",
  },
  {
    title: "Notifications",
    href: "/notifications",
    // description: "View and manage your alerts and updates.",
  },
  {
    title: "Help",
    href: "/help",
    // description: "Get assistance and resources.",
  },
];

const CustomNavbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav data-testid="navbar" className="border-b border-gray-300 dark:bg-gray-800 sticky top-0 z-50 bg-white">
      <div className="mx-auto flex items-center justify-between p-4">
        <a href="/" className="flex items-center ">
          <img src={logo2} className="h-12" alt="Logo" />
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="absolute -left-0 mt-2">
                <ul className="gap-2 p-1 md:w-[200px] lg:w-[300px] lg:grid-cols-[.6fr_1fr]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {auth?.user && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={auth?.user?.avatarUrl || "/avatar-placeholder.png"}
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {auth?.user?.firstName?.[0] || "A"}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4">
                    <p className="text-sm font-medium">
                      <strong>Hi, </strong>
                      {auth?.user?.firstName}
                    </p>
                    <p className="text-xs text-gray-500">{auth?.user?.email}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

const ListItem = ({ title, children, href }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default CustomNavbar;
