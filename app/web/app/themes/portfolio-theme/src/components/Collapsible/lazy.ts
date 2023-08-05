import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "Collapsible" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.Collapsible = LazyComponent

export default LazyComponent
