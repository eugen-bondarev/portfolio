import { Variant } from 'types/product'

document.addEventListener('DOMContentLoaded', () => {
  Array.from<HTMLElement>(document.querySelectorAll('[data-variants]')).forEach(
    (variantsSelect) => {
      const container = variantsSelect.closest('[data-product-container]') as
        | HTMLElement
        | undefined
      if (!container) {
        return
      }

      const variants = JSON.parse(
        container.dataset.variants ?? '{}'
      ) as Variant[]

      const cartButton = container.querySelector('#add-to-cart') as
        | HTMLElement
        | undefined

      const priceElement = container.querySelector('#price') as
        | HTMLElement
        | undefined

      const mainGalleryImage = container.querySelector(
        '.gallery .main-image img:not(.hidden)'
      ) as HTMLImageElement | undefined
      const galleryFirstThumbnail = container.querySelector(
        '.gallery .thumbnail.first'
      ) as HTMLImageElement | undefined

      variantsSelect.addEventListener('change', (e) => {
        const selectedVariantId = (e.target as HTMLSelectElement).value
        const selectedVariant = variants.find(
          (variant) => `${variant.ID}` === selectedVariantId
        )

        if (!selectedVariant) {
          return
        }
        if (cartButton) {
          cartButton.dataset.variantId = selectedVariantId
        }
        if (priceElement) {
          priceElement.innerHTML = `${selectedVariant.price}`
        }

        if (mainGalleryImage && galleryFirstThumbnail) {
          Array.from(mainGalleryImage.parentElement?.children ?? []).forEach(img => img.classList.add('hidden'))
          mainGalleryImage.src = selectedVariant.image
          mainGalleryImage.srcset = ''
          mainGalleryImage.classList.remove('hidden')
          galleryFirstThumbnail.src = selectedVariant.thumbnail
          galleryFirstThumbnail.dataset.fullSize = selectedVariant.image
        }
      })
    }
  )
})
