import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import * as React from 'react';
import RcDrawer from 'rc-drawer';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import isNumeric from '../_util/isNumeric';
var DrawerContext = createReactContext(null);

var Drawer = function (_React$Component) {
    _inherits(Drawer, _React$Component);

    function Drawer() {
        _classCallCheck(this, Drawer);

        var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).apply(this, arguments));

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
            if (isNumeric(width)) {
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
                    RcDrawer,
                    _extends({}, rest, { handler: false, open: _this.props.visible, onMaskClick: _this.onMaskClick, showMask: _this.props.mask, placement: placement, style: RcDrawerStyle }),
                    _this.renderBody()
                )
            );
        };
        return _this;
    }

    _createClass(Drawer, [{
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

export default Drawer;

Drawer.propTypes = {
    closable: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.bool]),
    maskClosable: PropTypes.bool,
    mask: PropTypes.bool,
    maskStyle: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.node,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrapClassName: PropTypes.string,
    zIndex: PropTypes.number,
    prefixCls: PropTypes.string,
    placement: PropTypes.string,
    onClose: PropTypes.func
};
Drawer.defaultProps = {
    prefixCls: 'ant-drawer',
    width: 256,
    closable: true,
    placement: 'right',
    maskClosable: true,
    level: null
};