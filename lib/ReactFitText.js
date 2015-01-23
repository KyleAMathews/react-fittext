/*
 * React FitText v0.0.3
 * https://github.com/gianu/react-fittext
 *
 * A port of the jQuery plugin: http://github.com/davatron5000/FitText.js
 *
 * Released under the MIT license
 * http://gianu.mit-license.org
 */
'use strict';

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var ComponentWidthMixin = require('react-component-width-mixin');

module.exports = React.createClass({
  displayName: 'ReactFitText',

  mixins: [ComponentWidthMixin],

  propTypes: {
    children: ReactPropTypes.element.isRequired,
    compressor: ReactPropTypes.number,
    minFontSize: ReactPropTypes.number,
    maxFontSize: ReactPropTypes.number
  },

  getDefaultProps: function() {
    return {
      compressor: 1.0,
      minFontSize: Number.NEGATIVE_INFINITY,
      maxFontSize: Number.POSITIVE_INFINITY
    };
  },

  componentDidMount: function() {
    this._onBodyResize();
  },

  componentDidUpdate: function() {
    this._onBodyResize();
  },

  _calculateSize: function() {
    var width = this.state.componentWidth;

    return Math.max(
      Math.min((width / (this.props.compressor*10)),
                parseFloat(this.props.maxFontSize)),
         parseFloat(this.props.minFontSize)) + 'px';
  },

  _onBodyResize: function() {
    this.getDOMNode().style.fontSize = this._calculateSize();
  },

  render: function() {
    if (this.props.initialComponentWidth !== null) {
      return React.addons.cloneWithProps(this.props.children, {
        style: {
          fontSize: this._calculateSize()
        }
      });
    }
    else {
      return this.props.children;
    }
  }
});
