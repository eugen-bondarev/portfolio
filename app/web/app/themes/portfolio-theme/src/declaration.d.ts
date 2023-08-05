import { FC } from 'react'
import Product from 'types/product'

declare global {
  declare module '*.scss'
  declare module '*.svg'
  declare module '@wordpress/server-side-render'

  interface Window {
    ANIMA_FORMS_BOILERPLATE_COMPONENTS: Record<string, FC<any>>
    THEME_SLUG_INJECTED_DATA: {
      loggedIn: 'true' | 'false'
      products: Array<Product>
    }
  }
}
