window.ANIMA_FORMS_BOILERPLATE_COMPONENTS = {}
import './dark-mode'

import importAll from '../util/importAll'

const contexts = require.context('../components', true, /lazy\.ts$/)
importAll(contexts)

import ReactDOM from 'react-dom'
import React from 'react'
import './home'
import './index.scss'
import renderApps from './render-apps'
import { createSlider } from '../util/slider'
import { addButtonAction } from '../util/button'

window.addEventListener('DOMContentLoaded', () => renderApps())

window.addEventListener('DOMContentLoaded', () =>
  (Array.from(document.querySelectorAll('.slider')) as HTMLElement[]).forEach(
    (slider) => createSlider(slider)
  )
)

import { atom } from 'nanostores'
import { Cart } from 'types/cart'
import { Product } from 'types/product'

export const productsInCart = atom<Cart>(
  (window as any)['ecommerce-theme/frontend'].cart
)

export function addProduct(product: Product) {
  productsInCart.set({
    ...productsInCart.get(),
    products: [...productsInCart.get().products, product],
  })
}

window.addEventListener('DOMContentLoaded', () =>
  Array.from<HTMLElement>(document.querySelectorAll('#add-to-cart')).forEach(
    (button) => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()

        addButtonAction({
          button,
          action: async () => {
            if (!button.dataset.productId) {
              return
            }

            const url = new URL(
              `${window.location.origin}/?wc-ajax=add-to-cart-v2`
            )
            const response = await fetch(url, {
              method: 'POST',
              body: createFormData({
                products: [
                  {
                    ID: button.dataset.productId,
                    variantId: button.dataset.variantId,
                    quantity: 1,
                  },
                ],
              }),
            })
            const body: Cart = await response.json()
            productsInCart.set(body)
          },
        })
      })
    }
  )
)

// TINY SWIPER
import Swiper, {
  SwiperPluginLazyload,
  SwiperPluginPagination,
} from 'tiny-swiper'
import createFormData from './util/createFormData'

// Swiper.use([SwiperPluginLazyload, SwiperPluginPagination])

document.addEventListener('DOMContentLoaded', () => {
  Array.from<HTMLElement>(
    document.querySelectorAll('.swiper-container')
  ).forEach((container) => {
    if ('mobileOnly' in container.dataset && window.innerWidth >= 800) {
      return
    }

    const width = parseInt(container.dataset.slideWidth!)
    const containerWidth = Math.min(
      parseInt(container.dataset.containerWidth!),
      window.innerWidth
    )

    const margin = parseInt(container.dataset.margin ?? `${0}`)

    const slidesPerView = Math.max(Math.floor(containerWidth / width) - 1, 1)

    const swiper = new Swiper(container, {
      slidesPerView,
      spaceBetween: margin ? margin : containerWidth < 400 ? 0 : 24,
      centeredSlides: false,
    })

    if (containerWidth < 400) {
      Array.from<HTMLElement>(
        container.querySelectorAll('.swiper-slide')
      ).forEach((slide) => {
        slide.style.minWidth = `${(containerWidth - 40 * 2) / slidesPerView}px`
        slide.style.maxWidth = `${(containerWidth - 40 * 2) / slidesPerView}px`
      })
    }
  })
})

// GALLERY
document.addEventListener('DOMContentLoaded', () =>
  Array.from(document.querySelectorAll('.gallery')).forEach((gallery) => {
    const mainImage = gallery.querySelector('.main-image img') as
      | HTMLImageElement
      | undefined
    if (!mainImage) {
      return
    }
    const thumbnails = Array.from<HTMLImageElement>(
      gallery.querySelectorAll('.thumbnail')
    )
    thumbnails.forEach((thumbnail) =>
      thumbnail.addEventListener('click', (e) => {
        const currentlyShownImg = gallery.querySelectorAll('.main-image img')
        if (currentlyShownImg) {
          currentlyShownImg.forEach((el) => el.classList.add('hidden'))
        }
        const img = gallery.querySelector(
          `.main-image img[src="${thumbnail.dataset.fullSize!}"]`
        )
        if (img) {
          img.classList.remove('hidden')
        }
        // mainImage.src = thumbnail.dataset.fullSize!
        // mainImage.srcset = thumbnail.dataset.fullSize!
      })
    )
  })
)

import './modules/header'
import './modules/variants'
