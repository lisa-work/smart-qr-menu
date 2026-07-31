import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdRestaurantMenu, MdCategory } from "react-icons/md";
import { RiQrCodeFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

interface SideBarProps {
    icon: React.ReactNode;
    label: string;
    path: string;
};

const SideBar: SideBarProps[] = [
    {
        icon: <TbLayoutDashboardFilled />,
        label: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: <MdRestaurantMenu />,
        label: "Menu",
        path: "/profile"
    },
    {
        icon: <MdCategory />,
        label: "Categories",
        path: "/profile"
    },
    {
        icon: <RiQrCodeFill />,
        label: "QR Code",
        path: "/profile"
    },
    {
        icon: <IoMdSettings />,
        label: "Settings",
        path: "/profile"
    },
]

function SideBar({icon, label, isActive, onClick, path} : SideBarProps) {
  return (
    <div>SideBar</div>
  )
}

export default SideBar