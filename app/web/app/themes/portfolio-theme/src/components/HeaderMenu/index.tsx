import { ReactNode, useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import useWindowSize from "../../util/hooks/useWindowSize";
import scrollIntoViewWithOffset from "../../util/scroll-into-view-offset";
import Icon from "../Icon";
import { ReactComponent as LightDarkIcon } from "line-awesome/svg/adjust-solid.svg";
import { ReactComponent as GitHubIcon } from "line-awesome/svg/github.svg";
import toggleClass from "../../util/toggle-class";
import { toggleDarkMode } from "../../frontend/dark-mode";

interface MenuItem {
  url?: string;
  onClick?: () => void;
  title: ReactNode;
}

interface MenuBodyProps {
  items: MenuItem[];
}

const MenuBody = ({ items }: MenuBodyProps) => (
  <nav>
    <ul className="list-none !my-0 flex flex-col lg:flex-row dark:text-white items-end lg:items-center justify-end gap-4 lg:gap-8 pt-6 lg:pt-0">
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
            href={item.url || ""}
            target="_blank"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

interface HeaderMenuProps {
  items: MenuItem[];
}

const HeaderMenu = ({ items: initialItems }: HeaderMenuProps) => {
  const getHeight = () =>
    ["#wpadminbar", "header"]
      .map((selector) => document.querySelector(selector))
      .filter(Boolean)
      .map((element) => element?.clientHeight ?? 0)
      .reduce((acc, curr) => acc + curr, 0);

  const itemsToPrepend: MenuItem[] = Array.from(
    document.querySelectorAll(".is-style-anchor")
  ).map((item) => ({
    title: item.innerHTML,
    onClick: () => scrollIntoViewWithOffset(item, getHeight() + 16),
  }));

  useEffect(() => {
    Array.from(document.querySelectorAll(".is-style-anchor")).map((anchor) => {
      Array.from(
        document.querySelectorAll(`a[href="${anchor.innerHTML}"]`)
      ).forEach((item) =>
        item.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollIntoViewWithOffset(anchor, getHeight() + 16);
        })
      );
    });
  }, []);

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

  const windowSize = useWindowSize();
  const mobile = (windowSize.width ?? 0) < 1024;

  return (
    <>
      <div>
        {mobile ? (
          <Collapsible triggerOnSelector="#hamburger-menu">
            <MenuBody items={items} />
          </Collapsible>
        ) : (
          <MenuBody items={items} />
        )}
      </div>
    </>
  );
};

export default HeaderMenu;
