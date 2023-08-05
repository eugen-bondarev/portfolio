import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor'
import AccordionItem from '../../components/AccordionItem'
import metadata from './block.json'

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }: any) => {
    return (
      <div {...useBlockProps()}>
        <AccordionItem
          title={
            <RichText
              value={attributes.title}
              onChange={(title) => setAttributes({ title })}
            />
          }
        >
          <InnerBlocks />
        </AccordionItem>
      </div>
    )
  },
  save: () => <InnerBlocks.Content />,
}
