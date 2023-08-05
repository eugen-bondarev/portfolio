import styles from './styles.module.scss'
import Heading from '../Heading'
import { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import useWindowSize from '../../util/hooks/useWindowSize'

interface SymbolProps {
  content: string
  className?: string
}

const Symbol = ({ content, className }: SymbolProps) => (
  <span className={clsx('text-accent', className)}>{content}</span>
)

interface HeroProps {
  title: ReactNode
  subtitle: ReactNode
}

const Hero = ({ title, subtitle }: HeroProps) => {
  const windowSize = useWindowSize()
  // const [filling, setFilling] = useState('')
  // const [cursor, setCursor] = useState(0)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (typeof title === 'string' && !title[cursor]) {
  //       return
  //     }
  //     setCursor((current) => current + 1)
  //   }, 90)
  //   return () => clearInterval(intervalId)
  // }, [])

  // useEffect(() => {
  //   if (typeof title !== 'string') {
  //     return
  //   }
  //   if (!title[cursor]) {
  //     return
  //   }
  //   setFilling((current) => `${current}${title[cursor]}`)
  // }, [cursor])

  return (
    <div className={clsx(styles.hero, '')}>
      <Heading className="flex relative z-[1]">
        <Symbol content=">" />
        {title}
        <Symbol content="_" className="animate-pulse" />
      </Heading>
      <Heading subheading>{subtitle}</Heading>
    </div>
  )
}

export default Hero
