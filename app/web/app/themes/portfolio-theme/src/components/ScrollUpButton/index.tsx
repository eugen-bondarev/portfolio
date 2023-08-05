import clsx from 'clsx'
import { useState, useEffect } from 'react'
import Button from '../Button'
import { ReactComponent as ArrowUp } from 'line-awesome/svg/arrow-up-solid.svg'

const ScrollUpButton = () => {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const callback = () => setScroll(window.scrollY)
    window.addEventListener('scroll', callback)
    return () => window.removeEventListener('scroll', callback)
  }, [])

  const show = scroll > window.innerHeight / 2

  return (
    <div className="fixed right-10 bottom-10 z-[2]">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={clsx('transition opacity-0 w-12 h-12', {
          'opacity-100': show,
        })}
        small
      >
        <ArrowUp width="24" height="24" />
      </Button>
    </div>
  )
}

export default ScrollUpButton
