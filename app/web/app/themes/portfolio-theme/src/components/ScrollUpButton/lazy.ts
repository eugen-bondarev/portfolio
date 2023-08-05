import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "ScrollUpButton" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.ScrollUpButton = LazyComponent

export default LazyComponent
