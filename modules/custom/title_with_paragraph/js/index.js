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
    paragraph = attributes.paragraph;
  var backgroundColor = attributes.backgroundColor,
    fullWidth = attributes.fullWidth;
  var style = {
    backgroundColor: backgroundColor
  };
  return React.createElement("div", {
    className: [className, fullWidth ? 'full-width' : 'box-centered'].join(' ')
  }, React.createElement("div", {
    style: style
  }, title, paragraph && React.createElement("p", {
    className: "paragraph"
  }, paragraph)));
}

var settings = {
  title: __('FIS Title and paragraph'),
  description: __('A title and paragraph with a background-color'),
  attributes: {
    backgroundColor: {
      type: 'string',
      default: '#F0F1F2'
    },
    title: {
      type: 'string'
    },
    paragraph: {
      type: 'string'
    },
    fullWidth: {
      type: 'boolean',
      default: false
    }
  },
  edit: function edit(_ref2) {
    var className = _ref2.className,
      attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes,
      isSelected = _ref2.isSelected;
    var title = attributes.title,
      paragraph = attributes.paragraph;
    var backgroundColor = attributes.backgroundColor,
      fullWidth = attributes.fullWidth;
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
    var paragraph_ = React.createElement(RichText, {
      identifier: "subtitle",
      tagName: "p",
      value: paragraph,
      placeholder: __('Text'),
      onChange: function onChange(nextText) {
        setAttributes({
          paragraph: nextText
        });
      }
    });
    var rendered = render({
      className: className,
      attributes: {
        title: title_,
        paragraph: paragraph_,
        fullWidth: fullWidth,
        backgroundColor: backgroundColor
      }
    });
    return React.createElement(Fragment, null, rendered, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Block Settings')
    }, React.createElement("div", null, title), React.createElement("label", null, "Background Color"), React.createElement(TextControl, {
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
      label: "Text box width",
      help: !fullWidth ? 'Full width.' : 'Centered.',
      checked: fullWidth,
      onChange: function onChange(fullWidth) {
        setAttributes({
          fullWidth: fullWidth
        });
      }
    }))));
  },
  save: function save(_ref3) {
    var className = _ref3.className,
      attributes = _ref3.attributes;
    var title = attributes.title;
    var title_ = title && React.createElement("h2", {
      className: "title"
    }, title);
    return render({
      className: className,
      attributes: {
        ...attributes,
        title: title_
      }
    });
  }
};
var category = {
  slug: 'fis-custom',
  title: __('FIS Custom')
};
var currentCategories = select('core/blocks').getCategories().filter(function (item) {
  return item.slug !== category.slug;
});
dispatch('core/blocks').setCategories([category].concat(_toConsumableArray(currentCategories)));
registerBlockType("".concat(category.slug, "/title-with-paragraph"), {
  category: category.slug,
  ...settings
});