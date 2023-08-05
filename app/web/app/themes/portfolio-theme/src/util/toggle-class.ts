export const setClass = (
  element: HTMLElement,
  className: string,
  active: boolean
) => {
  if (!active) {
    element.classList.remove(className)
    return false
  }

  element.classList.add(className)
  return true
}

const toggleClass = (element: HTMLElement, className: string) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
    return false
  }

  element.classList.add(className)
  return true
}

export default toggleClass
