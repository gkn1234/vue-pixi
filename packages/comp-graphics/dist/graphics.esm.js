/*!
 * @cmgl/graphics - v1.0.5
 *
 * @cmgl/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35733/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import 'pixi.js';
import { shallowRef, watchEffect, onBeforeUnmount, resolveComponent, openBlock, createBlock } from 'vue';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
 * @Date: 2021-03-09 15:27:40
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-12 18:32:21
 */
/**
 * @attention Graphic只支持纯色方法，beginTextureFill和lineTextureStyle以及相关属性都不再支持。
 * 原因是PC端和移动端因为WEBGL内核的不同，表现不一致。
 * 以后Texture只能用Sprite进行显示
 */
// 边框线段属性

function useBorderProps() {
  return {
    // 线的宽度
    bdWidth: {
      type: Number,
      "default": 0
    },
    // 线的颜色
    bdColor: {
      type: [String, Number],
      "default": 0xffffff
    },
    // 线的透明度
    bdAlpha: {
      type: Number,
      "default": 1
    },
    // 线段的对齐方式(0 = 内部，0.5 = 居中，1 = 外部)
    bdAlign: {
      type: Number,
      "default": 1
    }
  };
} // 内部填充属性

function useBackgroundProps() {
  return {
    // 内部填充颜色
    bgColor: {
      type: [String, Number],
      "default": 0xffffff
    },
    // 内部填充透明度
    bgAlpha: {
      type: Number,
      "default": 1
    }
  };
} // 锚点属性

function useAnchorProps() {
  return {
    anchorX: {
      type: Number,
      "default": 0
    },
    anchorY: {
      type: Number,
      "default": 0
    }
  };
}
/**
 * 图形组件都是检测到属性变化后，通过重绘实现，这里是在确定了不同的重绘方法后，实现重绘注册逻辑
 * @param {Function} draw 重写的画图方法，
 */

function useDraw(draw) {
  /**
   * function draw () {}
   * draw方法的参数说明
   * @param {PIXI.DisplayObject} target 有效的PIXI显示对象
   */

  /**
   * 图形对象
   * 这里必须用shallowRef，因为Texture、Graphic都很重，有循环结构，用ref会让watchEffect进入循环地狱
   */
  var graphicsObj = shallowRef(null);
  watchEffect(function () {
    draw(graphicsObj.value);
  }); // 不再需要onMounted，因为当元素挂载后，graphicsObj.value的改变会再次触发watchEffect中的draw方法

  /*
  onMounted(() => {
    draw(graphicsObj.value)
  })
  */

  onBeforeUnmount(function () {
    // 请注意，由于图形可以与其他实例共享GraphicsGeometry。有必要调用destroy() 来正确地解除对底层GraphicsGeometry的引用并避免内存泄漏。或者，继续使用相同的Graphics实例，并在重绘之间调用 clear()。
    // 防止内存泄漏的操作
    graphicsObj.value.destroy();
  });
  return {
    graphicsObj: graphicsObj
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script = {
  name: 'Ellipse',
  props: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, useAnchorProps()), useBorderProps()), useBackgroundProps()), {}, {
    // 横向半径
    rw: {
      type: Number,
      "default": 50
    },
    // 纵向半径
    rh: {
      type: Number,
      "default": 50
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    // 重写draw重绘函数
    function draw(target) {
      if (!target) {
        return;
      }

      target.clear();
      target.lineStyle(props.bdWidth, props.bdColor, props.bdAlpha, props.bdAlign);
      target.beginFill(props.bgColor, props.bgAlpha);

      var _getStart = getStart(props),
          startX = _getStart.startX,
          startY = _getStart.startY;

      target.drawEllipse(startX, startY, props.rw, props.rh);
      target.endFill(); // 重绘触发事件

      emit('draw', target, props);
    } // 激活重绘


    var _useDraw = useDraw(draw),
        graphicsObj = _useDraw.graphicsObj;

    return {
      graphicsObj: graphicsObj
    };
  }
}; // 椭圆通过锚点计算绘画中心。椭圆的绘画中心默认在圆心

function getStart(props) {
  var startX = props.rw * (1 - props.anchorX * 2);
  var startY = props.rh * (1 - props.anchorY * 2);
  return {
    startX: startX,
    startY: startY
  };
}

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Graphics = resolveComponent("Graphics");

  return openBlock(), createBlock(_component_Graphics, {
    ref: "graphicsObj"
  }, null, 512
  /* NEED_PATCH */
  );
}

script.render = render;
script.__file = "packages/comp-graphics/src/graphics/Ellipse/Ellipse.vue";

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script$1 = {
  name: 'Rectangle',
  props: _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, useAnchorProps()), useBorderProps()), useBackgroundProps()), {}, {
    // 矩形的宽高，不仅仅是缩放效果，会引起面板重绘的真实宽高
    w: {
      type: Number,
      "default": 100
    },
    h: {
      type: Number,
      "default": 100
    },
    // 矩形的圆角
    radius: {
      type: Number,
      "default": 0
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    // 重写draw重绘函数
    function draw(target) {
      if (!target) {
        return;
      }

      target.clear();
      target.lineStyle(props.bdWidth, props.bdColor, props.bdAlpha, props.bdAlign);
      target.beginFill(props.bgColor, props.bgAlpha); // 根据圆角大小决定是画普通矩形或者圆角矩形

      var _getStart = getStart$1(props),
          startX = _getStart.startX,
          startY = _getStart.startY;

      target.drawRoundedRect(startX, startY, props.w, props.h, props.radius);
      target.endFill(); // 重绘触发事件

      emit('draw', target, props);
    } // 激活重绘


    var _useDraw = useDraw(draw),
        graphicsObj = _useDraw.graphicsObj;

    return {
      graphicsObj: graphicsObj
    };
  }
}; // 矩形通过锚点计算绘画中心。矩形的绘画中心默认在左上角

function getStart$1(props) {
  var startX = props.w * props.anchorX * -1;
  var startY = props.h * props.anchorY * -1;
  return {
    startX: startX,
    startY: startY
  };
}

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Graphics = resolveComponent("Graphics");

  return openBlock(), createBlock(_component_Graphics, {
    ref: "graphicsObj"
  }, null, 512
  /* NEED_PATCH */
  );
}

script$1.render = render$1;
script$1.__file = "packages/comp-graphics/src/graphics/Rectangle/Rectangle.vue";

export { script as Ellipse, script$1 as Rectangle, useAnchorProps, useBackgroundProps, useBorderProps, useDraw };
//# sourceMappingURL=graphics.esm.js.map
