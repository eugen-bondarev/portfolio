import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "AccordionItem" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.AccordionItem = LazyComponent

export default LazyComponent
