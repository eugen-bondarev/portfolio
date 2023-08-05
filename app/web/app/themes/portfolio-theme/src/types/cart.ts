import { Product } from './product'

export interface Cart {
  products: Product[]
  total: string
}
