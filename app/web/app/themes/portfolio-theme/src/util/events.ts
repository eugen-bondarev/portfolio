interface AddSliderEventsProps {
  el: HTMLElement
  onSwipeLeft?: (e?: TouchEvent) => void
  onSwipeRight?: (e?: TouchEvent) => void
}

export const addSwipeEventListeners = ({
  el,
  onSwipeLeft,
  onSwipeRight,
}: AddSliderEventsProps) => {
  el.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0]
    if (!touch) {
      return
    }
    el.dataset.touchStartX = `${touch.pageX}`
    el.dataset.touchStartY = `${touch.clientY}`
  })

  el.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0]
    if (!touch) {
      return
    }
    const touchStart = {
      clientX: parseInt(el.dataset.touchStartX ?? ''),
      // clientY: parseInt(el.dataset.touchStartY ?? ''),
    }
    if (Number.isNaN(touchStart.clientX) || !touch.clientX) {
      return
    }
    const delta = {
      x: touch.pageX - touchStart.clientX,
      // y: touch.clientY - touchStart.clientY,
    }
    if (Math.abs(delta.x) < 50) {
      return
    }
    // if (Math.abs(delta.x) > Math.abs(delta.y)) {
    if (delta.x > 0) {
      if (onSwipeRight) onSwipeRight(e)
    } else {
      if (onSwipeLeft) onSwipeLeft(e)
    }
    // } else {
    // vertical
    // }
  })
}
