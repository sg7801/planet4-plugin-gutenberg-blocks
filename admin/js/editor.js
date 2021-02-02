/* global wp */
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;
const { __ } = wp.i18n;

wp.domReady(() => {
  registerBlockStyle('core/button', {
    name: 'secondary',
    label: 'Secondary',
    isDefault: true
  });
  registerBlockStyle('core/button', {
    name: 'cta',
    label: 'CTA'
  });
  registerBlockStyle('core/button', {
    name: 'donate',
    label: 'Donate'
  });
  unregisterBlockStyle('core/button', 'outline');
  unregisterBlockStyle('core/button', 'fill');

  // Remove Take Action and Campaign covers styles for Covers block in campaigns
  const postType = document.querySelector('form.metabox-base-form input#post_type').value;
  if (postType === 'campaign') {
    unregisterBlockStyle('planet4-blocks/covers', 'take-action');
    unregisterBlockStyle('planet4-blocks/covers', 'campaign');
  }
});
