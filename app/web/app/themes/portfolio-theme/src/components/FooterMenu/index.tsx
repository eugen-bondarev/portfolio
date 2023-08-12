import { ReactNode } from "react";
import { goHome } from "../../frontend/home";
import Button from "../Button";
import { ReactComponent as LightDarkIcon } from "line-awesome/svg/adjust-solid.svg";
import { ReactComponent as GitHubIcon } from "line-awesome/svg/github.svg";
import toggleClass from "../../util/toggle-class";
import { toggleDarkMode } from "../../frontend/dark-mode";

interface MenuItem {
  url?: string;
  onClick?: () => void;
  title: ReactNode;
}

interface MenuColumnProps {
  items: MenuItem[];
}

const MenuColumn = ({ items }: MenuColumnProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="list-none !pl-0 flex flex-col gap-4 lg:gap-8">
      {items.map((item, i) => (
        <li key={i} className="!pl-0 !my-0">
          <a
            onClick={(e) => {
              if (!item.onClick) {
                return;
              }
              e.preventDefault();
              item.onClick();
            }}
            href={item.url}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

interface FooterMenuProps {
  headerItems: MenuItem[];
  footerItems: MenuItem[];
}

const FooterMenu = ({
  footerItems: initialItems,
  headerItems,
}: FooterMenuProps) => {
  const itemsToPrepend: MenuItem[] = [];

  const itemsToAppend: MenuItem[] = [
    {
      title: <GitHubIcon width="32" height="32" />,
      onClick: () =>
        window.open("https://github.com/eugen-bondarev", "_blank")?.focus(),
    },
    {
      title: <LightDarkIcon width="32" height="32" />,
      onClick: toggleDarkMode,
    },
  ];

  const items = [...itemsToPrepend, ...initialItems, ...itemsToAppend];

  return (
    <div>
      <nav className="flex flex-col lg:flex-row gap-4 lg:gap-40">
        {[headerItems, items].map((items, i) => (
          <MenuColumn key={i} items={items} />
        ))}
      </nav>
    </div>
  );
};

export default FooterMenu;
