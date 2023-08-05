import { useState } from 'react'
import styles from './styles.module.scss'

const MyComp = ({}) => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <h1 className={styles.myComp}>Hello world! {counter}</h1>
      <button onClick={() => setCounter((current) => current + 1)}>
        Click me!
      </button>
    </>
  )
}

export default MyComp
