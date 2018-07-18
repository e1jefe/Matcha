'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _rcDrawer = require('rc-drawer');

var _rcDrawer2 = _interopRequireDefault(_rcDrawer);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

var _isNumeric = require('../_util/isNumeric');

var _isNumeric2 = _interopRequireDefault(_isNumeric);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var DrawerContext = (0, _createReactContext2['default'])(null);

var Drawer = function (_React$Component) {
    (0, _inherits3['default'])(Drawer, _React$Component);

    function Drawer() {
        (0, _classCallCheck3['default'])(this, Drawer);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).apply(this, arguments));

        _this.state = {
            push: false
        };
        _this.close = function (e) {
            if (_this.props.visible !== undefined) {
                if (_this.props.onClose) {
                    _this.props.onClose(e);
                }
                return;
            }
        };
        _this.onMaskClick = function (e) {
            if (!_this.props.maskClosable) {
                return;
            }
            _this.close(e);
        };
        _this.push = function () {
            _this.setState({
                push: true
            });
        };
        _this.pull = function () {
            _this.setState({
                push: false
            });
        };
        _this.renderBody = function () {
            var _this$props = _this.props,
                destroyOnClose = _this$props.destroyOnClose,
                visible = _this$props.visible,
                width = _this$props.width,
                placement = _this$props.placement;

            if (destroyOnClose && !visible) {
                return null;
            }
            var _this$props2 = _this.props,
                prefixCls = _this$props2.prefixCls,
                title = _this$props2.title,
                closable = _this$props2.closable;

            var header = void 0;
            if (title) {
                header = React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-title' },
                        title
                    )
                );
            }
            var closer = void 0;
            if (closable) {
                closer = React.createElement(
                    'button',
                    { onClick: _this.close, 'aria-label': 'Close', className: prefixCls + '-close' },
                    React.createElement('span', { className: prefixCls + '-close-x' })
                );
            }
            var containerStyle = { width: width };
            if (placement === 'left' || placement === 'right') {
                containerStyle = {
                    overflow: 'auto',
                    height: '100%',
                    width: width
                };
            }
            return React.createElement(
                'div',
                { style: containerStyle },
                header,
                closer,
                React.createElement(
                    'div',
                    { className: prefixCls + '-body', style: _this.props.style },
                    _this.props.children
                )
            );
        };
        _this.renderProvider = function (value) {
            var _a = _this.props,
                width = _a.width,
                zIndex = _a.zIndex,
                style = _a.style,
                placement = _a.placement,
                rest = __rest(_a, ["width", "zIndex", "style", "placement"]);
            if ((0, _isNumeric2['default'])(width)) {
                width = width + 'px';
            }
            var RcDrawerStyle = _this.state.push ? {
                zIndex: zIndex,
                transform: 'translateX(' + (placement === 'left' ? 180 : -180) + 'px)'
            } : { zIndex: zIndex };
            _this.praentDrawer = value;
            return React.createElement(
                DrawerContext.Provider,
                { value: _this },
                React.createElement(
                    _rcDrawer2['default'],
                    (0, _extends3['default'])({}, rest, { handler: false, open: _this.props.visible, onMaskClick: _this.onMaskClick, showMask: _this.props.mask, placement: placement, style: RcDrawerStyle }),
                    _this.renderBody()
                )
            );
        };
        return _this;
    }

    (0, _createClass3['default'])(Drawer, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(preProps) {
            if (preProps.visible !== this.props.visible && this.praentDrawer) {
                if (this.props.visible) {
                    this.praentDrawer.push();
                } else {
                    this.praentDrawer.pull();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                DrawerContext.Consumer,
                null,
                this.renderProvider
            );
        }
    }]);
    return Drawer;
}(React.Component);

exports['default'] = Drawer;

Drawer.propTypes = {
    closable: _propTypes2['default'].bool,
    destroyOnClose: _propTypes2['default'].bool,
    getContainer: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object, _propTypes2['default'].func, _propTypes2['default'].bool]),
    maskClosable: _propTypes2['default'].bool,
    mask: _propTypes2['default'].bool,
    maskStyle: _propTypes2['default'].object,
    style: _propTypes2['default'].object,
    title: _propTypes2['default'].node,
    visible: _propTypes2['default'].bool,
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    wrapClassName: _propTypes2['default'].string,
    zIndex: _propTypes2['default'].number,
    prefixCls: _propTypes2['default'].string,
    placement: _propTypes2['default'].string,
    onClose: _propTypes2['default'].func
};
Drawer.defaultProps = {
    prefixCls: 'ant-drawer',
    width: 256,
    closable: true,
    placement: 'right',
    maskClosable: true,
    level: null
};
module.exports = exports['default'];