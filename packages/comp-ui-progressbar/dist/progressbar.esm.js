/*!
 * @cmgl/progressbar - v1.0.5
 *
 * @cmgl/progressbar is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { ref, onMounted, onBeforeUnmount, resolveComponent, openBlock, createBlock, withCtx, createVNode, renderSlot } from 'vue';
import { Texture } from 'pixi.js';
import { Rectangle, useBorderProps, useBackgroundProps } from '@cmgl/graphics';

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
var script = {
  name: 'ProgressBar',
  components: {
    Rectangle: Rectangle
  },
  props: _objectSpread(_objectSpread(_objectSpread({
    // ???????????????
    progress: {
      type: Number,
      "default": 0
    },
    // ??????????????????????????????????????????
    progressScaleX: {
      type: Number,
      "default": 1
    },
    progressScaleY: {
      type: Number,
      "default": 1
    },
    // ???????????????
    w: {
      type: Number,
      "default": 500
    },
    // ???????????????
    h: {
      type: Number,
      "default": 100
    },
    // ????????????????????????
    radius: {
      type: Number,
      "default": 0
    }
  }, useBorderProps()), useBackgroundProps()), {}, {
    // ???????????????
    progressColor: {
      type: [String, Number],
      "default": 0
    },
    // ??????????????????
    progressAlpha: {
      type: Number,
      "default": 1
    },
    // ???????????????Texture?????????????????????????????????????????????????????????Sprite?????????????????????
    backgroundTexture: {
      type: [Texture, String],
      "default": null
    },
    progressTexture: {
      type: [Texture, String],
      "default": null
    }
  }),
  setup: function setup(props) {
    // ??????????????????
    var _maskProgress = maskProgress(props),
        progressSprite = _maskProgress.progressSprite,
        progressRec = _maskProgress.progressRec,
        progressMask = _maskProgress.progressMask;

    return {
      progressSprite: progressSprite,
      progressRec: progressRec,
      progressMask: progressMask
    };
  }
}; // ?????????????????????????????????????????????????????????

function maskProgress(props) {
  // ?????????????????????
  var progressSprite = ref(null); // ?????????Rectangle??????

  var progressRec = ref(null); // ?????????????????????

  var progressMask = ref(null);
  onMounted(function () {
    // ???????????????
    var target = props.progressTexture ? progressSprite.value : progressRec.value.$el;
    target.mask = progressMask.value.$el;
  });
  onBeforeUnmount(function () {
    // ???????????????????????????
    var target = props.progressTexture ? progressSprite.value : progressRec.value.$el;
    target.mask = null;
  });
  return {
    progressSprite: progressSprite,
    progressRec: progressRec,
    progressMask: progressMask
  };
}

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Sprite = resolveComponent("Sprite");

  var _component_Rectangle = resolveComponent("Rectangle");

  var _component_Container = resolveComponent("Container");

  return openBlock(), createBlock(_component_Container, null, {
    "default": withCtx(function () {
      return [_ctx.backgroundTexture ? (openBlock(), createBlock(_component_Sprite, {
        key: 0,
        texture: _ctx.backgroundTexture,
        width: _ctx.w,
        height: _ctx.h,
        x: _ctx.w * 0.5,
        y: _ctx.h * 0.5,
        anchorX: 0.5,
        anchorY: 0.5
      }, null, 8, ["texture", "width", "height", "x", "y", "anchorX", "anchorY"])) : (openBlock(), createBlock(_component_Rectangle, {
        key: 1,
        radius: _ctx.radius,
        w: _ctx.w,
        h: _ctx.h,
        bdWidth: _ctx.bdWidth,
        bdColor: _ctx.bdColor,
        bdAlpha: _ctx.bdAlpha,
        bdAlign: _ctx.bdAlign,
        bgColor: _ctx.bgColor,
        bgAlpha: _ctx.bgAlpha
      }, null, 8, ["radius", "w", "h", "bdWidth", "bdColor", "bdAlpha", "bdAlign", "bgColor", "bgAlpha"])), _ctx.progressTexture ? (openBlock(), createBlock(_component_Sprite, {
        key: 2,
        ref: "progressSprite",
        texture: _ctx.progressTexture,
        width: _ctx.w * _ctx.progressScaleX,
        height: _ctx.h * _ctx.progressScaleY,
        x: _ctx.w * 0.5,
        y: _ctx.h * 0.5,
        anchorX: 0.5,
        anchorY: 0.5
      }, null, 8, ["texture", "width", "height", "x", "y", "anchorX", "anchorY"])) : (openBlock(), createBlock(_component_Rectangle, {
        key: 3,
        ref: "progressRec",
        radius: _ctx.radius,
        w: _ctx.w,
        h: _ctx.h,
        scaleX: _ctx.progressScaleX,
        scaleY: _ctx.progressScaleY,
        x: _ctx.w * 0.5,
        y: _ctx.h * 0.5,
        pivotX: _ctx.w * 0.5,
        pivotY: _ctx.h * 0.5,
        bgColor: _ctx.progressColor,
        bgAlpha: _ctx.progressAlpha
      }, null, 8, ["radius", "w", "h", "scaleX", "scaleY", "x", "y", "pivotX", "pivotY", "bgColor", "bgAlpha"])), createVNode(_component_Rectangle, {
        ref: "progressMask",
        radius: _ctx.radius,
        w: _ctx.w * _ctx.progress / 100,
        h: _ctx.h,
        scaleX: _ctx.progressScaleX,
        scaleY: _ctx.progressScaleY,
        x: _ctx.w * 0.5,
        y: _ctx.h * 0.5,
        pivotX: _ctx.w * 0.5,
        pivotY: _ctx.h * 0.5,
        bgColor: 0
      }, null, 8, ["radius", "w", "h", "scaleX", "scaleY", "x", "y", "pivotX", "pivotY"]), renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  });
}

script.render = render;

export { script as ProgressBar };
