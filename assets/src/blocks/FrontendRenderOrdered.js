import { FrontendBlockNode } from '../components/FrontendBlockNode/FrontendBlockNode';

/**
 * This function is used in the `save()` method of `registerBlock` to
 * render React blocks in the frontend.
 *
 * It returns a function with the same arguments as the `save()`
 * method.
 *
 * Be careful! Making changes in this function or in the `FrontendBlockNode`
 * component could potentially cause block validation errors in Gutenberg.
 *
 * @param {string} block
 */
export const frontendRenderOrdered = ( block ) => {
  return ( attributes, className ) => {
    if (block === 'planet4-blocks/articles') {
      const orderedAttributes = Object.keys(attributes.attributes).sort().reduce(
        (obj, key) => {
          obj[key] = attributes.attributes[key];
          return obj;
        },
        {}
      );
      attributes.attributes = orderedAttributes;
    }

    return <FrontendBlockNode
      attributes={ attributes }
      className={ className }
      blockName={ block }
    />;
  }
}

