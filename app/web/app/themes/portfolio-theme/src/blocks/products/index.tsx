import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import metadata from "./block.json";
import ServerSideRender from "@wordpress/server-side-render";
import renderApps from "../../frontend/render-apps";
import { useRef, useEffect, useState } from "react";

export const settings = {
  ...metadata,
  edit: ({ attributes, setAttributes }: any) => {
    const ref = useRef();
    const blockProps = useBlockProps({ ref });

    useEffect(() => {
      if (!ref.current) {
        return;
      }
      const timeoutId = setTimeout(() => renderApps(ref.current), 1000);
      return () => clearTimeout(timeoutId);
    }, [ref, attributes]);

    const [productIds, setProductIds] = useState<string>(
      (attributes.productIds ?? []).join(", ")
    );

    useEffect(
      () =>
        setAttributes({
          productIds: productIds
            .split(",")
            .map((str) => parseInt(str))
            .filter(Boolean),
        }),
      [productIds]
    );

    return (
      <>
        <InspectorControls>
          <pre>{productIds}</pre>
          <pre>{JSON.stringify(attributes.productIds)}</pre>
          <TextControl
            label="Product ID"
            value={productIds}
            onChange={setProductIds}
          />
        </InspectorControls>
        <div {...blockProps}>
          <ServerSideRender
            block="portfolio-theme/products"
            attributes={attributes}
          />
        </div>
      </>
    );
  },
};
