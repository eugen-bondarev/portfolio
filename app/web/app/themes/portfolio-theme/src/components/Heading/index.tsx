import clsx from 'clsx'
import { ReactNode, createElement } from 'react'

interface HeadingProps {
  children?: ReactNode
  className?: string
  type?: 1 | 2 | 3 | 4 | 5 | 6
  subheading?: boolean
}

const Heading = ({ children, className, subheading, type = 1 }: HeadingProps) =>
  createElement(`h${type}`, {
    children,
    className: clsx(className, { 'is-style-subheading': subheading }),
  })

export default Heading
