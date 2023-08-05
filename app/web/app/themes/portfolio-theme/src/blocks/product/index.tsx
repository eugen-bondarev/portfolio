import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { TextControl } from '@wordpress/components'
import metadata from './block.json'
import ServerSideRender from '@wordpress/server-side-render'
import renderApps from '../../frontend/render-apps'
import { useRef, useEffect } from 'react'

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }: any) => {
    const ref = useRef()
    const blockProps = useBlockProps({ ref })

    useEffect(() => {
      if (!ref.current) {
        return
      }
      const timeoutId = setTimeout(() => renderApps(ref.current), 1000)
      return () => clearTimeout(timeoutId)
    }, [ref, attributes])

    return (
      <>
        <InspectorControls>
          <TextControl
            label="Product ID"
            value={`${attributes.productId}`}
            onChange={(productId) =>
              setAttributes({ productId: parseInt(productId) })
            }
          />
        </InspectorControls>
        <div {...blockProps}>
          <ServerSideRender
            block="ecommerce-theme/product"
            attributes={attributes}
          />
        </div>
      </>
    )
  },
}
