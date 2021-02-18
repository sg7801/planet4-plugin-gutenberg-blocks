/* global wp */
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;
const { __ } = wp.i18n;

registerBlockStyle('core/button', {
  name: 'secondary',
  label: __('Secondary', 'planet4-blocks-backend'),
  isDefault: true
});

registerBlockStyle('core/button', {
  name: 'cta',
  label: __('CTA', 'planet4-blocks-backend'),
});

registerBlockStyle('core/button', {
  name: 'donate',
  label: __('Donate', 'planet4-blocks-backend'),
});

wp.domReady(() => {
  unregisterBlockStyle('core/button', 'outline');
  unregisterBlockStyle('core/button', 'fill');

  // Remove Take Action and Campaign covers styles for Covers block in campaigns
  const postType = wp.data.select('core/editor').getCurrentPostType();
  if (postType === 'campaign') {
    unregisterBlockStyle('planet4-blocks/covers', 'take-action');
    unregisterBlockStyle('planet4-blocks/covers', 'campaign');
  }
});
