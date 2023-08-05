import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "Product" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.Product = LazyComponent

export default LazyComponent
