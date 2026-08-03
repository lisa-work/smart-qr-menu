import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdRestaurantMenu, MdCategory, MdDarkMode } from "react-icons/md";
import { RiQrCodeFill } from "react-icons/ri";
import { IoMdSettings} from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
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
        path: "/foods"
    },
    {
        icon: MdCategory,
        label: "Categories",
        path: "/categories"
    },
    {
        icon: RiQrCodeFill,
        label: "QR Code",
        path: "/restaurant/:slug/qr"
    },
    {
        icon: IoMdSettings,
        label: "Settings",
        path: "/restaurant"
    },
    {
        icon: IoLogOut,
        label: "Log out",
        path: "/logout"
    },
]