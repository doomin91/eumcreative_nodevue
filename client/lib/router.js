"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("./views/Home"));

var _About = _interopRequireDefault(require("./views/About"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueRouter.default);

const router = new _vueRouter.default({
  mode: "history",
  routes: [{
    path: "/",
    component: _Home.default
  }, {
    path: "/about",
    component: _About.default
  }]
});
var _default = router;
exports.default = _default;