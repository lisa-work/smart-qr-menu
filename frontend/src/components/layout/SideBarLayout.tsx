import type {SideBarProps} from "@/types/sidebar";

function SideBarLayout({icon, label, path}: SideBarProps) {
  const Icon = icon;

  return (
    <div className="flex flex-row gap-4 hover:bg-gray-100 items-center py-2 w-[15%] cursor-pointer text-xs md:text-sm rounded-sm">
        <Icon size={20}/>
        {label}
    </div>
  )
}

export default SideBarLayout