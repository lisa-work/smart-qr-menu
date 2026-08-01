import { SideBar } from "../../types/sidebar";
import { SideBarLayout } from "../layout";
import { MdRestaurantMenu } from "react-icons/md";

function SideBarNav() {

  return (
    <div className="flex h-full flex-col gap-6 p-5">
        <div className="flex flex-row gap-4 items-center my-4 border-b pt-2 pb-3">
            <MdRestaurantMenu size={40} color="white" className="bg-black rounded-sm p-1"/>
            <h2 className="text-left text-xs md:text-sm font-bold">MenuHub</h2>
        </div>
      <div className="flex flex-col gap-1">
        {SideBar.map((item) => (
          <SideBarLayout key={item.label} icon={item.icon} label={item.label} path={item.path} />
            ))}
        </div>
    </div>
  )
}

export default SideBarNav