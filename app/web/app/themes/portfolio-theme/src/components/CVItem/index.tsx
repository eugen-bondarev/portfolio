import React, { ReactNode } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface CVItemProps {
  title: ReactNode
  children: ReactNode
}

const CVItem = ({ title, children }: CVItemProps) => {
  return (
    <div className={styles.cvItem}>
      <div className={styles.line}></div>
      <div className={styles.content}>
        <h1 className={clsx(styles.title, '!my-0')}>{title}</h1>
        {typeof children === 'string' ? (
          <div
            className="w-2/3"
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : (
          <div className="w-2/3">{children}</div>
        )}
      </div>
    </div>
  )
}

export default CVItem
