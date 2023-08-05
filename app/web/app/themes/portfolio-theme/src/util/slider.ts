import { addSwipeEventListeners } from "./events"
import { clamp } from "./math"

export const createSlider = (el: HTMLElement) => {
    const childWidth = el.children[0]?.clientWidth ?? 0
    const gap = parseInt(getComputedStyle(el).columnGap ?? `${0}`)
    const scrollOffset = childWidth + gap
  
    el.dataset.slide = `${0}`
    el.dataset.scrollOffset = `${scrollOffset}`
  
    addSwipeEventListeners({
      el,
      onSwipeLeft: () => {
        const slide = parseInt(el.dataset.slide ?? `${0}`) + 1
        const clampedSlide = clamp(slide, 0, el.children.length - 1)
        el.dataset.slide = `${clampedSlide}`
        el.style.transform = `translateX(${
          -parseInt(el.dataset.slide) * parseInt(el.dataset.scrollOffset!)
        }px)`
      },
      onSwipeRight: () => {
        const slide = parseInt(el.dataset.slide ?? `${0}`) - 1
        const clampedSlide = clamp(slide, 0, el.children.length - 1)
        el.dataset.slide = `${clampedSlide}`
        el.style.transform = `translateX(${
          -parseInt(el.dataset.slide) * parseInt(el.dataset.scrollOffset!)
        }px)`
      },
    })
  }