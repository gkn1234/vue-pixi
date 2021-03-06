/*!
 * @cmgl/button - v1.0.5
 *
 * @cmgl/button is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
    // ????????????
    w: {
      type: Number,
      "default": 100
    },
    // ????????????
    h: {
      type: Number,
      "default": 50
    },
    // ????????????????????????
    // ????????????????????????
    rec: {
      type: Boolean,
      "default": true
    }
  }, useBorderProps()), useBackgroundProps()), {}, {
    // ????????????????????????
    radius: {
      type: Number,
      "default": 0
    },
    // ??????Sprite?????????
    bgTexture: {
      type: [String, Texture],
      "default": null
    },
    // ??????Text????????????
    // ??????
    text: {
      type: String,
      "default": ''
    },
    // ??????
    textSize: {
      type: Number,
      "default": 24
    },
    // ??????
    textColor: {
      type: [Number, String, Array],
      "default": 0
    },
    // ??????????????????
    textOptions: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    // ?????????????????????offset??????????????????????????????
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
 * ??????Button?????????????????????
 * @param {VueProps} props ????????????
 * @returns {Object} ???????????????????????????
 */

function useButtonText(props) {
  var textStyle = reactive({}); // ??????????????????????????????????????????

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
 * ??????Button???????????????
 * @param {Function} emit ????????????????????? 
 * @returns {Object<Function>} callbacks ??????????????????
 * @returns {Function} ????????????v-gesture???????????????
 */

function useButtonEvents(emit) {
  // ??????????????????
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
 * Button???????????????????????????????????????
 * @param {VueProps} props ????????????
 * @param {Object<Function>} callbacks ???????????????????????????????????????????????????????????????????????????
 * @return {Object<Function>} hoverScaleHandler???over/out?????????????????????????????????????????????????????????
 */

function hoverScaleEffect(props, callbacks) {
  var tween = new Tween(); // ??????????????????????????????

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
 * Button???????????????????????????????????????
 * @param @returns ???useHoverScaleAnimation
 */

function clickScaleEffect(props, callbacks) {
  var tween = new Tween(); // ??????????????????

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
    // @section ?????????
    // ?????????????????????????????????
    hoverScale: {
      type: Number,
      "default": null
    },
    // ?????????????????????????????????
    hoverScaleDuration: {
      type: Number,
      "default": 100
    },
    // ?????????????????????????????????
    clickScale: {
      type: Number,
      "default": null
    },
    // ?????????????????????????????????
    clickScaleDuration: {
      type: Number,
      "default": 50
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useButtonText = useButtonText(props),
        textStyle = _useButtonText.textStyle; // ????????????


    var _useButtonEvents = useButtonEvents(emit),
        gestureHandler = _useButtonEvents.gestureHandler,
        callbacks = _useButtonEvents.callbacks; // ??????????????????


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
      }, null, 8, ["w", "h", "radius", "bdWidth", "bdColor", "bdAlpha", "bdAlign", "bgColor", "bgAlpha"])) : createCommentVNode("", true), renderSlot(_ctx.$slots, "center"), _ctx.bgTexture ? (openBlock(), createBlock(_component_Sprite, {
        key: 1,
        name: "bgSprite",
        width: _ctx.w,
        height: _ctx.h,
        texture: _ctx.bgTexture
      }, null, 8, ["width", "height", "texture"])) : createCommentVNode("", true), createVNode(_component_Text, {
        name: "text",
        text: _ctx.text,
        x: _ctx.w / 2 + _ctx.offsetX,
        y: _ctx.h / 2 + _ctx.offsetY,
        anchorX: 0.5,
        anchorY: 0.5,
        style: _ctx.textStyle
      }, null, 8, ["text", "x", "y", "anchorX", "anchorY", "style"]), renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 8, ["pivotX", "pivotY"])), [[_directive_gesture, _ctx.gestureHandler]]);
}

script.render = render;

export { script as Button, clickScaleEffect, hoverScaleEffect, useButtonEvents, useButtonProps, useButtonText };
