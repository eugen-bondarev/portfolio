import { MutableRefObject, ReactNode, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { useInnerApps } from '../../frontend/render-apps'

interface CVProps {
  children?: ReactNode
}

const CV = ({ children }: CVProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  useInnerApps(ref)

  return (
    <div className={styles.cv} ref={ref}>
      {typeof children === 'string' ? (
        <div dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default CV
