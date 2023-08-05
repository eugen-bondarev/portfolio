import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "MyComp" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.MyComp = LazyComponent

export default LazyComponent
