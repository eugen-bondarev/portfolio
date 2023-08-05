import { useState } from 'react'
import styles from './styles.module.scss'
import { ReactComponent as AccessibleIcon } from 'line-awesome/svg/ad-solid.svg'
import Product from '../Product'

const DynamicComponent = ({}) => {
  const products = window.THEME_SLUG_INJECTED_DATA.products

  const sortedProducts = [...products].sort((a, b) =>
    a.price > b.price ? 1 : -1
  )

  return (
    <div className={styles.dynamicComponent}>
      {sortedProducts.map((product, i) => (
        <Product key={i} {...product} />
      ))}
    </div>
  )
}

export default DynamicComponent
