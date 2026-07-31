import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdRestaurantMenu, MdCategory } from "react-icons/md";
import { RiQrCodeFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import type { IconType } from "react-icons";

export interface SideBarProps {
    icon: IconType;
    label: string;
    path: string;
};

export const SideBar: SideBarProps[] = [
    {
        icon: TbLayoutDashboardFilled,
        label: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: MdRestaurantMenu,
        label: "Menu",
        path: "/profile"
    },
    {
        icon: MdCategory,
        label: "Categories",
        path: "/profile"
    },
    {
        icon: RiQrCodeFill,
        label: "QR Code",
        path: "/profile"
    },
    {
        icon: IoMdSettings,
        label: "Settings",
        path: "/profile"
    },
]