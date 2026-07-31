import type {SideBarProps} from "@/types/sidebar";
import {Button} from "@/components/ui"
import { useNavigate } from "react-router-dom";

function SideBarLayout({icon, label, path}: SideBarProps) {
  const Icon = icon;
  const navigate = useNavigate();

  return (
    <Button
    onClick={() => navigate(path)}
    className="bg-white text-black flex flex-row items-center justify-start gap-4 hover:bg-gray-100 items-center py-2 w-[15%] cursor-pointer text-xs md:text-sm rounded-sm">
        <Icon size={20}/>
        {label}
    </Button>
  )
}

export default SideBarLayout