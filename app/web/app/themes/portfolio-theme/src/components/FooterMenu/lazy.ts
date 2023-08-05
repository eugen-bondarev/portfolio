import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "FooterMenu" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.FooterMenu = LazyComponent

export default LazyComponent
