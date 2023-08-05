import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { TextControl } from '@wordpress/components'
import Logo from '../../components/Logo'
import metadata from './block.json'

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }) => {
    return (
      <>
        <InspectorControls>
          <TextControl
            label="Nodes (json string)"
            value={attributes.nodes}
            onChange={(nodes) => setAttributes({ nodes })}
          />
          <TextControl
            label="Connections (json string)"
            value={attributes.additionalConnections}
            onChange={(additionalConnections) =>
              setAttributes({ additionalConnections })
            }
          />
        </InspectorControls>
        <div {...useBlockProps()}>
          <Logo
            nodes={attributes.nodes}
            additionalConnections={attributes.additionalConnections}
          />
        </div>
      </>
    )
  },
}
