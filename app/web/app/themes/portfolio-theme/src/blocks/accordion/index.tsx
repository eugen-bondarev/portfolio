import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import Accordion from '../../components/Accordion'
import metadata from './block.json'

export const settings = {
  ...metadata,
  edit: () => {
    return (
      <div {...useBlockProps()}>
        <Accordion>
          <InnerBlocks />
        </Accordion>
      </div>
    )
  },
  save: () => <InnerBlocks.Content />,
}
