  const { blocks, data, element, components, editor } = wp;
  const { registerBlockType } = blocks;
  const { dispatch, select } = data;
  const { Fragment } = element;
  const { PanelBody, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl } = components;
  const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, MediaUpload, BlockControls } = editor;
  const __ = Drupal.t;

  const settings = {
    title: __('Gutenberg Example Block'),
    description: __('Gutenberg Example Block'),
    attributes: {
      title: {
        type: 'string',
      },
      subtitle: {
        type: 'string',
      },
      imgUrls: {
        type: 'object',
        default: {
          large: {source_url: 'http://placehold.it'},
        }
      },
    },
    edit({ className, attributes, setAttributes, isSelected }) {
      const { title, subtitle, imgUrls } = attributes;
      console.log('editAttributes', attributes);
      const { large } = imgUrls
      return (
        <Fragment>
          <div className={className}>
            <div className="column">
              <div class="cover-image" style={{ backgroundImage: `url('${large.source_url}')` }}></div>
              <RichText
                identifier="title"
                tagName="h2"
                value={title}
                placeholder={__('Title')}
                onChange={nextTitle => {
                  setAttributes({
                    title: nextTitle,
                  });
                }}
                onSplit={() => null}
                unstableOnSplit={() => null}
              />
              <RichText
                identifier="subtitle"
                tagName="p"
                value={subtitle}
                placeholder={__('Text')}
                onChange={nextText => {
                  setAttributes({
                    text: nextText,
                  });
                }}
              />
              <MediaUpload
                identifier="imgUrls"
                render={({ open }) => {
                  console.log('attributes', attributes)
                  const { large } = attributes.imgUrls;
                  return <div>
                    <div className="cover-image" style={{ backgroundImage: `url('${large.source_url}')` }}></div>
                    {isSelected ? <div onClick={open}>Select Image</div> : ''}
                  </div>
                }}
                onSelect={nextValue => {
                  console.log(nextValue)
                  const sizes = nextValue.media_details.sizes;
                  setAttributes({
                    imgUrls: sizes,
                  });
                }}
              />
            </div>
          </div>
          <InspectorControls>
            <PanelBody title={ __('Block Settings') }>
              <div>{title}</div>
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    },

    save({ className, attributes }) {
      const { title, subtitle, text, imgUrls } = attributes;
      const { large } = imgUrls;
      console.log(attributes);
      return (
        <div className={className}>
          <div class=" hidden-xs cover-image" style={{backgroundImage: `url(${large.source_url})`}} />

          {title && (
            <h2>{title}</h2>
          )}
          {subtitle && (
            <div>{subtitle}</div>
          )}
          {text && (
            <p>{text}</p>
          )}
          
        </div>
      );
    },
  };

  const category = {
    slug: 'fis-custom',
    title: __('Custom'),
  };

  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

  console.log(category)
  registerBlockType(`${category.slug}/image-with-text`, { category: category.slug, ...settings });
