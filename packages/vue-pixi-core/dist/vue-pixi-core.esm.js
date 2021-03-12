/*!
 * @cmgl/vue-pixi-core - v1.0.5
 *
 * @cmgl/vue-pixi-core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35732/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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
    // pixi-projection里面的元素
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

var transformKey = ['scale', 'skew', 'anchor', 'pivot']; // 解析分X、Y方向的尺寸

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
    // 处理属性是否为texture纹理
    if (nextValue instanceof Texture) {
      el[key] = nextValue;
    } else {
      // 可以识别字符串，转变成纹理对象
      el[key] = Texture.from(nextValue);
    }

    return;
  } // 处理几种特殊的变化属性scale\skew\anchor\pivot


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
  var ticker = game.$app.ticker; // 缓存每一个节点的触发器

  var cache = new WeakMap();
  return {
    mounted: function mounted(el, binding) {
      console.log('ticker-mounted', el, binding, ticker);
      var handlerObj = cache.get(el); // 避免对同一个对象多次重复绑定

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
  // 缓存每一个节点的拖拽控制
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
        // 解绑所有事件
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
  // 缓存每一个节点的拖拽控制
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
        // 解绑所有事件
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
 * 绑定指令
 * @param {Game} game 游戏对象 
 * @param {Object} app Vue实例对象 
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
    // 创建一个元素
    createElement: function createElement(type) {
      //console.log('createElement', type)
      var createElement = getCreateElement();
      return createElement(type);
    },
    // 插入到对应的容器
    insert: function insert(el, parent) {
      //console.log('insert', el, parent)
      parent.addChild(el);
    },
    // 从容器中删除元素
    remove: function remove(el) {
      //console.log('remove', el)
      var parent = el.parent;

      if (parent) {
        parent.removeChild(el);
      }
    },
    // 查找父元素的方法
    parentNode: function parentNode(el) {
      //console.log('parentNode', el)
      return el.parent;
    },
    // 查找兄弟元素的方法
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
    // 传递props的行为
    patchProp: function patchProp$1(el, key, prevValue, nextValue) {
      // console.log('patchProp', el, key, prevValue, nextValue)
      patchProp(el, key, prevValue, nextValue);
    },
    // 创建文字节点的方法
    createText: function createText(text) {
      //console.log('createText', text)
      return new Text(text);
    },
    // 创建注释的方法
    createComment: function createComment(text) {
      //console.log('createComment', text)
      var el = new Container();
      el.name = text;
      return el;
    }
  }); // 临时保存创建启动方法

  var _createApp = renderer.createApp.bind(renderer);
  /**
   * 重写启动方法，在启动后做更多的处理
   * @param {Object} component 组件模板
   */


  renderer.createApp = function (component) {
    var app = _createApp(component); // 更多处理，处理指令


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
  } // 设定dom对象和样式


  _createClass(GameTemplate, [{
    key: "set",
    value: function set(el, style) {
      this.setElement(el);
      this.setStyle(style);
    } // 设置dom

  }, {
    key: "setElement",
    value: function setElement(el) {
      if (Validator.isObject(el)) {
        this.el = el;
      }
    } // 设置样式对象

  }, {
    key: "setStyle",
    value: function setStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Validator.isObject(style)) {
        this.style = style;
      }
    } // 合并样式对象

  }, {
    key: "mergeStyle",
    value: function mergeStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Validator.isObject(style)) {
        Object.assign(this.style, style);
      }
    } // 设置宽高

  }, {
    key: "setSize",
    value: function setSize(w, h) {
      var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'px';
      this.style.width = "".concat(w).concat(unit);
      this.style.height = "".concat(h).concat(unit);
    } // 去掉单位获取宽高数字

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
    } // 设置缩放比例

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
    } // 设置旋转角度

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
// 定义Game类的静态方法和变量
var common = {
  // 各种容器的类名
  CLASSNAME: {
    wrapper: 'game-wrapper',
    canvas: 'game-canvas'
  },
  // 枚举，横纵屏触发函数名
  SCREEN_HANDLER_NAME: {
    landscape: 'onScreenLandscape',
    portrait: 'onScreenPortrait'
  },
  // 枚举，游戏的生命周期名称
  LIFECYCLE_HANDLER_NAME: {
    load: 'onLoad'
  },
  // 获取基本样式
  _getDefaultStyle: function _getDefaultStyle() {
    return {
      // 外层容器样式，一般情况下不会变
      wrapper: {
        position: 'relative',
        textAlign: 'center',
        height: '100%',
        width: '100%'
      },
      // canvas画布样式
      canvas: {
        position: 'absolute',
        margin: '0 auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    };
  },
  // 判断是否为移动设备
  isMobile: function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  },
  // 节流函数，使得handler函数每次执行都必须有一个间隔wait
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
  // 防抖函数，使得handler函数将被延迟执行，无论触发的速度有多快，适用于输入
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
    // 游戏渲染区域 canvas的设计宽高
    width: 1280,
    height: 720,
    // 是否引入pixi-projection插件
    pixiProjection: false,
    // pixiJS除了宽高以外的额外配置
    pixiOptions: {}
  };
};

var defaultOptions = getDefaultOptions(); // 游戏配置参数校验器

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
    // 获取重要容器的dom和类名
    var wrapper = ref(null);
    var className = common.CLASSNAME; // 获取游戏对象

    var game = inject('game');
    onMounted(function () {
      game.mountVue(wrapper.value);
      game.createApp();
    });
    onMounted(function () {
      // 启动屏幕适配
      game.initScreenFix();
    });
    onBeforeUnmount(function () {
      // 解除屏幕适配
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
  }, null, 12
  /* STYLE, PROPS */
  , ["id"])], 12
  /* STYLE, PROPS */
  , ["id"]);
}

script.render = render;
script.__file = "packages/vue-pixi-core/src/Game/VueGame.vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Game = /*#__PURE__*/function () {
  // @section 插件注册情况相关
  // 游戏参数配置
  // 用于挂载游戏全局数据，如 game.$data.xxx = xxx
  // 游戏Dom容器对象
  // 对象的事件总线
  // PIXI Application对象
  // PIXI 渲染器对象
  function Game() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Game);

    _defineProperty(this, "$options", getDefaultOptions());

    _defineProperty(this, "$data", {});

    _defineProperty(this, "$template", {});

    _defineProperty(this, "$event", new Event());

    _defineProperty(this, "$app", null);

    _defineProperty(this, "$renderer", null);

    // 初始化游戏参数配置
    if (Validator.isObject(options)) {
      Object.assign(this.$options, options);
    } // 校验参数配置


    gameOptionsValidator.mount(this.$options); // 初始化PIXI插件

    this._initPixiPlugins(); // 初始化元素模板、dom、样式


    this._initTemplate();
  } // 初始化PIXI插件


  _createClass(Game, [{
    key: "_initPixiPlugins",
    value: function _initPixiPlugins() {
      if (!Game.PLUGINS.projections) {
        // 注册pixi-projection
        registerProjection(Renderer);
        Game.PLUGINS.projections = true;
      }
    } // 初始化元素模板、dom、样式

  }, {
    key: "_initTemplate",
    value: function _initTemplate() {
      // 初始化样式
      var styles = Game._getDefaultStyle(); // 外层容器


      this.$template.wrapper = new GameTemplate('wrapper');
      this.$template.wrapper.setStyle(styles.wrapper); // canvas画布

      this.$template.canvas = new GameTemplate('canvas');
      this.$template.canvas.setStyle(styles.canvas);
    } // 挂载到指定dom下，不支持miniGame为true的小游戏环境

  }, {
    key: "mount",
    value: function mount() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var el = document.querySelector(selector);

      if (!el) {
        el = document.body;
      }

      var app = createApp(script); // 将game对象作为全局变量注入给Vue模板，以便在模板中访问对象

      app.provide('game', this); // 绑定到指定的dom

      app.mount(el);
      return this;
    } // 在Vue组件的初始化的过程中中获取各个容器

  }, {
    key: "mountVue",
    value: function mountVue(wrapper) {
      // 外层容器
      this.$template.wrapper.setElement(wrapper); // canvas

      var canvas = this.$template.wrapper.el.querySelector('#' + Game.CLASSNAME.canvas);
      this.$template.canvas.setElement(canvas); // 所以这里要立即给canvas补充宽高

      this.$template.canvas.setSize(this.$options.width, this.$options.height);
      return this;
    } // 注入PIXI渲染器，startTemplate是起始模板，pixiRootContainer是渲染目标，warn指明是否在开发环境下警告

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

      var app = this.$renderer.createApp(startTemplate); // 将game对象作为全局变量注入给渲染器

      app.provide('game', this);

      if (!warn) {
        // 开发环境下取消警告信息
        app.config.warnHandler = function (msg, vm, trace) {// console.log(msg, vm, trace)
        };
      } // 渲染到对应的节点


      app.mount(pixiRootContainer);
      return this;
    } // 创建PIXI游戏应用

  }, {
    key: "createApp",
    value: function createApp() {
      if (!this.$template.canvas.el) {
        console.error('App can only be created after canvas has completed!');
        return;
      } // 创建PIXI.Application


      this.$app = new Application(_objectSpread({
        width: this.$options.width,
        height: this.$options.height,
        view: this.$template.canvas.el
      }, this.$options.pixiOptions)); // APP对象创建后，Game对象准备完成，触发onLoad生命周期

      this.$event.emit(Game.LIFECYCLE_HANDLER_NAME.load);
      return this;
    }
    /* @section 游戏生命周期事件指定 */
    // 指定游戏完全加载完成时触发的事件

  }, {
    key: "onLoad",
    value: function onLoad() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.LIFECYCLE_HANDLER_NAME.load, handler);
      return this;
    }
    /* @section 屏幕适配 */
    // 绑定横屏事件

  }, {
    key: "onLandscape",
    value: function onLandscape() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.SCREEN_HANDLER_NAME.landscape, handler);

      if (Validator.isFunction(this.$resizeHandler)) {
        // 绑定完后立即进行适配
        this.$resizeHandler();
      }

      return this;
    } // 绑定竖屏事件

  }, {
    key: "onPortrait",
    value: function onPortrait() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$event.on(Game.SCREEN_HANDLER_NAME.portrait, handler);

      if (Validator.isFunction(this.$resizeHandler)) {
        // 绑定完后立即进行适配
        this.$resizeHandler();
      }

      return this;
    } // 触发屏幕适配

  }, {
    key: "initScreenFix",
    value: function initScreenFix() {
      this.$resizeHandler = this._resizeHandler.bind(this);
      this.$resizeHandler();
      window.addEventListener('resize', this.$resizeHandler);
    } // 解除屏幕适配

  }, {
    key: "clearScreenFix",
    value: function clearScreenFix() {
      this.$event.off(Game.SCREEN_HANDLER_NAME.landscape);
      this.$event.off(Game.SCREEN_HANDLER_NAME.portrait);
      window.removeEventListener('resize', this.$resizeHandler);
    } // 屏幕尺寸变化触发

  }, {
    key: "_resizeHandler",
    value: function _resizeHandler() {
      var _this$$template$wrapp = this.$template.wrapper.el,
          offsetWidth = _this$$template$wrapp.offsetWidth,
          offsetHeight = _this$$template$wrapp.offsetHeight; // console.log(offsetWidth, offsetHeight)

      if (offsetWidth >= offsetHeight) {
        // 宽大于高，视为横屏
        this.$event.emit(Game.SCREEN_HANDLER_NAME.landscape);
      } else {
        // 宽小于高，视为纵屏
        this.$event.emit(Game.SCREEN_HANDLER_NAME.portrait);
      }
    } // 在不影响绑定事件的情况下，将canvas画布旋转90度

  }, {
    key: "rotateStage",
    value: function rotateStage() {
      var _this$$options = this.$options,
          width = _this$$options.width,
          height = _this$$options.height;
      this.$template.canvas.setSize(height, width); // 主舞台旋转重定位

      var _this$$app = this.$app,
          stage = _this$$app.stage,
          renderer = _this$$app.renderer;
      stage.rotation = Math.PI / 2;
      stage.x = height; // 重新设定渲染器尺寸

      renderer.resize(height, width);
    } // canvas画布复原

  }, {
    key: "resetStage",
    value: function resetStage() {
      var _this$$options2 = this.$options,
          width = _this$$options2.width,
          height = _this$$options2.height;
      this.$template.canvas.setSize(width, height); // 主舞台旋转重定位

      var _this$$app2 = this.$app,
          stage = _this$$app2.stage,
          renderer = _this$$app2.renderer;
      stage.rotation = 0;
      stage.x = 0; // 重新设定渲染器尺寸

      renderer.resize(width, height);
    } // 以容器wrapper的高度为基准，保持canvas画布比例不变的情况下顶满高度

  }, {
    key: "fixHeight",
    value: function fixHeight() {
      // 获取参照宽高度
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var _this$$template$canva = this.$template.canvas.getSizeNum(),
          width = _this$$template$canva.width,
          height = _this$$template$canva.height;

      var wrapper = this.$template.wrapper.el; // 优先根据容器宽度计算出目标宽度与比例

      var targetHeight = wrapper.offsetHeight > innerHeight ? innerHeight : wrapper.offsetHeight;
      var ratio = targetHeight / height;
      var targetWidth = ratio * width; // console.log(targetWidth, targetHeight)

      if (targetWidth > innerWidth) {
        // 宽度自适应后发现超出限制，重新计算比例
        targetWidth = innerWidth;
        ratio = targetWidth / width;
      } // 调整缩放


      this.$template.canvas.setScale(ratio);
    } // 以容器wrapper的宽度为基准，保持canvas画布比例不变的情况下顶满宽度

  }, {
    key: "fixWidth",
    value: function fixWidth() {
      // 获取参照宽高度
      var _window2 = window,
          innerWidth = _window2.innerWidth,
          innerHeight = _window2.innerHeight;

      var _this$$template$canva2 = this.$template.canvas.getSizeNum(),
          width = _this$$template$canva2.width,
          height = _this$$template$canva2.height;

      var wrapper = this.$template.wrapper.el; // 优先根据容器高度计算出目标高度与比例

      var targetWidth = wrapper.offsetWidth > innerWidth ? innerWidth : wrapper.offsetWidth;
      var ratio = targetWidth / width;
      var targetHeight = ratio * height; // console.log(targetWidth, targetHeight)

      if (targetHeight > innerHeight) {
        // 高度自适应后发现超出限制，重新计算比例
        targetHeight = innerHeight;
        ratio = targetHeight / height;
      } // 调整缩放


      this.$template.canvas.setScale(ratio);
    } // 无视canvas画布的比例变化，顶满容器

  }, {
    key: "fixFull",
    value: function fixFull() {
      // 获取参照宽高度
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
      var ratioY = targetHeight / height; // 调整缩放

      this.$template.canvas.setScale(ratioX, ratioY);
    }
  }]);

  return Game;
}(); // 绑定静态方法


_defineProperty(Game, "PLUGINS", {
  // pixi-projections
  projections: false
});

Object.assign(Game, common);
Game.optionsValidator = gameOptionsValidator;

export { Game, Reactivity, getPIXIRenderer };
//# sourceMappingURL=vue-pixi-core.esm.js.map
