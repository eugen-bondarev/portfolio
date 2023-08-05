import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "Hero" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.Hero = LazyComponent

export default LazyComponent
