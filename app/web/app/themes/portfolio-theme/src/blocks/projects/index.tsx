import { useBlockProps } from "@wordpress/block-editor";
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

    return (
      <>
        <div {...blockProps}>
          <ServerSideRender
            block="portfolio-theme/projects"
            attributes={attributes}
          />
        </div>
      </>
    );
  },
};
