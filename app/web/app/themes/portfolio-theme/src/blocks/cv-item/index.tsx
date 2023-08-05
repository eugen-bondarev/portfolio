import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor'
import metadata from './block.json'
import CVItem from '../../components/CVItem'

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }: any) => {
    return (
      <div {...useBlockProps()}>
        <CVItem
          title={
            <RichText
              value={attributes.title}
              onChange={(title) => setAttributes({ title })}
            />
          }
        >
          <InnerBlocks />
        </CVItem>
      </div>
    )
  },
  save: () => <InnerBlocks.Content />,
}
