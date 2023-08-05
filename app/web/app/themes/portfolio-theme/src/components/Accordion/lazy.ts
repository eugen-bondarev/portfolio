import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "Accordion" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.Accordion = LazyComponent

export default LazyComponent
