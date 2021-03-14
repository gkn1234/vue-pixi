/*!
 * @cmgl/pixi-gesture - v1.0.5
 *
 * @cmgl/pixi-gesture is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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

var _assertThisInitialized = unwrapExports(assertThisInitialized);

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

var superPropBase = createCommonjsModule(function (module) {
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(superPropBase);

var get = createCommonjsModule(function (module) {
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _get = unwrapExports(get);

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

var _typeof = unwrapExports(_typeof_1);

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
 * @Date: 2021-03-08 11:12:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 18:36:14
 */
var GESTURE_NAME = {
  // 初始化
  start: 'start',
  // 基本事件
  over: 'over',
  out: 'out',
  down: 'down',
  up: 'up',
  upOut: 'upOut',
  move: 'move',
  // 在内部移动
  moveIn: 'moveIn',
  // 在内部滑动(按住鼠标)
  slideIn: 'slideIn',
  // 拖拽事件
  dragStart: 'dragStart',
  dragEnd: 'dragEnd',
  dragMoveBefore: 'dragMoveBefore',
  dragMove: 'dragMove'
};

var Gesture = /*#__PURE__*/function () {
  // 手势基本属性
  // 手势对象
  // 当前触发的事件名称
  // 当前触发事件原始对象
  // 是否激活
  // 手势特殊信号
  // 是否在对象范围内
  // 是否在对象范围内按住鼠标
  // 各种手势事件触发

  /**
   * 各种手势事件回调：on + 大驼峰事件名
   * 任何手势事件的回调(泛用回调)：onGesture
   * 此处不进行显式定义
   */

  /**
   * 最基本的手势对象
   * @param {PIXI.DisplayObject} target 手势对象作用目标
   * @param {Object<Function>} callbacks 回调函数集合，每一个key必须为有效的手势回调：on + 大驼峰事件名
   */
  function Gesture(target) {
    var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Gesture);

    _defineProperty(this, "target", null);

    _defineProperty(this, "name", GESTURE_NAME.none);

    _defineProperty(this, "e", null);

    _defineProperty(this, "isActive", false);

    _defineProperty(this, "_isInside", false);

    _defineProperty(this, "_isDownInside", false);

    _defineProperty(this, "_overHandler", null);

    _defineProperty(this, "_outHandler", null);

    _defineProperty(this, "_downHandler", null);

    _defineProperty(this, "_upHandler", null);

    _defineProperty(this, "_upOutHandler", null);

    _defineProperty(this, "_moveHandler", null);

    this.target = target; // 初始化回调函数

    this._initCallbacks(callbacks); // 绑定手势


    this.active();
  } // 初始化回调函数


  _createClass(Gesture, [{
    key: "_initCallbacks",
    value: function _initCallbacks() {
      var callbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!callbacks || _typeof(callbacks) !== 'object') {
        return;
      }

      for (var key in callbacks) {
        if (key.match(/on[A-Z]\w*/)) {
          // 符合规则的回调名称
          this[key] = callbacks[key];
        } else {
          console.error("Callback key ".concat(key, " is invalid!"));
        }
      }
    } // 绑定所有手势对象

  }, {
    key: "active",
    value: function active() {
      // 避免重复绑定
      if (this.isActive) {
        return;
      }

      this.isActive = true;
      this.target.interactive = true;
      this._overHandler = this.overHandler.bind(this);
      this._outHandler = this.outHandler.bind(this);
      this._downHandler = this.downHandler.bind(this);
      this._upHandler = this.upHandler.bind(this);
      this._upOutHandler = this.upOutHandler.bind(this);
      this._moveHandler = this.moveHandler.bind(this);
      this.target.on('pointerover', this._overHandler);
      this.target.on('pointerout', this._outHandler);
      this.target.on('pointerdown', this._downHandler);
      this.target.on('pointerup', this._upHandler);
      this.target.on('pointerupoutside', this._upOutHandler);
      this.target.on('pointermove', this._moveHandler); // 立即触发一次

      this.trigger(GESTURE_NAME.start);
    } // 解绑所有手势对象

  }, {
    key: "release",
    value: function release() {
      if (!this.isActive) {
        return;
      }

      this.target.off('pointerover', this._overHandler);
      this.target.off('pointerout', this._outHandler);
      this.target.off('pointerdown', this._downHandler);
      this.target.off('pointerup', this._upHandler);
      this.target.off('pointerupoutside', this._upOutHandler);
      this.target.off('pointermove', this._moveHandler);
      this.isActive = false;
    } // 触发手势事件

  }, {
    key: "trigger",
    value: function trigger(name, e) {
      if (!this.isActive) {
        return;
      } // 更新事件名和原始事件对象


      this.name = name;
      this.e = e ? e : this.e; // 返回结果

      var res = undefined; // 触发泛用的回调函数

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (typeof this.onGesture === 'function') {
        res = this.onGesture.apply(this, [this].concat(args));
      } // on + 大驼峰事件名，构成回调函数名称


      var callbackName = 'on' + name.slice(0, 1).toUpperCase + name.slice(1); // 触发专门的回调函数，专门回调函数的返回值在非undefined(有返回值)的情况下会覆盖泛用函数的返回值，作为真正的返回结果

      if (typeof this[callbackName] === 'function') {
        var callbackRes = this[callbackName].apply(this, [this].concat(args));

        if (callbackRes !== undefined) {
          res = callbackRes;
        }
      }

      return res;
    }
  }, {
    key: "overHandler",
    value: function overHandler(e) {
      this._isInside = true;
      this.trigger(GESTURE_NAME.over, e);
    }
  }, {
    key: "outHandler",
    value: function outHandler(e) {
      this._isInside = false;
      this.trigger(GESTURE_NAME.out, e);
    }
  }, {
    key: "downHandler",
    value: function downHandler(e) {
      this._isDownInside = true;
      this.trigger(GESTURE_NAME.down, e);
    }
  }, {
    key: "upHandler",
    value: function upHandler(e) {
      this._isDownInside = false;
      this.trigger(GESTURE_NAME.up, e);
    }
  }, {
    key: "upOutHandler",
    value: function upOutHandler(e) {
      this._isInside = false;
      this._isDownInside = false;
      this.trigger(GESTURE_NAME.upOut, e);
    }
  }, {
    key: "moveHandler",
    value: function moveHandler(e) {
      this.trigger(GESTURE_NAME.move, e);

      if (this._isInside) {
        this.trigger(GESTURE_NAME.moveIn, e);

        if (this._isDownInside) {
          this.trigger(GESTURE_NAME.slideIn, e);
        }
      }
    }
    /**
     * 将目标世界绝对坐标转换为相对坐标
     */

  }, {
    key: "resolveGlobalPos",
    value: function resolveGlobalPos(pos) {
      var relativeEl = this.target.parent ? this.target.parent : this.target;
      return relativeEl.toLocal(pos);
    }
  }]);

  return Gesture;
}();

Gesture.GESTURE_NAME = GESTURE_NAME;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Drag = /*#__PURE__*/function (_Gesture) {
  _inherits(Drag, _Gesture);

  var _super = _createSuper(Drag);

  // 当前的手势id
  // 上一次拖拽时的坐标
  function Drag(target, callbacks) {
    var _this;

    _classCallCheck(this, Drag);

    _this = _super.call(this, target, callbacks);

    _defineProperty(_assertThisInitialized(_this), "_id", null);

    _defineProperty(_assertThisInitialized(_this), "_dragPrevPos", null);

    return _this;
  }
  /**
   * @override
   */


  _createClass(Drag, [{
    key: "downHandler",
    value: function downHandler(e) {
      _get(_getPrototypeOf(Drag.prototype), "downHandler", this).call(this, e);

      this._id = e.data.identifier;
      this._dragPrevPos = this.resolveGlobalPos(e.data.global);
      this.trigger(GESTURE_NAME.dragStart, e);
    }
    /**
     * @override
     */

  }, {
    key: "upHandler",
    value: function upHandler(e) {
      _get(_getPrototypeOf(Drag.prototype), "upHandler", this).call(this, e);

      this._stopDrag(e);
    }
    /**
     * @override
     */

  }, {
    key: "upOutHandler",
    value: function upOutHandler(e) {
      _get(_getPrototypeOf(Drag.prototype), "upOutHandler", this).call(this, e);

      this._stopDrag(e);
    }
    /**
     * @override
     */

  }, {
    key: "moveHandler",
    value: function moveHandler(e) {
      _get(_getPrototypeOf(Drag.prototype), "moveHandler", this).call(this, e); // 避免多点触控对拖拽的干扰


      if (e.data.identifier !== this._id) {
        return;
      } // 计算移动量


      var pos = this.resolveGlobalPos(e.data.global);
      var dx = pos.x - this._dragPrevPos.x;
      var dy = pos.y - this._dragPrevPos.y; // 在真正执行移动前，触发dragMoveBefore拦截事件

      var res = this.trigger(GESTURE_NAME.dragMoveBefore, e, {
        dx: dx,
        dy: dy
      }); // 当dragMoveBefore事件的回调返回false或者null，代表拖拽拦截，不对拖拽坐标进行更新

      if (res === false || res === null) {
        return;
      } // 拦截事件后如果没有进行阻断，进行按照预期移动目标


      this.move(dx, dy);
    }
    /**
     * 移动目标
     */

  }, {
    key: "move",
    value: function move(dx, dy) {
      // 移动目标
      this.target.x += dx;
      this.target.y += dy; // 及时更新上一次触发事件的坐标

      this._dragPrevPos.x += dx;
      this._dragPrevPos.y += dy;
      this.trigger(GESTURE_NAME.dragMove);
    } // 停止

  }, {
    key: "_stopDrag",
    value: function _stopDrag(e) {
      if (e.data.identifier === this._id) {
        this._id = null;
        this.trigger(GESTURE_NAME.dragEnd, e);
      }
    }
  }]);

  return Drag;
}(Gesture);

export { Drag, GESTURE_NAME, Gesture };
