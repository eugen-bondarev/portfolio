import lazyLoader from '../../util/lazy-loader'

// import LazyComponent from './index'
const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "CartButton" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.CartButton = LazyComponent

export default LazyComponent
