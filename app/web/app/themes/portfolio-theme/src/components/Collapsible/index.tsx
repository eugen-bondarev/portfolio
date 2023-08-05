import clsx from 'clsx'
import { ReactNode, MutableRefObject, useEffect, useState, useRef } from 'react'
import styles from './styles.module.scss'

interface CollapsibleProps {
  title?: ReactNode
  children: ReactNode
  triggerOnSelector?: string
}

const Collapsible = ({
  title,
  children,
  triggerOnSelector,
}: CollapsibleProps) => {
  const [open, setOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (!triggerOnSelector) {
      return
    }
    const triggeringElements = Array.from(
      document.querySelectorAll(triggerOnSelector)
    )
    const callback = () => setOpen((current) => !current)
    triggeringElements.forEach((element) =>
      element.addEventListener('click', callback)
    )
    return () =>
      triggeringElements.forEach((element) =>
        element.removeEventListener('click', callback)
      )
  }, [triggerOnSelector])

  useEffect(() => {
    setContentHeight(ref?.current?.clientHeight ?? 0)
  }, [])

  return (
    <div
      onClick={
        triggerOnSelector ? undefined : () => setOpen((current) => !current)
      }
      className={clsx(styles.collapsible, { [styles.open]: open })}
    >
      {typeof title === 'string' ? (
        <h4
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <h4 className={styles.title}>{title}</h4>
      )}
      <div
        className={styles.wrapper}
        style={{ '--height': `${contentHeight + 30}px` } as any}
      >
        {typeof children === 'string' ? (
          <div
            ref={ref}
            // onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : (
          <div
            ref={ref}
            // onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collapsible
