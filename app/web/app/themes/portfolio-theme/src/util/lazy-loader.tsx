import React, { Suspense, lazy, ReactNode, ComponentType } from 'react'

interface LazyLoaderProps {
  importer: () => Promise<{
    default: ComponentType<any>
  }>
  fallback?: ReactNode
}

const lazyLoader =
  ({ importer, fallback = null }: LazyLoaderProps) =>
  (props?: Record<string, any>) => {
    const Component = lazy(importer)
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }

export default lazyLoader
