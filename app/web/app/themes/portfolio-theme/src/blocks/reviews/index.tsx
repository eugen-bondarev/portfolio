import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import metadata from "./block.json";
import ServerSideRender from "@wordpress/server-side-render";

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }: any) => {
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
        <div {...useBlockProps()}>
          <ServerSideRender
            block="portfolio-theme/reviews"
            attributes={attributes}
          />
        </div>
      </>
    );
  },
};
