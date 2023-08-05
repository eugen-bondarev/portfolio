import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "CV" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.CV = LazyComponent

export default LazyComponent
