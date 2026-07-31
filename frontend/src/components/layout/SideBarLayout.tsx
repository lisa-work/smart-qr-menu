import type {SideBarProps} from "@/types/sidebar";
import {Button} from "@/components/ui"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function SideBarLayout({icon, label, path}: SideBarProps) {
  const Icon = icon;
  const navigate = useNavigate();
  const { logout, user } = useAuth();

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
    className="w-full cursor-pointer justify-start gap-4 rounded-sm bg-white p-2 text-xs text-black hover:bg-gray-100 md:text-sm">
        <Icon size={30}/>
        {label}
    </Button>
  )
}

export default SideBarLayout