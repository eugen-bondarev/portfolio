import lazyLoader from '../../util/lazy-loader'

const LazyComponent = lazyLoader({
  importer: () =>
    import(
      /* webpackChunkName: "ProjectPreview" */
      './index'
    ),
})

window.ANIMA_FORMS_BOILERPLATE_COMPONENTS.ProjectPreview = LazyComponent

export default LazyComponent
