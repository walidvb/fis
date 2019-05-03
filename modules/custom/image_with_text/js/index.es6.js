const { blocks, data, element, components, editor } = wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { Fragment } = element;
const { PanelBody, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl, ToggleControl, TextControl } = components;
const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, MediaUpload, BlockControls } = editor;
const __ = Drupal.t;

const settings = {
  title: __('FIS Cover image with title'),
  description: __('A full width image with a text box overlayed'),
  attributes: {
    color: {
      type: 'string',
      default: '#FFFFFF'
    },
    backgroundColor: {
      type: 'string',
      default: '#005E9D',
    },
    withPadding: {
      type: 'boolean'
    },
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
    },
    imgUrls: {
      type: 'object',
      default: {
        small: { source_url: 'http://placehold.it/800' },
        large: { source_url: 'http://placehold.it/1600' },
      }
    },
  },
  edit({ className, attributes, setAttributes, isSelected }) {
    const { title, subtitle, imgUrls } = attributes;
    const { backgroundColor, color, withPadding } = attributes;
    const { small, large } = imgUrls
    const style = { backgroundColor, color };

    const image = (<MediaUpload
      identifier="imgUrls"
      render={({ open }) => {
        const { small, large } = attributes.imgUrls;
        return <div>
          {isSelected ? <div className="cover-selector" onClick={open}>Select Image</div> : ''}
        </div>
      }}
      onSelect={nextValue => {
        const sizes = nextValue.media_details.sizes;
        setAttributes({
          imgUrls: sizes,
        });
      }}
    />)

    const title_ = (<div className="title">
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
      /></div>);

    const subtitle_ = <RichText
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
    return (
      <Fragment>
        <div className={className}>
          <div className="cover-container" style={style}>
              {large && <div class="cover-image" style={{ backgroundImage: `url('${large.source_url}')` }}></div>}
              {small && <div class="cover-image" style={{ backgroundImage: `url('${small.source_url}')` }}></div>}

              { image }
            {withPadding && <div className="text-container padder">
                {title_}
              </div>}
            {!withPadding && <div className="text-container padder">
                {title_}
                {subtitle_}
              </div>}
          </div>
          {withPadding && <div className="text-container" style={style}><div className="subtitle">subtitle_</div></div>}
        </div>
        <InspectorControls>
          <PanelBody title={__('Block Settings')}>
            <div>{title}</div>
            <label>Text Color</label>
            <TextControl
              identifier="color"
              tagName="p"
              value={color}
              placeholder={__('#FFFFFF')}
              onChange={nextColor => {
                setAttributes({
                  color: nextColor,
                });
              }}
            />
            <label>Background Color</label>
            <TextControl
              identifier="backgroundColor"
              tagName="p"
              value={backgroundColor}
              placeholder={__('#FF00FF')}
              onChange={nextColor => {
                setAttributes({
                  backgroundColor: nextColor,
                });
              }}
            />
            <ToggleControl
              label="Text box position"
              help={!withPadding ? 'Text box over image.' : 'Text box overlaps.'}
              checked={withPadding}
              onChange={(withPadding) => { setAttributes({ withPadding }) }}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ className, attributes }) {
    const { title, subtitle, imgUrls } = attributes;
    const { backgroundColor, color, withPadding } = attributes;
    const { small, large } = imgUrls;

    const title_ = title && (<h2 className="title">{title}</h2>);
    const subtitle_ = subtitle && (<div className="subtitle" >{subtitle}</div>);
    const style = { backgroundColor, color };
    return (
      <div className={className} >
        <div style={style} className="cover-container">
          {small && <div class=" hidden-sm cover-image" style={{ backgroundImage: `url(${small.source_url})` }} />}
          {large && <div class=" hidden-xs cover-image" style={{ backgroundImage: `url(${large.source_url})` }} />}
          {withPadding && <div className="text-container padder">
            {title_}
          </div>}
          {!withPadding && <div className="text-container padder">
            {title_}
            {subtitle_}
          </div>}
        </div>
        {withPadding && <div className="text-container" style={style}>subtitle_</div>}
      </div>
    );
  },
};

const category = {
  slug: 'fis-custom',
  title: __('Custom'),
};

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);

console.log(category)
registerBlockType(`${category.slug}/image-with-text`, { category: category.slug, ...settings });
