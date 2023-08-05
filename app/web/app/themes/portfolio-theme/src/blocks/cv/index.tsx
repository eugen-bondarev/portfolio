import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import metadata from './block.json'
import CV from '../../components/CV'

export const settings = {
  ...metadata,
  edit: () => {
    return (
      <div {...useBlockProps()}>
        <CV>
          <InnerBlocks />
        </CV>
      </div>
    )
  },
  save: () => <InnerBlocks.Content />,
}
