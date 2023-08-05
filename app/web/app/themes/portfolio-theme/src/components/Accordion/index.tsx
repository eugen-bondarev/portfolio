import { MutableRefObject, ReactNode, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ReactComponent as AccessibleIcon } from 'line-awesome/svg/ad-solid.svg'
import Product from '../Product'
import { useInnerApps } from '../../frontend/render-apps'

interface AccordionProps {
  children?: ReactNode
}

const Accordion = ({ children }: AccordionProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  useInnerApps(ref)

  return (
    <div className={styles.accordion} ref={ref}>
      {typeof children === 'string' ? (
        <div dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default Accordion
