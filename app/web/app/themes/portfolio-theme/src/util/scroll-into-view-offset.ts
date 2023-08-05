const scrollIntoViewWithOffset = (
  element: HTMLElement | Element,
  offset: number
) =>
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.pageYOffset - offset,
    behavior: 'smooth',
  })

export default scrollIntoViewWithOffset
