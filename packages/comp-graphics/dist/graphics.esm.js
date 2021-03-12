/*!
 * @cmgl/graphics - v1.0.4
 *
 * @cmgl/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { Texture } from 'pixi.js';
import { ref, watchEffect, onBeforeUnmount, resolveComponent, openBlock, createBlock } from 'vue';

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
 * @LastEditTime: 2021-03-09 16:28:48
 */
function useGraphicsProps() {
  return {
    // 线的宽度
    lineWidth: {
      type: Number,
      "default": 0
    },
    // 线的颜色
    lineColor: {
      type: [String, Number],
      "default": 0
    },
    // 线的透明度
    lineAlpha: {
      type: Number,
      "default": 1
    },
    // 线段的填充纹理
    lineTexture: {
      type: Texture,
      "default": null
    },
    // 线段的对齐方式(0 = 内部，0.5 = 居中，1 = 外部)
    lineAlign: {
      type: Number,
      "default": 1
    },
    // 内部填充颜色
    fillColor: {
      type: [String, Number],
      "default": 0
    },
    // 内部填充透明度
    fillAlpha: {
      type: Number,
      "default": 1
    },
    // 内部填充纹理
    fillTexture: {
      type: Texture,
      "default": null
    }
  };
}
/**
 * 画图的基础方法
 */
// 指定线的样式

function lineStyle(target, width, color, texture, alpha, align) {
  // 根据color和texture的值确定是颜色填充还是纹理填充，texture不为null即为纹理填充
  if (texture && texture instanceof Texture) {
    target.lineTextureStyle({
      width: width,
      texture: texture,
      color: color,
      alpha: alpha,
      alignment: align
    });
  } else {
    target.lineStyle(width, color, alpha, align);
  }
} // 指定填充样式

function beginFill(target, color, texture, alpha) {
  // 根据color和texture的值确定是颜色填充还是纹理填充，texture不为null即为纹理填充
  if (texture && texture instanceof Texture) {
    target.beginTextureFill({
      texture: texture,
      color: color,
      alpha: alpha
    });
  } else {
    target.beginFill(color, alpha);
  }
}
/**
 * 图形组件都是检测到属性变化后，通过重绘实现，这里是在确定了不同的重绘方法后，实现重绘注册逻辑
 * @param {Function} draw 重写的画图方法，
 */

function useDraw(draw) {
  // 图形对象
  var graphicsObj = ref(null);
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
/**
 * function draw () {}
 * draw方法的参数说明
 * @param {PIXI.DisplayObject} target 有效的PIXI显示对象
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script = {
  name: 'Ellipse',
  props: _objectSpread(_objectSpread({}, useGraphicsProps()), {}, {
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
      lineStyle(target, props.lineWidth, props.lineColor, props.lineTexture, props.lineAlpha, props.lineAlign);
      beginFill(target, props.fillColor, props.fillTexture, props.fillAlpha);
      target.drawEllipse(0, 0, props.rw, props.rh); // 重绘触发事件

      emit('draw', target, props);
      target.endFill();
    } // 激活重绘


    var _useDraw = useDraw(draw),
        graphicsObj = _useDraw.graphicsObj;

    return {
      graphicsObj: graphicsObj
    };
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Graphics = resolveComponent("Graphics");

  return openBlock(), createBlock(_component_Graphics, {
    ref: "graphicsObj"
  }, null, 512);
}

script.render = render;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script$1 = {
  name: 'Rectangle',
  props: _objectSpread$1(_objectSpread$1({}, useGraphicsProps()), {}, {
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
      lineStyle(target, props.lineWidth, props.lineColor, props.lineTexture, props.lineAlpha, props.lineAlign);
      beginFill(target, props.fillColor, props.fillTexture, props.fillAlpha); // 根据圆角大小决定是画普通矩形或者圆角矩形

      target.drawRoundedRect(0, 0, props.w, props.h, props.radius); // 重绘触发事件

      emit('draw', target, props);
      target.endFill();
    } // 激活重绘


    var _useDraw = useDraw(draw),
        graphicsObj = _useDraw.graphicsObj;

    return {
      graphicsObj: graphicsObj
    };
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Graphics = resolveComponent("Graphics");

  return openBlock(), createBlock(_component_Graphics, {
    ref: "graphicsObj"
  }, null, 512);
}

script$1.render = render$1;

export { script as Ellipse, script$1 as Rectangle, beginFill, lineStyle, useDraw, useGraphicsProps };
