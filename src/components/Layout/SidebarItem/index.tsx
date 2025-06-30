import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./layout.module.scss";

interface NavItem {
  label: string;
  path?: string;
  submenu?: NavItem[];
}

interface Props {
  item: NavItem;
  level?: number;
  onItemClick?: () => void;
}

const SidebarItem: React.FC<Props> = ({ item, level = 0, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const hasSubmenu = !!item.submenu?.length;

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      className={`${styles.sidebarItem} ${styles[`level${level}`]}`}
      style={{ marginLeft: level * 12 }}
    >
      {hasSubmenu ? (
        <>
          <button
            onClick={toggle}
            className={`${styles.toggleButton} ${styles[`level${level}`]}`}
          >
            {item.label}
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {open && (
            <div>
              {item.submenu!.map((child) => (
                <SidebarItem
                  key={child.label}
                  item={child}
                  level={level + 1}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <a href={item.path} onClick={onItemClick} className={styles.navLink}>
          {item.label}
        </a>
      )}
    </div>
  );
};

export default SidebarItem;
