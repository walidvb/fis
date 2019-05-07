(function(){  
  const { blocks, data, element, components, editor } = wp;
  const { registerBlockType } = blocks;
  const { dispatch, select } = data;
  const { Fragment } = element;
  const { PanelBody, ToggleControl, TextControl } = components;
  const { RichText, InspectorControls, PanelColorSettings, MediaUpload } = editor;
  const __ = Drupal.t;


  function render({ className, attributes }){
    const { title, subtitle, image } = attributes;
    const { backgroundColor, color, withPadding } = attributes;
    const subtitle_ = subtitle && (<div className="subtitle" >{subtitle}</div>);
    const style = { backgroundColor, color };
    return (
      <div className={className}>
        <div style={style} className="cover-container">
          {image}
          {withPadding && <div className="text-container padder">
            {title}
          </div>}
          {!withPadding && <div className="text-container padder">
            {title}
            {subtitle_}
          </div>}
        </div>
        {withPadding && <div className="text-container" style={style}>{subtitle_}</div>}
      </div>
    );
  }


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
          full_width_mobile: { source_url: 'http://placehold.it/800' },
          full_width: { source_url: 'http://placehold.it/1600' },
        }
      },
    },
    edit({ className, attributes, setAttributes, isSelected }) {
      const { title, subtitle, imgUrls } = attributes;
      const { backgroundColor, color, withPadding } = attributes;

      const image = (<MediaUpload
        identifier="imgUrls"
        render={({ open }) => {
          const { full_width_mobile, full_width } = imgUrls;
          return <div>
            {full_width && <div class="cover-image" style={{ backgroundImage: `url('${full_width.source_url}')` }}></div>}
            {full_width_mobile && <div class="cover-image" style={{ backgroundImage: `url('${full_width_mobile.source_url}')` }}></div>}
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
            subtitle: nextText,
          });
        }}
      />

      const rendered = render({
        className,
        attributes: {
          title: title_,
          subtitle: subtitle_,
          image,
          withPadding, backgroundColor, color,
        }
      })
      return (
        <Fragment>
          {rendered}
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
              <PanelColorSettings
                colorSettings={[
                  {
                    value: backgroundColor,
                    onChange: (colorValue) => setAttributes({ backgroundColor: colorValue }),
                    label: __('Background Color'),
                  },
                  {
                    value: color,
                    onChange: (colorValue) => setAttributes({ color: colorValue }),
                    label: __('Text Color'),
                  },
                ]}
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
      const { full_width_mobile, full_width } = attributes.imgUrls;
      const image = <div>{full_width_mobile && <div class=" hidden-sm cover-image" style={{ backgroundImage: `url(${full_width_mobile.source_url})` }} />}
        {full_width && <div class=" hidden-xs cover-image" style={{ backgroundImage: `url(${full_width.source_url})` }} />}</div>
      let { title } = attributes;
      title = attributes.title && (<h2 className="title"> {title} </h2>);
      return render({ className, attributes: {
        ...attributes, 
        title,
        image,
      } });
    },
  };

  const category = {
    slug: 'fis-custom',
    title: __('Custom'),
  };

  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([category, ...currentCategories]);

  registerBlockType(`${category.slug}/image-with-text`, { category: category.slug, ...settings });
})();