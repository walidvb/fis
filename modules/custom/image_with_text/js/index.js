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
  SelectControl = components.SelectControl;
var InnerBlocks = editor.InnerBlocks,
  RichText = editor.RichText,
  InspectorControls = editor.InspectorControls,
  PanelColorSettings = editor.PanelColorSettings,
  MediaUpload = editor.MediaUpload,
  BlockControls = editor.BlockControls;
var __ = Drupal.t;
var settings = {
  title: __('Gutenberg Example Block'),
  description: __('Gutenberg Example Block'),
  attributes: {
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    imgUrls: {
      type: 'object',
      default: {
        large: {
          source_url: 'http://placehold.it'
        }
      }
    }
  },
  edit: function edit(_ref) {
    var className = _ref.className,
      attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      isSelected = _ref.isSelected;
    var title = attributes.title,
      subtitle = attributes.subtitle,
      imgUrls = attributes.imgUrls;
    console.log('editAttributes', attributes);
    var large = imgUrls.large;
    return React.createElement(Fragment, null, React.createElement("div", {
      className: className
    }, React.createElement("div", {
      className: "column"
    }, React.createElement("div", {
      class: "cover-image",
      style: {
        backgroundImage: "url('".concat(large.source_url, "')")
      }
    }), React.createElement(RichText, {
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
    }), React.createElement(RichText, {
      identifier: "subtitle",
      tagName: "p",
      value: subtitle,
      placeholder: __('Text'),
      onChange: function onChange(nextText) {
        setAttributes({
          text: nextText
        });
      }
    }), React.createElement(MediaUpload, {
      identifier: "imgUrls",
      render: function render(_ref2) {
        var open = _ref2.open;
        console.log('attributes', attributes);
        var large = attributes.imgUrls.large;
        return React.createElement("div", null, React.createElement("div", {
          className: "cover-image",
          style: {
            backgroundImage: "url('".concat(large.source_url, "')")
          }
        }), isSelected ? React.createElement("div", {
          onClick: open
        }, "Select Image") : '');
      },
      onSelect: function onSelect(nextValue) {
        console.log(nextValue);
        var sizes = nextValue.media_details.sizes;
        setAttributes({
          imgUrls: sizes
        });
      }
    }))), React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Block Settaings')
    }, React.createElement("div", null, title))));
  },
  save: function save(_ref3) {
    var className = _ref3.className,
      attributes = _ref3.attributes;
    var title = attributes.title,
      subtitle = attributes.subtitle,
      text = attributes.text,
      imgUrls = attributes.imgUrls;
    var large = imgUrls.large;
    console.log(attributes);
    return React.createElement("div", {
      className: className
    }, React.createElement("div", {
      class: "cover-image",
      style: {
        backgroundImage: "url(".concat(large.source_url, ")")
      }
    }), title && React.createElement("h2", null, title), subtitle && React.createElement("div", null, subtitle), text && React.createElement("p", null, text));
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
console.log(category);
registerBlockType("".concat(category.slug, "/image-with-text"), {
  category: category.slug,
  ...settings
});