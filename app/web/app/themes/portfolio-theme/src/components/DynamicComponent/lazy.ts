import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "DynamicComponent" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.DynamicComponent = LazyComponent

export default LazyComponent
