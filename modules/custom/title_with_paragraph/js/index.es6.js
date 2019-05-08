(function(){  const { blocks, data, element, components, editor } = wp;
  const { registerBlockType } = blocks;
  const { dispatch, select } = data;
  const { Fragment } = element;
  const { PanelBody, ToggleControl } = components;
  const { RichText, InspectorControls, PanelColorSettings } = editor;
  const __ = Drupal.t;


  function render({ className, attributes }){
    const { title, paragraph } = attributes;
    const { backgroundColor, color, fullWidth } = attributes;
    const style = { backgroundColor, color };
    return (
      <div className={[className, !fullWidth ? 'full-width' : 'box-centered'].join(' ')} >
        <div style={style}>
          {title}
          {paragraph && (<p className="paragraph">{paragraph}</p>)}
        </div>
      </div>
    );
  }


  const settings = {
    title: __('FIS Title and paragraph'),
    description: __('A title and paragraph with a background-color'),
    attributes: {
      backgroundColor: {
        type: 'string',
        default: '#F0F1F2',
      },
      color: {
        type: 'string',
        default: '#083350',
      },
      title: {
        type: 'string',
      },
      paragraph: {
        type: 'string',
      },
      fullWidth: {
        type: 'boolean',
        default: false
      }
    },
    edit({ className, attributes, setAttributes, isSelected }) {
      const { title, paragraph } = attributes;
      const { backgroundColor, color, fullWidth } = attributes;

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

      const paragraph_ = <RichText
        identifier="subtitle"
        tagName="p"
        value={paragraph}
        placeholder={__('Text')}
        onChange={nextText => {
          setAttributes({
            paragraph: nextText,
          });
        }}
      />

      const rendered = render({
        className,
        attributes: {
          title: title_,
          paragraph: paragraph_,
          fullWidth,
          backgroundColor,
          color,
        }
      })
      return (
        <Fragment>
          {rendered}
          <InspectorControls>
            <PanelBody title={__('Block Settings')}>
              <div>{title}</div>
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
                label="Text box width"
                help={!fullWidth ? 'Full width.' : 'Centered.'}
                checked={fullWidth}
                onChange={(fullWidth) => { setAttributes({ fullWidth }) }}
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    },

    save({ className, attributes }) {

      const { title } = attributes;
      const title_ = title && <h2 className="title">{title}</h2>;
      return render({ className, attributes: 
        { ...attributes,
          title: title_,
        } 
      });
    },
  };

  const category = {
    slug: 'fis-custom',
    title: __('FIS Custom'),
  };

  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([category, ...currentCategories]);

  registerBlockType(`${category.slug}/title-with-paragraph`, { category: category.slug, ...settings });
})();