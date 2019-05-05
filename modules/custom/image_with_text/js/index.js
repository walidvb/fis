"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _wp = wp,
  blocks = _wp.blocks,
  data = _wp.data,
  element = _wp.element,
  components = _wp.components,
  editor = _wp.editor;
var registerBlockType = blocks.registerBlockType;
var dispatch = data.dispatch,
  select = data.select;
var Fragment = element.Fragment;
var PanelBody = components.PanelBody,
  BaseControl = components.BaseControl,
  Icon = components.Icon,
  RangeControl = components.RangeControl,
  IconButton = components.IconButton,
  Toolbar = components.Toolbar,
  SelectControl = components.SelectControl,
  ToggleControl = components.ToggleControl,
  TextControl = components.TextControl;
var InnerBlocks = editor.InnerBlocks,
  RichText = editor.RichText,
  InspectorControls = editor.InspectorControls,
  PanelColorSettings = editor.PanelColorSettings,
  MediaUpload = editor.MediaUpload,
  BlockControls = editor.BlockControls;
var __ = Drupal.t;

function render(_ref) {
  var className = _ref.className,
    attributes = _ref.attributes;
  var title = attributes.title,
    subtitle = attributes.subtitle,
    image = attributes.image;
  var backgroundColor = attributes.backgroundColor,
    color = attributes.color,
    withPadding = attributes.withPadding;
  var title_ = title && React.createElement("h2", {
    className: "title"
  }, title);
  var subtitle_ = subtitle && React.createElement("div", {
    className: "subtitle"
  }, subtitle);
  var style = {
    backgroundColor: backgroundColor,
    color: color
  };
  return React.createElement("div", {
    className: className
  }, React.createElement("div", {
    style: style,
    className: "cover-container"
  }, image, withPadding && React.createElement("div", {
    className: "text-container padder"
  }, title_), !withPadding && React.createElement("div", {
    className: "text-container padder"
  }, title_, subtitle_)), withPadding && React.createElement("div", {
    className: "text-container",
    style: style
  }, subtitle_));
}

var settings = {
  title: __('FIS Cover image with title'),
  description: __('A full width image with a text box overlayed'),
  attributes: {
    color: {
      type: 'string',
      default: '#FFFFFF'
    },
    backgroundColor: {
      type: 'string',
      default: '#005E9D'
    },
    withPadding: {
      type: 'boolean'
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    imgUrls: {
      type: 'object',
      default: {
        small: {
          source_url: 'http://placehold.it/800'
        },
        large: {
          source_url: 'http://placehold.it/1600'
        }
      }
    }
  },
  edit: function edit(_ref2) {
    var className = _ref2.className,
      attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes,
      isSelected = _ref2.isSelected;
    var title = attributes.title,
      subtitle = attributes.subtitle,
      imgUrls = attributes.imgUrls;
    var backgroundColor = attributes.backgroundColor,
      color = attributes.color,
      withPadding = attributes.withPadding;
    var image = React.createElement(MediaUpload, {
      identifier: "imgUrls",
      render: function render(_ref3) {
        var open = _ref3.open;
        var _attributes$imgUrls = attributes.imgUrls,
          small = _attributes$imgUrls.small,
          large = _attributes$imgUrls.large;
        return React.createElement("div", null, large && React.createElement("div", {
          class: "cover-image",
          style: {
            backgroundImage: "url('".concat(large.source_url, "')")
          }
        }), small && React.createElement("div", {
          class: "cover-image",
          style: {
            backgroundImage: "url('".concat(small.source_url, "')")
          }
        }), isSelected ? React.createElement("div", {
          className: "cover-selector",
          onClick: open
        }, "Select Image") : '');
      },
      onSelect: function onSelect(nextValue) {
        var sizes = nextValue.media_details.sizes;
        setAttributes({
          imgUrls: sizes
        });
      }
    });
    var title_ = React.createElement("div", {
      className: "title"
    }, React.createElement(RichText, {
      identifier: "title",
      tagName: "h2",
      value: title,
      placeholder: __('Title'),
      onChange: function onChange(nextTitle) {
        setAttributes({
          title: nextTitle
        });
      },
      onSplit: function onSplit() {
        return null;
      },
      unstableOnSplit: function unstableOnSplit() {
        return null;
      }
    }));
    var subtitle_ = React.createElement(RichText, {
      identifier: "subtitle",
      tagName: "p",
      value: subtitle,
      placeholder: __('Text'),
      onChange: function onChange(nextText) {
        setAttributes({
          subtitle: nextText
        });
      }
    });
    var rendered = render({
      className: className,
      attributes: {
        title: title_,
        subtitle: subtitle_,
        image: image,
        withPadding: withPadding,
        backgroundColor: backgroundColor,
        color: color
      }
    });
    return React.createElement(Fragment, null, rendered, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Block Settings')
    }, React.createElement("div", null, title), React.createElement("label", null, "Text Color"), React.createElement(TextControl, {
      identifier: "color",
      tagName: "p",
      value: color,
      placeholder: __('#FFFFFF'),
      onChange: function onChange(nextColor) {
        setAttributes({
          color: nextColor
        });
      }
    }), React.createElement("label", null, "Background Color"), React.createElement(TextControl, {
      identifier: "backgroundColor",
      tagName: "p",
      value: backgroundColor,
      placeholder: __('#FF00FF'),
      onChange: function onChange(nextColor) {
        setAttributes({
          backgroundColor: nextColor
        });
      }
    }), React.createElement(ToggleControl, {
      label: "Text box position",
      help: !withPadding ? 'Text box over image.' : 'Text box overlaps.',
      checked: withPadding,
      onChange: function onChange(withPadding) {
        setAttributes({
          withPadding: withPadding
        });
      }
    }))));
  },
  save: function save(_ref4) {
    var className = _ref4.className,
      attributes = _ref4.attributes;
    var _attributes$imgUrls2 = attributes.imgUrls,
      small = _attributes$imgUrls2.small,
      large = _attributes$imgUrls2.large;
    var image = React.createElement("div", null, small && React.createElement("div", {
      class: " hidden-sm cover-image",
      style: {
        backgroundImage: "url(".concat(small.source_url, ")")
      }
    }), large && React.createElement("div", {
      class: " hidden-xs cover-image",
      style: {
        backgroundImage: "url(".concat(large.source_url, ")")
      }
    }));
    return render({
      className: className,
      attributes: {
        ...attributes,
        image: image
      }
    });
  }
};
var category = {
  slug: 'fis-custom',
  title: __('Custom')
};
var currentCategories = select('core/blocks').getCategories().filter(function (item) {
  return item.slug !== category.slug;
});
dispatch('core/blocks').setCategories([category].concat(_toConsumableArray(currentCategories)));
registerBlockType("".concat(category.slug, "/image-with-text"), {
  category: category.slug,
  ...settings
});