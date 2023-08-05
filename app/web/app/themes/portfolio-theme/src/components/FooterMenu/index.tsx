import { ReactNode } from 'react'
import { goHome } from '../../frontend/home'
import Button from '../Button'

interface MenuItem {
  url?: string
  onClick?: () => void
  title: ReactNode
}

interface MenuColumnProps {
  items: MenuItem[]
}

const MenuColumn = ({ items }: MenuColumnProps) => {
  return (
    <ul className="list-none !pl-0 flex flex-col gap-4 lg:gap-8">
      {items.map((item, i) => (
        <li key={i} className="!pl-0 !my-0">
          <a
            onClick={(e) => {
              if (!item.onClick) {
                return
              }
              e.preventDefault()
              item.onClick()
            }}
            href={item.url}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

interface FooterMenuProps {
  headerItems: MenuItem[]
  footerItems: MenuItem[]
}

const FooterMenu = ({
  footerItems: initialItems,
  headerItems,
}: FooterMenuProps) => {
  const itemsToPrepend: MenuItem[] = [
    // {
    // title: 'eug.bondarev@gmail.com',
    // url: 'mailto:eug.bondarev@gmail.com',
    // },
  ]

  const itemsToAppend: MenuItem[] = []

  const items = [...itemsToPrepend, ...initialItems, ...itemsToAppend]

  return (
    <div>
      <nav className="flex flex-col lg:flex-row gap-4 lg:gap-40">
        {[items, headerItems].map((items, i) => (
          <MenuColumn key={i} items={items} />
        ))}
      </nav>
    </div>
  )
}

export default FooterMenu
