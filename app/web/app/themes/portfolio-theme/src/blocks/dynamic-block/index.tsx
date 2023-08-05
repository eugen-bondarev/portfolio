import { useBlockProps } from '@wordpress/block-editor'
import DynamicComponent from '../../components/DynamicComponent'
import metadata from './block.json'

export const settings = {
  ...metadata,
  edit: () => {
    return (
      <div {...useBlockProps()}>
        <DynamicComponent />
      </div>
    )
  },
}
