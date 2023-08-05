export interface Variant {
  ID: number
  title: string
  price: string
  image: string
  thumbnail: string
}

export interface Product {
  ID: number
  variants: Variant[]
  variantId?: number
  key: string
  attributes: Record<string, string>
  image: string
  thumbnail: string
  price: string
  reviews: {
    average: number
    count: number
    items: []
  }
  title: string
}
