import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "CVItem" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.CVItem = LazyComponent

export default LazyComponent
