"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router/index"));

var _bootstrapVue = require("bootstrap-vue");

require("bootstrap/dist/css/bootstrap.css");

require("bootstrap-vue/dist/bootstrap-vue.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Bootstrap an BootstrapVue CSS files (order is important)
// Make BootstrapVue available throughout your project
_vue.default.use(_bootstrapVue.BootstrapVue); // Optionally install the BootstrapVue icon components plugin

_vue.default.use(_bootstrapVue.IconsPlugin);

_vue.default.config.productionTip = false;
console.log('main.js');
new _vue.default({
  router: _router.default,
  render: h => h(_App.default)
}).$mount('#app');