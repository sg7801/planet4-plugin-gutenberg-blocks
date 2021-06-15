import {ENFormEditor} from './ENFormEditor';
import {frontendRendered} from '../frontendRendered';

const BLOCK_NAME = 'planet4-blocks/enform-beta';

const attributes = {
  en_page_id: { type: 'integer', },
  enform_goal: { type: 'string', },
  en_form_style: { type: 'string', },
  title: { type: 'string', },
  description: { type: 'string', },
  campaign_logo: { type: 'boolean', },
  content_title: { type: 'string', },
  content_title_size: { type: 'string', default: 'h1' },
  content_description: { type: 'string', },
  button_text: { type: 'string', },
  text_below_button: { type: 'string', },
  thankyou_title: { type: 'string', },
  thankyou_subtitle: { type: 'string', },
  thankyou_donate_message: { type: 'string', },
  thankyou_social_media_message: { type: 'string', },
  donate_button_checkbox: { type: 'boolean', },
  custom_donate_url: { type: 'string', },
  thankyou_url: { type: 'string', },
  background: { type: 'integer', },
  background_image_src: { type: 'string', default: '' },
  background_image_srcset: { type: 'string', },
  background_image_sizes: { type: 'string', },
  en_form_id: { type: 'integer', },
  en_form_fields: { type: 'array', default: [] },
  social: { type: 'object', default: {} },
};

export const registerENForm = () => {
  const { registerBlockType } = wp.blocks;

  registerBlockType(BLOCK_NAME, {
    title: 'EN Form (beta)',
    icon: 'feedback',
    category: 'planet4-blocks-beta',
    styles: [
      {name: 'full-width-bg', label: 'Full width with background'},
      {name: 'full-width', label: 'Full width'},
      {name: 'side-style', label: 'Form on the side', isDefault: true},
    ],
    attributes,
    edit: ENFormEditor,
    save: frontendRendered(BLOCK_NAME),
  });
}

registerENForm();
