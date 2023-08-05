import styles from './styles.module.scss'
import clsx from 'clsx'
import Stars from '../Stars'
import Rating from '../Reviews'

interface ProductProps {
  title: string
  description: string
  price: string
  image: string
  reviews: {
    average: number
    count: number
  }
  attributes?: {
    details: string
    usage: string
    shipping: string
    return: string
  }
}

const Product = ({
  title,
  description,
  price,
  image,
  attributes,
  reviews,
}: ProductProps) => {
  console.log({ reviews })
  return (
    <div className={clsx(styles.product)}>
      <div dangerouslySetInnerHTML={{ __html: image }} />
      <Rating average={reviews.average} count={reviews.count} />
      <h1>{title}</h1>
      <h5>{description}</h5>
      <span dangerouslySetInnerHTML={{ __html: price }} />
      <span dangerouslySetInnerHTML={{ __html: attributes?.details ?? '' }} />
      <span dangerouslySetInnerHTML={{ __html: attributes?.usage ?? '' }} />
      <span dangerouslySetInnerHTML={{ __html: attributes?.shipping ?? '' }} />
      <span dangerouslySetInnerHTML={{ __html: attributes?.return ?? '' }} />
    </div>
  )
}

export default Product
