import { Component, Fragment } from '@wordpress/element';
import { Preview } from '../../components/Preview';
import {
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/editor';

import {
  TextControl,
  TextareaControl,
  ServerSideRender,
  Button,
  Tooltip
} from '@wordpress/components';

export class SocialMediaCards extends Component {
  constructor(props) {
    super(props);
  }

  renderEdit() {
    const { __ } = wp.i18n;

    const { cards, onDeleteImage } = this.props;

    const getImageOrButton = (openEvent) => {
      if (cards.length > 0) {

        return cards.map( ( card, index ) => (
          <span className="img-wrap">
                <Tooltip text={ __( 'Remove Image', 'p4ge' ) }>
                  <span className="close" onClick={ ev => {
                    onDeleteImage( card.image_id );
                    ev.stopPropagation()
                  } }>&times;</span>
                </Tooltip>
                <img
                  src={ card.image_url }
                  onClick={ openEvent }
                  className="gallery__imgs"
                  key={ index }
                  width='150 px'
                  style={ { padding: '10px 10px' } }
                />
              </span>
        ) )
      }

      return (
        <div className="button-container">
          <Button
            onClick={openEvent}
            className="button">
            + {__('Select Images', 'p4ge')}
          </Button>

          <div>{__('Select images in the order you want them to appear.', 'p4ge')}</div>
        </div>
      );
    };

    return (
      <Fragment>
        <div>
          <TextControl
            label={__('Title', 'p4ge')}
            placeholder={__('Enter title', 'p4ge')}
            help={__('Optional', 'p4ge')}
            value={this.props.title}
            onChange={this.props.onTitleChange}
          />
          <TextareaControl
            label={__('Description', 'p4ge')}
            placeholder={__('Enter description', 'p4ge')}
            help={__('Optional', 'p4ge')}
            value={this.props.description}
            onChange={this.props.onDescriptionChange}
          />
        </div>
        {__('Select Images', 'p4ge')}
        <div>
          <MediaUploadCheck>
            <MediaUpload
              title={__('Select Images', 'p4ge')}
              type="image"
              onSelect={this.props.onSelectImages}
              value={ cards.map( card => card.image_id ) }
              allowedTypes={["image"]}
              multiple="true"
              render={({ open }) => getImageOrButton(open)}
            />
          </MediaUploadCheck>
        </div>

        <div>
          <ul>
            { cards.map( ( card, index ) => {
              return (
                <li key={ index.toString() }>
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src={ card.image_url }
                        width={ 212 }
                        height={ 212 }
                      />
                    </div>
                    <div className="col-md-6">
                      <TextareaControl
                        label={ __( 'Social message', 'p4ge' ) }
                        placeholder={ __( 'Enter message', 'p4ge' ) }
                        help={ __( 'Optional. This message will be added as a quote on Facebook and Twitter shares.', 'p4ge' ) }
                        value={ card.message }
                        onChange={ this.props.onMessageChange.bind( this, index ) }
                      />

                      <TextControl
                        label={ __( 'Social URL', 'p4ge' ) }
                        placeholder={ __( 'Enter URL to share', 'p4ge' ) }
                        help={ __( 'Optional. If not specified then the url of the current page will be used.', 'p4ge' ) }
                        value={ card.social_url }
                        onChange={ this.props.onURLChange.bind( this, index ) }
                      />
                    </div>
                  </div>
                  <hr/>
                </li>
              );
            } ) }
          </ul>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <div>
        { this.props.isSelected &&
        this.renderEdit()
        }
        <Preview showBar={ this.props.isSelected }>
          <ServerSideRender
            block={ 'planet4-blocks/social-media-cards' }
            attributes={ this.props.attributes }>
          </ServerSideRender>
        </Preview>
      </div>
    );
  }
}
