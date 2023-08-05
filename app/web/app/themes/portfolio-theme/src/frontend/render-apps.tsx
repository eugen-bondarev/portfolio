import ReactDOM from 'react-dom'
import React, { MutableRefObject, useEffect } from 'react'

const renderApps = (root: ParentNode = document) =>
  (
    Array.from(
      root.querySelectorAll('[data-ecommerce-theme-component]')
    ) as HTMLElement[]
  ).forEach((element) => {
    const componentName = element.dataset.ecommerceThemeComponent
    if (!componentName) {
      return
    }
    const stringifiedProps: string | undefined =
      element.dataset.ecommerceThemeProps
    const Component = window.ANIMA_FORMS_BOILERPLATE_COMPONENTS[componentName]
    const content = element.innerHTML
    const container = element.dataset.inParent ? element.parentElement : element
    ReactDOM.createRoot(container).render(
      <Component {...(stringifiedProps ? JSON.parse(stringifiedProps) : {})}>
        {content}
      </Component>
    )
  })

export const useInnerApps = <T extends HTMLElement>(ref: MutableRefObject<T>) =>
  useEffect(() => {
    if (!ref?.current) {
      return
    }
    renderApps(ref.current)
  }, [])

export default renderApps
