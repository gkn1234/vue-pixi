/*!
 * @cmgl/button - v1.0.5
 *
 * @cmgl/button is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35736/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { Texture } from 'pixi.js';
import { useBorderProps, useBackgroundProps, Rectangle } from '@cmgl/graphics';
import { reactive, watchEffect, computed, resolveComponent, resolveDirective, withDirectives, openBlock, createBlock, withCtx, renderSlot, createCommentVNode, createVNode } from 'vue';
import { Tween } from '@cmgl/tween';

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useButtonProps() {
  return _objectSpread(_objectSpread(_objectSpread({
    // 按键宽度
    w: {
      type: Number,
      "default": 100
    },
    // 按键高度
    h: {
      type: Number,
      "default": 50
    },
    // 底部矩形配置相关
    // 是否显示底部矩形
    rec: {
      type: Boolean,
      "default": true
    }
  }, useBorderProps()), useBackgroundProps()), {}, {
    // 进度条矩形的圆角
    radius: {
      type: Number,
      "default": 0
    },
    // 中部Sprite的纹理
    bgTexture: {
      type: [String, Texture],
      "default": null
    },
    // 顶部Text配置相关
    // 文字
    text: {
      type: String,
      "default": ''
    },
    // 字号
    textSize: {
      type: Number,
      "default": 24
    },
    // 颜色
    textColor: {
      type: [Number, String, Array],
      "default": 0
    },
    // 其他样式配置
    textOptions: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    // 文字默认居中，offset设定偏移量，右正左负
    offsetX: {
      type: Number,
      "default": 0
    },
    offsetY: {
      type: Number,
      "default": 0
    }
  });
}
/**
 * 处理Button类别组件的文字
 * @param {VueProps} props 组件属性
 * @returns {Object} 按钮文字的样式对象
 */

function useButtonText(props) {
  var textStyle = reactive({}); // 初始化字体样式，后续动态更新

  watchEffect(function () {
    textStyle.fill = props.textColor;
    textStyle.fontSize = props.textSize;
    Object.assign(textStyle, props.textOptions);
  });
  return {
    textStyle: textStyle
  };
}
/**
 * 处理Button的手势响应
 * @param {Function} emit 激发事件的方法 
 * @returns {Object<Function>} callbacks 回调函数对象
 * @returns {Function} 赋予按钮v-gesture的回调函数
 */

function useButtonEvents(emit) {
  // 回调函数队列
  var callbacks = {
    over: [],
    out: [],
    down: [],
    up: []
  };

  function gestureHandler(gesture) {
    var cbList = callbacks[gesture.name] || [];
    cbList.forEach(function (item) {
      if (typeof item === 'function') {
        item(gesture);
      }
    });

    if (gesture.name === 'over') {
      emit('over', gesture);
    }

    if (gesture.name === 'out') {
      emit('out', gesture);
    }

    if (gesture.name === 'down') {
      emit('down', gesture);
    }

    if (gesture.name === 'up') {
      emit('up', gesture);
    }
  }

  return {
    callbacks: callbacks,
    gestureHandler: gestureHandler
  };
}

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-09 11:24:37
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 14:55:40
 */
/**
 * Button组件的鼠标悬停缩放特效动画
 * @param {VueProps} props 组件属性
 * @param {Object<Function>} callbacks 回调函数对象，将动画控制的方法绑定到对应的生命周期
 * @return {Object<Function>} hoverScaleHandler的over/out方法，分别用在对应的手势下激活动画特效
 */

function hoverScaleEffect(props, callbacks) {
  var tween = new Tween(); // 按键放大动画是否有效

  var enabled = computed(function () {
    return props.hoverScale !== null && props.hoverScale > 0 && props.hoverScale !== Infinity && props.hoverScale !== NaN;
  });
  callbacks.over.push(function (_ref) {
    var target = _ref.target;

    if (!enabled.value) {
      return;
    }

    if (tween.getEl() !== target.scale) {
      tween.on(target.scale).duration(props.hoverScaleDuration).ani(null, {
        x: props.hoverScale,
        y: props.hoverScale
      }).exec();
    } else {
      tween.tween.reversed(false);
    }
  });
  callbacks.out.push(function () {
    if (tween.tween) {
      tween.tween.reversed(true);
    }
  });
}
/**
 * Button组件的鼠标按下缩放特效动画
 * @param @returns 同useHoverScaleAnimation
 */

function clickScaleEffect(props, callbacks) {
  var tween = new Tween(); // 动画是否有效

  var enabled = computed(function () {
    return props.clickScale !== null && props.clickScale > 0 && props.clickScale !== Infinity && props.clickScale !== NaN;
  });
  callbacks.down.push(function (_ref2) {
    var target = _ref2.target;

    if (!enabled.value) {
      return;
    }

    if (tween.getEl() !== target.scale) {
      tween.on(target.scale).duration(props.clickScaleDuration).ani(null, {
        x: props.clickScale,
        y: props.clickScale
      }).exec();
    } else {
      tween.tween.reversed(false);
    }
  });

  function back() {
    if (tween.tween) {
      tween.tween.reversed(true);
    }
  }

  callbacks.out.push(back);
  callbacks.up.push(back);
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script = {
  name: 'Button',
  components: {
    Rectangle: Rectangle
  },
  props: _objectSpread$1(_objectSpread$1({}, useButtonProps()), {}, {
    // @section 特效区
    // 鼠标悬停特效，缩放倍率
    hoverScale: {
      type: Number,
      "default": null
    },
    // 鼠标悬停特效，单程时间
    hoverScaleDuration: {
      type: Number,
      "default": 100
    },
    // 鼠标按下特效，缩放倍率
    clickScale: {
      type: Number,
      "default": null
    },
    // 鼠标按下特效，单程时间
    clickScaleDuration: {
      type: Number,
      "default": 50
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useButtonText = useButtonText(props),
        textStyle = _useButtonText.textStyle; // 手势触发


    var _useButtonEvents = useButtonEvents(emit),
        gestureHandler = _useButtonEvents.gestureHandler,
        callbacks = _useButtonEvents.callbacks; // 获取动画组件


    hoverScaleEffect(props, callbacks);
    clickScaleEffect(props, callbacks);
    return {
      textStyle: textStyle,
      gestureHandler: gestureHandler
    };
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Rectangle = resolveComponent("Rectangle");

  var _component_Sprite = resolveComponent("Sprite");

  var _component_Text = resolveComponent("Text");

  var _component_Container = resolveComponent("Container");

  var _directive_gesture = resolveDirective("gesture");

  return withDirectives((openBlock(), createBlock(_component_Container, {
    ref: "container",
    pivotX: _ctx.w / 2,
    pivotY: _ctx.h / 2
  }, {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "bottom"), _ctx.rec ? (openBlock(), createBlock(_component_Rectangle, {
        key: 0,
        name: "bgRec",
        w: _ctx.w,
        h: _ctx.h,
        radius: _ctx.radius,
        bdWidth: _ctx.bdWidth,
        bdColor: _ctx.bdColor,
        bdAlpha: _ctx.bdAlpha,
        bdAlign: _ctx.bdAlign,
        bgColor: _ctx.bgColor,
        bgAlpha: _ctx.bgAlpha
      }, null, 8
      /* PROPS */
      , ["w", "h", "radius", "bdWidth", "bdColor", "bdAlpha", "bdAlign", "bgColor", "bgAlpha"])) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "center"), _ctx.bgTexture ? (openBlock(), createBlock(_component_Sprite, {
        key: 1,
        name: "bgSprite",
        width: _ctx.w,
        height: _ctx.h,
        texture: _ctx.bgTexture
      }, null, 8
      /* PROPS */
      , ["width", "height", "texture"])) : createCommentVNode("v-if", true), createVNode(_component_Text, {
        name: "text",
        text: _ctx.text,
        x: _ctx.w / 2 + _ctx.offsetX,
        y: _ctx.h / 2 + _ctx.offsetY,
        anchorX: 0.5,
        anchorY: 0.5,
        style: _ctx.textStyle
      }, null, 8
      /* PROPS */
      , ["text", "x", "y", "anchorX", "anchorY", "style"]), renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
    /* FORWARDED */

  }, 8
  /* PROPS */
  , ["pivotX", "pivotY"])), [[_directive_gesture, _ctx.gestureHandler]]);
}

script.render = render;
script.__file = "packages/comp-ui-button/src/Button.vue";

export { script as Button, clickScaleEffect, hoverScaleEffect, useButtonEvents, useButtonProps, useButtonText };
//# sourceMappingURL=button.esm.js.map
