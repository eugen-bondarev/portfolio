import { RichText, useBlockProps } from '@wordpress/block-editor'
import Hero from '../../components/Hero'
import metadata from './block.json'

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }) => {
    return (
      <div {...useBlockProps()}>
        <Hero
          title={
            <RichText
              value={attributes.title}
              onChange={(title) => setAttributes({ title })}
              placeholder="Lorem.."
            />
          }
          subtitle={
            <RichText
              value={attributes.subtitle}
              onChange={(subtitle) => setAttributes({ subtitle })}
              placeholder="Ipsum.."
            />
          }
        />
      </div>
    )
  },
}
