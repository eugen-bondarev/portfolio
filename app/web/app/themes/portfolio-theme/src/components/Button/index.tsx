import clsx from 'clsx'
import { HTMLAttributeAnchorTarget, ReactNode } from 'react'

interface ButtonProps {
  children?: ReactNode
  outline?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  small?: boolean
  light?: boolean
  disabled?: boolean
  href?: string
  className?: string
  target?: HTMLAttributeAnchorTarget
}

const Button = ({
  children,
  outline,
  onClick,
  href,
  target,
  small,
  className,
  light,
  disabled,
}: ButtonProps) => (
  <div
    className={clsx('wp-block-button', className, {
      'is-style-outline': outline,
      small,
      disabled,
      'is-style-light': light,
    })}
  >
    <a
      target={target}
      href={href}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault()
              onClick(e)
            }
          : undefined
      }
      className="wp-block-button__link wp-element-button"
    >
      {children}
    </a>
  </div>
)

export default Button
