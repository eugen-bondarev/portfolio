import React, { ReactNode } from 'react'
import Collapsible from '../Collapsible'

interface AccordionItemProps {
  title: ReactNode
  children: ReactNode
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  return (
    <div>
      <Collapsible title={title}>
        {typeof children === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: children }} />
        ) : (
          <div>{children}</div>
        )}
      </Collapsible>
    </div>
  )
}

export default AccordionItem
