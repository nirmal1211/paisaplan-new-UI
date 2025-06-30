import React from "react";
import { Menu } from "lucide-react";
import SidebarItem from "../SidebarItem";
import styles from "./Layout.module.scss";

interface NavItem {
  label: string;
  path?: string;
  submenu?: NavItem[];
  dropdown?: NavItem[];
}

interface SidebarProps {
  navItems: NavItem[];
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {isMobile && (
        <>
          <button
            className={styles.mobileHamburger}
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Open navigation menu"
          >
            <Menu size={28} />
          </button>

          <div
            className={`${styles.mobileSidebar} ${
              sidebarOpen ? styles.open : ""
            }`}
          >
            <nav>
              {navItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  item={{
                    ...item,
                    submenu: item.dropdown ?? item.submenu,
                  }}
                  onItemClick={() => setSidebarOpen(false)}
                />
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
