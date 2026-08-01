import type {SideBarProps} from "@/types/sidebar";
import {Button} from "@/components/ui"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function SideBarLayout({icon, label, path}: SideBarProps) {
  const Icon = icon;
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const resolvedPath = path.includes(":slug")
    ? path.replace(":slug", user?.restaurant?.slug ?? "")
    : path;

  const isActive = resolvedPath !== "" && location.pathname === resolvedPath;

  const handleClick = () => {
    if (path === "/logout") {
      void logout();
      return;
    }

    if (path.includes(":slug")) {
      const restaurantSlug = user?.restaurant?.slug;

      if (restaurantSlug) {
        navigate(path.replace(":slug", restaurantSlug));
      }

      return;
    }

    navigate(path);
    
  };

  return (
    <Button
    onClick={handleClick}
    className={isActive
      ? "w-full cursor-pointer justify-start gap-3 rounded-sm bg-black p-4 text-xs text-white hover:bg-black/90 md:text-sm"
      : "w-full cursor-pointer justify-start gap-3 rounded-sm bg-white p-4 text-xs text-black hover:bg-gray-100 md:text-sm"
    }>
        <Icon size={30}/>
        {label}
    </Button>
  )
}

export default SideBarLayout