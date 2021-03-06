"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var Animation_1 = require("./Animation");
// tslint:enable:max-line-length
var Fade = /** @class */ (function (_super) {
    __extends(Fade, _super);
    function Fade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @hidden
     */
    Fade.prototype.render = function () {
        var _a = this.props, children = _a.children, other = __rest(_a, ["children"]);
        var animationProps = {
            transitionName: "fade"
        };
        return (React.createElement(Animation_1.Animation, __assign({}, animationProps, other), children));
    };
    /**
     * @hidden
     */
    Fade.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        childFactory: PropTypes.any,
        className: PropTypes.string,
        component: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.any
    };
    /**
     * @hidden
     */
    Fade.defaultProps = {
        appear: false,
        enter: true,
        exit: false,
        transitionEnterDuration: 500,
        transitionExitDuration: 500
    };
    return Fade;
}(React.Component));
exports.Fade = Fade;
//# sourceMappingURL=Fade.js.map