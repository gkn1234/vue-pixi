/*!
 * @cmgl/progressbar - v1.0.4
 *
 * @cmgl/progressbar is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { ref, onMounted, onBeforeUnmount, resolveComponent, openBlock, createBlock, withCtx, createVNode, renderSlot } from 'vue';
import { Texture } from 'pixi.js';
import { Rectangle } from '@cmgl/graphics';

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 11:54:05
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:18:01
 */
var script = {
  name: 'ProgressBar',
  components: {
    Rectangle: Rectangle
  },
  props: {
    // 进度条进度
    progress: {
      type: Number,
      "default": 0
    },
    // 进度条内部进度部分的缩放比例
    progressScaleX: {
      type: Number,
      "default": 1
    },
    progressScaleY: {
      type: Number,
      "default": 1
    },
    // 进度条宽度
    w: {
      type: Number,
      "default": 500
    },
    // 进度条高度
    h: {
      type: Number,
      "default": 100
    },
    // 进度条矩形的圆角
    radius: {
      type: Number,
      "default": 0
    },
    // 背景矩形的设定参数。如果没有设置Texture项，则由Rectangle实现进度条
    // 边框颜色
    bdColor: {
      type: [String, Number],
      "default": 0
    },
    // 边框宽度
    bdWidth: {
      type: Number,
      "default": 0
    },
    // 边框透明度
    bdAlpha: {
      type: Number,
      "default": 1
    },
    // 背景颜色
    bgColor: {
      type: [String, Number],
      "default": 0
    },
    // 背景透明度
    bgAlpha: {
      type: Number,
      "default": 1
    },
    // 进度条颜色
    progressColor: {
      type: [String, Number],
      "default": 0
    },
    // 进度条透明度
    progressAlpha: {
      type: Number,
      "default": 1
    },
    // 一旦设置了Texture项，则无视上面的背景矩形的设定参数，由Sprite贴图实现进度条
    backgroundTexture: {
      type: [Texture, String],
      "default": null
    },
    progressTexture: {
      type: [Texture, String],
      "default": null
    }
  },
  setup: function setup(props) {
    // 进度控制逻辑
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
}; // 进度条进度显示逻辑，通过处理遮罩层实现

function maskProgress(props) {
  // 进度条精灵对象
  var progressSprite = ref(null); // 进度条Rectangle对象

  var progressRec = ref(null); // 进度条遮罩对象

  var progressMask = ref(null);
  onMounted(function () {
    // 绑定遮罩层
    var target = props.progressTexture ? progressSprite.value : progressRec.value.$el;
    target.mask = progressMask.value.$el;
  });
  onBeforeUnmount(function () {
    // 在临终前解绑遮罩层
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
        lineWidth: _ctx.bdWidth,
        lineColor: _ctx.bdColor,
        lineAlpha: _ctx.bdAlpha,
        fillColor: _ctx.bgColor,
        fillAlpha: _ctx.bgAlpha
      }, null, 8, ["radius", "w", "h", "lineWidth", "lineColor", "lineAlpha", "fillColor", "fillAlpha"])), _ctx.progressTexture ? (openBlock(), createBlock(_component_Sprite, {
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
        fillColor: _ctx.progressColor,
        fillAlpha: _ctx.progressAlpha
      }, null, 8, ["radius", "w", "h", "scaleX", "scaleY", "x", "y", "pivotX", "pivotY", "fillColor", "fillAlpha"])), createVNode(_component_Rectangle, {
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
        fillColor: 0
      }, null, 8, ["radius", "w", "h", "scaleX", "scaleY", "x", "y", "pivotX", "pivotY"]), renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  });
}

script.render = render;

export { script as ProgressBar };
