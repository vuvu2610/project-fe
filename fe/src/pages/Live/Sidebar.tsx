import { FaTv, FaVideo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import routes from "../../config/routes";
import { useTranslation } from "react-i18next";

function Sidebar() {
  const {t} = useTranslation();
  return (
    <section className="flex max-w-fit flex-col gap-y-4 border-solid border-gray-300 border p-5 rounded-md h-fit">
      <NavLink
        end
        to={routes.live}
        className={({ isActive }) =>
          `text-lg group ${isActive && "text-primary"} `
        }
      >
        <div className="flex max-w-fit items-center p-3 gap-0 group-hover:gap-x-2 shadow-custom rounded-lg  transition-all duration-500">
          <FaTv size={23} />
          <span className="lg:inline-block w-0 overflow-hidden group-hover:w-[58px]  transition-all duration-500">
            Watch
          </span>
        </div>
      </NavLink>

      <NavLink
        end
        to={routes.stream}
        className={({ isActive }) =>
          `text-lg group ${isActive && "text-primary"}`
        }
      >
        <div className="flex max-w-fit items-center p-3 gap-0 group-hover:gap-x-2 shadow-custom rounded-lg  transition-all duration-500">
          <FaVideo size={23} />
          <span className="lg:inline-block w-0 overflow-hidden group-hover:w-[58px]  transition-all duration-500">
            {t("nav.live")}
          </span>
        </div>
      </NavLink>
    </section>
  );
}

export default Sidebar;
