import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "Logo" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.Logo = LazyComponent

export default LazyComponent
