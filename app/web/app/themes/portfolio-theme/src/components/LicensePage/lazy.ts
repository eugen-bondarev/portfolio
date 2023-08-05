import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "LicensePage" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.LicensePage = LazyComponent

export default LazyComponent
