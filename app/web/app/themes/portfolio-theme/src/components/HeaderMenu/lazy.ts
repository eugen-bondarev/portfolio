import lazyLoader from '../../util/lazy-loader'

// import LazyComponent from './index'
const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "HeaderMenu" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.HeaderMenu = LazyComponent

export default LazyComponent
