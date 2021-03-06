/*!
 * @cmgl/vue-pixi-core - v1.0.5
 *
 * @cmgl/vue-pixi-core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { createRenderer, reactive, ref, inject, onMounted, onBeforeUnmount, openBlock, createBlock, createVNode, createApp } from 'vue';
import { Container, Sprite, TilingSprite, Text, Graphics, Texture, Renderer, Application } from 'pixi.js';
import { Validator } from '@cmjs/utils-validator';
import { Event } from '@cmjs/utils-event';
import { Container2d, Sprite2d, registerProjection } from '@cmgl/pixi-projection2d';
import { Drag, Gesture } from '@cmgl/pixi-gesture';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _createClass = unwrapExports(createClass);

var defineProperty = createCommonjsModule(function (module) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _defineProperty = unwrapExports(defineProperty);

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 11:17:24
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-05 18:21:45
 */
function getCreateElement() {
  var elementList = {
    Container: Container,
    Sprite: Sprite,
    TilingSprite: TilingSprite,
    Text: Text,
    Graphics: Graphics,
    // pixi-projection???????????????
    Container2d: Container2d,
    Sprite2d: Sprite2d
  };
  return function (type) {
    var Creator = elementList[type] ? elementList[type] : Container;
    return new Creator();
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 16:30:36
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-01-29 19:24:39
 */

var transformKey = ['scale', 'skew', 'anchor', 'pivot']; // ?????????X???Y???????????????

function resolveTransformKey(key) {
  var last = key[key.length - 1];
  var prefix = key.slice(0, key.length - 1);

  if ((last === 'X' || last === 'Y') && transformKey.indexOf(prefix) >= 0) {
    return {
      prefix: prefix,
      last: last.toLowerCase()
    };
  }

  return null;
}

function patchProp(el, key, prevValue, nextValue) {
  if (key === 'texture') {
    // ?????????????????????texture??????
    if (nextValue instanceof Texture) {
      el[key] = nextValue;
    } else {
      // ?????????????????????????????????????????????
      el[key] = Texture.from(nextValue);
    }

    return;
  } // ?????????????????????????????????scale\skew\anchor\pivot


  var transformKey = resolveTransformKey(key);

  if (transformKey && el[transformKey.prefix]) {
    el[transformKey.prefix][transformKey.last] = nextValue;
    return;
  }

  el[key] = nextValue;
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-02 09:53:00
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-04 10:04:41
 */
function vPshow() {
  return function (el, binding) {
    el.visible = binding.value ? true : false;
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-09 10:45:08
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:24:09
 */
function vTicker(game) {
  var ticker = game.$app.ticker; // ?????????????????????????????????

  var cache = new WeakMap();
  return {
    mounted: function mounted(el, binding) {
      console.log('ticker-mounted', el, binding, ticker);
      var handlerObj = cache.get(el); // ??????????????????????????????????????????

      if (!handlerObj) {
        var removeHandler = function removeHandler() {
          ticker.remove(handler);
          cache["delete"](el);
        };

        var handler = function handler(time) {
          if (typeof binding.value === 'function') {
            binding.value(time, {
              el: el,
              ticker: ticker,
              stop: removeHandler
            });
          } else {
            console.error('The ticker handler must be a function!');
          }
        };

        cache.set(el, {
          handler: handler,
          removeHandler: removeHandler
        });
        ticker.add(handler);
      }
    },
    beforeUnmount: function beforeUnmount(el, binding) {
      console.log('ticker-beforeUnmount', el, binding, ticker);
      var handlerObj = cache.get(el);

      if (handlerObj) {
        handlerObj.removeHandler();
      }
    }
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 20:10:13
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-09 10:46:18
 */
function vPon() {
  return {
    mounted: function mounted(el, binding) {
      //console.log('pon-mounted', el, binding)
      el.interactive = true;
      el.on(binding.arg, binding.value);
    },
    beforeUnmount: function beforeUnmount(el, binding) {
      // console.log('pon-beforeUnmount', el, binding)
      el.off(binding.arg, binding.value);
    }
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-08 10:30:43
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 18:16:08
 */
function vDrag() {
  // ????????????????????????????????????
  var cache = new WeakMap();
  return {
    mounted: function mounted(el, binding) {
      console.log('drag-mounted', el, binding);
      var obj = cache.get(el);

      if (!obj) {
        obj = new Drag(el, {
          onGesture: binding.value
        });
        cache.set(el, obj);
      }
    },
    beforeUnmount: function beforeUnmount(el, binding) {
      console.log('drag-beforeUnmount', el, binding);
      var obj = cache.get(el);

      if (obj) {
        // ??????????????????
        obj.release();
        cache["delete"](el);
      }
    }
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-08 10:30:43
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 18:16:18
 */
function vGesture() {
  // ????????????????????????????????????
  var cache = new WeakMap();
  return {
    mounted: function mounted(el, binding) {
      console.log('gesture-mounted', el, binding);
      var obj = cache.get(el);

      if (!obj) {
        obj = new Gesture(el, {
          onGesture: binding.value
        });
        cache.set(el, obj);
      }
    },
    beforeUnmount: function beforeUnmount(el, binding) {
      console.log('gesture-beforeUnmount', el, binding);
      var obj = cache.get(el);

      if (obj) {
        // ??????????????????
        obj.release();
        cache["delete"](el);
      }
    }
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 20:15:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 15:11:46
 */
/**
 * ????????????
 * @param {Game} game ???????????? 
 * @param {Object} app Vue???????????? 
 */

function bindDirectives(game, app) {
  if (!app || typeof app.directive !== 'function') {
    return;
  }

  app.directive('pshow', vPshow());
  app.directive('ticker', vTicker(game));
  app.directive('pon', vPon());
  app.directive('drag', vDrag());
  app.directive('gesture', vGesture());
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 10:29:28
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-12 16:48:21
 */
function getPIXIRenderer(game) {
  var renderer = createRenderer({
    // ??????????????????
    createElement: function createElement(type) {
      //console.log('createElement', type)
      var createElement = getCreateElement();
      return createElement(type);
    },
    // ????????????????????????
    insert: function insert(el, parent) {
      //console.log('insert', el, parent)
      parent.addChild(el);
    },
    // ????????????????????????
    remove: function remove(el) {
      //console.log('remove', el)
      var parent = el.parent;

      if (parent) {
        parent.removeChild(el);
      }
    },
    // ????????????????????????
    parentNode: function parentNode(el) {
      //console.log('parentNode', el)
      return el.parent;
    },
    // ???????????????????????????
    nextSibling: function nextSibling(el) {
      //console.log('nextSibling', el)
      if (!el.parent) {
        return null;
      }

      var index = el.parent.getChildIndex(el);
      var len = el.parent.children.length;
      var sibling = index >= len - 1 || index < 0 ? null : el.parent.getChildAt(index + 1);
      return sibling;
    },
    // ??????props?????????
    patchProp: function patchProp$1(el, key, prevValue, nextValue) {
      // console.log('patchProp', el, key, prevValue, nextValue)
      patchProp(el, key, prevValue, nextValue);
    },
    // ???????????????????????????
    createText: function createText(text) {
      //console.log('createText', text)
      return new Text(text);
    },
    // ?????????????????????
    createComment: function createComment(text) {
      //console.log('createComment', text)
      var el = new Container();
      el.name = text;
      return el;
    }
  }); // ??????????????????????????????

  var _createApp = renderer.createApp.bind(renderer);
  /**
   * ???????????????????????????????????????????????????
   * @param {Object} component ????????????
   */


  renderer.createApp = function (component) {
    var app = _createApp(component); // ???????????????????????????


    bindDirectives(game, app);
    return app;
  };

  return renderer;
}

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(setPrototypeOf);

var inherits = createCommonjsModule(function (module) {
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _inherits = unwrapExports(inherits);

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(_typeof_1);

var assertThisInitialized = createCommonjsModule(function (module) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(assertThisInitialized);

var possibleConstructorReturn = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];



function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _getPrototypeOf = unwrapExports(getPrototypeOf);

var Reactivity = function Reactivity() {
  _classCallCheck(this, Reactivity);

  return reactive(this);
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GameTemplate = /*#__PURE__*/function (_Reactivity) {
  _inherits(GameTemplate, _Reactivity);

  var _super = _createSuper(GameTemplate);

  function GameTemplate() {
    var _this;

    _classCallCheck(this, GameTemplate);

    _this = _super.call(this);
    _this.name = '';
    _this.el = null;
    _this.style = {};
    return _this;
  } // ??????dom???????????????


  _createClass(GameTemplate, [{
    key: "set",
    value: function set(el, style) {
      this.setElement(el);
      this.setStyle(style);
    } // ??????dom

  }, {
    key: "setElement",
    value: function setElement(el) {
      if (Validator.isObject(el)) {
        this.el = el;
      }
    } // ??????????????????

  }, {
    key: "setStyle",
    value: function setStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Validator.isObject(style)) {
        this.style = style;
      }
    } // ??????????????????

  }, {
    key: "mergeStyle",
    value: function mergeStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Validator.isObject(style)) {
        Object.assign(this.style, style);
      }
    } // ????????????

  }, {
    key: "setSize",
    value: function setSize(w, h) {
      var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'px';
      this.style.width = "".concat(w).concat(unit);
      this.style.height = "".concat(h).concat(unit);
    } // ??????????????????????????????

  }, {
    key: "getSizeNum",
    value: function getSizeNum() {
      var _this$style = this.style,
          width = _this$style.width,
          height = _this$style.height;

      if (Validator.isString(width)) {
        width = width.replace(/px|vw|vh|%|rem|em/, '');
      }

      if (Validator.isString(height)) {
        height = height.replace(/px|vw|vh|%|rem|em/, '');
      }

      return {
        width: Number(width),
        height: Number(height)
      };
    } // ??????????????????

  }, {
    key: "setScale",
    value: function setScale(ratioX) {
      var ratioY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (ratioY === null) {
        ratioY = ratioX;
      }

      if (!Validator.isValidNum(ratioX) || !Validator.isValidNum(ratioY)) {
        return;
      }

      var tempTransform = this.style.transform;

      if (tempTransform.indexOf('scale') >= 0) {
        tempTransform = tempTransform.replace(/scale\((.*?)\)/i, "scale(".concat(ratioX, ", ").concat(ratioY, ")"));
        this.style.transform = tempTransform;
      } else {
        this.style.transform = tempTransform + " scale(".concat(ratioX, ", ").concat(ratioY, ")");
      }
    } // ??????????????????

  }, {
    key: "setRotate",
    value: function setRotate(angle) {
      if (!Validator.isValidNum(angle)) {
        return;
      }

      var tempTransform = this.style.transform;

      if (tempTransform.indexOf('rotate') >= 0) {
        tempTransform = tempTransform.replace(/rotate\((.*?)\)/i, "rotate(".concat(angle, "deg)"));
        this.style.transform = tempTransform;
      } else {
        this.style.transform = tempTransform + " rotate(".concat(angle, "deg)");
      }
    }
  }]);

  return GameTemplate;
}(Reactivity);

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 10:00:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-01-29 10:01:33
 */
// ??????Game???????????????????????????
var common = {
  // ?????????????????????
  CLASSNAME: {
    wrapper: 'game-wrapper',
    canvas: 'game-canvas'
  },
  // ?????????????????????????????????
  SCREEN_HANDLER_NAME: {
    landscape: 'onScreenLandscape',
    portrait: 'onScreenPortrait'
  },
  // ????????????????????????????????????
  LIFECYCLE_HANDLER_NAME: {
    load: 'onLoad'
  },
  // ??????????????????
  _getDefaultStyle: function _getDefaultStyle() {
    return {
      // ?????????????????????????????????????????????
      wrapper: {
        position: 'relative',
        textAlign: 'center',
        height: '100%',
        width: '100%'
      },
      // canvas????????????
      canvas: {
        position: 'absolute',
        margin: '0 auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    };
  },
  // ???????????????????????????
  isMobile: function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  },
  // ?????????????????????handler??????????????????????????????????????????wait
  throttle: function throttle() {
    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var wait = arguments.length > 1 ? arguments[1] : undefined;
    var lastTime = 0;
    return function () {
      var nowTime = new Date().getTime();

      if (nowTime - lastTime > wait) {
        handler.apply(this, arguments);
        lastTime = nowTime;
      }
    };
  },
  // ?????????????????????handler???????????????????????????????????????????????????????????????????????????
  debounce: function debounce() {
    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var delay = arguments.length > 1 ? arguments[1] : undefined;
    var timer;
    return function () {
      var _this = this;

      var arg = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        handler.apply(_this, arg);
      }, delay);
    };
  }
};

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 10:00:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-01 10:59:17
 */

var getDefaultOptions = function getDefaultOptions() {
  return {
    // ?????????????????? canvas???????????????
    width: 1280,
    height: 720,
    // ????????????pixi-projection??????
    pixiProjection: false,
    // pixiJS?????????????????????????????????
    pixiOptions: {}
  };
};

var defaultOptions = getDefaultOptions(); // ???????????????????????????

var gameOptionsValidator = new Validator('gameOptionsValidator', {
  width: {
    type: Number,
    valid: function valid(value) {
      return Validator.isValidNum(value) && value > 0;
    },
    "default": defaultOptions.width
  },
  height: {
    type: Number,
    valid: function valid(value) {
      return Validator.isValidNum(value) && value > 0;
    },
    "default": defaultOptions.height
  },
  pixiProjection: {
    type: Boolean,
    "default": defaultOptions.pixiProjection
  },
  pixiOptions: {
    type: Object,
    "default": function _default() {
      return {};
    }
  }
});

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 10:00:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-01 11:39:14
 */
var script = {
  name: 'VueGame',
  setup: function setup() {
    // ?????????????????????dom?????????
    var wrapper = ref(null);
    var className = common.CLASSNAME; // ??????????????????

    var game = inject('game');
    onMounted(function () {
      game.mountVue(wrapper.value);
      game.createApp();
    });
    onMounted(function () {
      // ??????????????????
      game.initScreenFix();
    });
    onBeforeUnmount(function () {
      // ??????????????????
      game.clearScreenFix();
    });
    return {
      className: className,
      wrapper: wrapper,
      template: game.$template
    };
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    id: _ctx.className.wrapper,
    ref: "wrapper",
    style: _ctx.template.wrapper.style
  }, [createVNode("canvas", {
    id: _ctx.className.canvas,
    style: _ctx.template.canvas.style
  }, null, 12, ["id"])], 12, ["id"]);
}

script.render = render;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Game = /*#__PURE__*/function () {
  // @section ????????????????????????
  // ??????????????????
  // ???????????????????????????????????? game.$data.xxx = xxx
  // ??????Dom????????????
  // ?????????????????????
  // PIXI Application??????
  // PIXI ???????????????
  function Game() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Game);

    _defineProperty(this, "$options", getDefaultOptions());

    _defineProperty(this, "$data", {});

    _defineProperty(this, "$template", {});

    _defineProperty(this, "$event", new Event());

    _defineProperty(this, "$app", null);

    _defineProperty(this, "$renderer", null);

    // ???????????????????????????
    if (Validator.isObject(options)) {
      Object.assign(this.$options, options);
    } // ??????????????????


    gameOptionsValidator.mount(this.$options); // ?????????PIXI??????

    this._initPixiPlugins(); // ????????????????????????dom?????????


    this._initTemplate();
  } // ?????????PIXI??????


  _createClass(Game, [{
    key: "_initPixiPlugins",
    value: function _initPixiPlugins() {
      if (!Game.PLUGINS.projections) {
        // ??????pixi-projection
        registerProjection(Renderer);
        Game.PLUGINS.projections = true;
      }
    } // ????????????????????????dom?????????

  }, {
    key: "_initTemplate",
    value: function _initTemplate() {
      // ???????????????
      var styles = Game._getDefaultStyle(); // ????????????


      this.$template.wrapper = new GameTemplate('wrapper');
      this.$template.wrapper.setStyle(styles.wrapper); // canvas??????

      this.$template.canvas = new GameTemplate('canvas');
      this.$template.canvas.setStyle(styles.canvas);
    } // ???????????????dom???????????????miniGame???true??????????????????

  }, {
    key: "mount",
    value: function mount() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var el = document.querySelector(selector);

      if (!el) {
        el = document.body;
      }

      var app = createApp(script); // ???game?????????????????????????????????Vue???????????????????????????????????????

      app.provide('game', this); // ??????????????????dom

      app.mount(el);
      return this;
    } // ???Vue???????????????????????????????????????????????????

  }, {
    key: "mountVue",
    value: function mountVue(wrapper) {
      // ????????????
      this.$template.wrapper.setElement(wrapper); // canvas

      var canvas = this.$template.wrapper.el.querySelector('#' + Game.CLASSNAME.canvas);
      this.$template.canvas.setElement(canvas); // ????????????????????????canvas????????????

      this.$template.canvas.setSize(this.$options.width, this.$options.height);
      return this;
    } // ??????PIXI????????????startTemplate??????????????????pixiRootContainer??????????????????warn????????????????????????????????????

  }, {
    key: "pixiRender",
    value: function pixiRender(startTemplate) {
      var pixiRootContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var warn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.$renderer) {
        this.$renderer = getPIXIRenderer(this);
      }

      if (!pixiRootContainer) {
        pixiRootContainer = this.$app.stage;
      }

      var app = this.$renderer.createApp(startTemplate); // ???game??????????????????????????????????????????

      app.provide('game', this);

      if (!warn) {
        // ?????????????????????????????????
        app.config.warnHandler = function (msg, vm, trace) {// console.log(msg, vm, trace)
        };
      } // ????????????????????????


      app.mount(pixiRootContainer);
      return this;
    } // ??????PIXI????????????

  }, {
    key: "createApp",
    value: function createApp() {
      if (!this.$template.canvas.el) {
        console.error('App can only be created after canvas has completed!');
        return;
      } // ??????PIXI.Application


      this.$app = new Application(_objectSpread({
        width: this.$options.width,
        height: this.$options.height,
        view: this.$template.canvas.el
      }, this.$options.pixiOptions)); // APP??????????????????Game???????????????????????????onLoad????????????

      this.$event.emit(Game.LIFECYCLE_HANDLER_NAME.load);
      return this;
    }
    /* @section ?????????????????????????????? */
    // ????????????????????????????????????????????????

  }, {
    key: "onLoad",
    value: function onLoad() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.LIFECYCLE_HANDLER_NAME.load, handler);
      return this;
    }
    /* @section ???????????? */
    // ??????????????????

  }, {
    key: "onLandscape",
    value: function onLandscape() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.SCREEN_HANDLER_NAME.landscape, handler);

      if (Validator.isFunction(this.$resizeHandler)) {
        // ??????????????????????????????
        this.$resizeHandler();
      }

      return this;
    } // ??????????????????

  }, {
    key: "onPortrait",
    value: function onPortrait() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.SCREEN_HANDLER_NAME.portrait, handler);

      if (Validator.isFunction(this.$resizeHandler)) {
        // ??????????????????????????????
        this.$resizeHandler();
      }

      return this;
    } // ??????????????????

  }, {
    key: "initScreenFix",
    value: function initScreenFix() {
      this.$resizeHandler = this._resizeHandler.bind(this);
      this.$resizeHandler();
      window.addEventListener('resize', this.$resizeHandler);
    } // ??????????????????

  }, {
    key: "clearScreenFix",
    value: function clearScreenFix() {
      this.$event.off(Game.SCREEN_HANDLER_NAME.landscape);
      this.$event.off(Game.SCREEN_HANDLER_NAME.portrait);
      window.removeEventListener('resize', this.$resizeHandler);
    } // ????????????????????????

  }, {
    key: "_resizeHandler",
    value: function _resizeHandler() {
      var _this$$template$wrapp = this.$template.wrapper.el,
          offsetWidth = _this$$template$wrapp.offsetWidth,
          offsetHeight = _this$$template$wrapp.offsetHeight; // console.log(offsetWidth, offsetHeight)

      if (offsetWidth >= offsetHeight) {
        // ???????????????????????????
        this.$event.emit(Game.SCREEN_HANDLER_NAME.landscape);
      } else {
        // ???????????????????????????
        this.$event.emit(Game.SCREEN_HANDLER_NAME.portrait);
      }
    } // ??????????????????????????????????????????canvas????????????90???

  }, {
    key: "rotateStage",
    value: function rotateStage() {
      var _this$$options = this.$options,
          width = _this$$options.width,
          height = _this$$options.height;
      this.$template.canvas.setSize(height, width); // ????????????????????????

      var _this$$app = this.$app,
          stage = _this$$app.stage,
          renderer = _this$$app.renderer;
      stage.rotation = Math.PI / 2;
      stage.x = height; // ???????????????????????????

      renderer.resize(height, width);
    } // canvas????????????

  }, {
    key: "resetStage",
    value: function resetStage() {
      var _this$$options2 = this.$options,
          width = _this$$options2.width,
          height = _this$$options2.height;
      this.$template.canvas.setSize(width, height); // ????????????????????????

      var _this$$app2 = this.$app,
          stage = _this$$app2.stage,
          renderer = _this$$app2.renderer;
      stage.rotation = 0;
      stage.x = 0; // ???????????????????????????

      renderer.resize(width, height);
    } // ?????????wrapper???????????????????????????canvas??????????????????????????????????????????

  }, {
    key: "fixHeight",
    value: function fixHeight() {
      // ?????????????????????
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var _this$$template$canva = this.$template.canvas.getSizeNum(),
          width = _this$$template$canva.width,
          height = _this$$template$canva.height;

      var wrapper = this.$template.wrapper.el; // ??????????????????????????????????????????????????????

      var targetHeight = wrapper.offsetHeight > innerHeight ? innerHeight : wrapper.offsetHeight;
      var ratio = targetHeight / height;
      var targetWidth = ratio * width; // console.log(targetWidth, targetHeight)

      if (targetWidth > innerWidth) {
        // ?????????????????????????????????????????????????????????
        targetWidth = innerWidth;
        ratio = targetWidth / width;
      } // ????????????


      this.$template.canvas.setScale(ratio);
    } // ?????????wrapper???????????????????????????canvas??????????????????????????????????????????

  }, {
    key: "fixWidth",
    value: function fixWidth() {
      // ?????????????????????
      var _window2 = window,
          innerWidth = _window2.innerWidth,
          innerHeight = _window2.innerHeight;

      var _this$$template$canva2 = this.$template.canvas.getSizeNum(),
          width = _this$$template$canva2.width,
          height = _this$$template$canva2.height;

      var wrapper = this.$template.wrapper.el; // ??????????????????????????????????????????????????????

      var targetWidth = wrapper.offsetWidth > innerWidth ? innerWidth : wrapper.offsetWidth;
      var ratio = targetWidth / width;
      var targetHeight = ratio * height; // console.log(targetWidth, targetHeight)

      if (targetHeight > innerHeight) {
        // ?????????????????????????????????????????????????????????
        targetHeight = innerHeight;
        ratio = targetHeight / height;
      } // ????????????


      this.$template.canvas.setScale(ratio);
    } // ??????canvas????????????????????????????????????

  }, {
    key: "fixFull",
    value: function fixFull() {
      // ?????????????????????
      var _window3 = window,
          innerWidth = _window3.innerWidth,
          innerHeight = _window3.innerHeight;

      var _this$$template$canva3 = this.$template.canvas.getSizeNum(),
          width = _this$$template$canva3.width,
          height = _this$$template$canva3.height;

      var wrapper = this.$template.wrapper.el;
      var targetWidth = wrapper.offsetWidth > innerWidth ? innerWidth : wrapper.offsetWidth;
      var targetHeight = wrapper.offsetHeight > innerHeight ? innerHeight : wrapper.offsetHeight;
      var ratioX = targetWidth / width;
      var ratioY = targetHeight / height; // ????????????

      this.$template.canvas.setScale(ratioX, ratioY);
    }
  }]);

  return Game;
}(); // ??????????????????


_defineProperty(Game, "PLUGINS", {
  // pixi-projections
  projections: false
});

Object.assign(Game, common);
Game.optionsValidator = gameOptionsValidator;

export { Game, Reactivity, getPIXIRenderer };
