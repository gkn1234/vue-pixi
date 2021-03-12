/*!
 * @cmgl/pixi-projection2d - v1.0.5
 *
 * @cmgl/pixi-projection2d is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { BatchShaderGenerator, utils, AbstractBatchRenderer, Buffer, TYPES, Geometry, Point, Transform, Rectangle, ObservablePoint, Container, Sprite, Text } from 'pixi.js';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var shaderVert = "\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\nuniform mat3 projectionMatrix;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main (void) {\n  gl_Position.xyw = projectionMatrix * aVertexPosition;\n  gl_Position.z = 0.0;\n  vTextureCoord = aTextureCoord;\n  vTextureId = aTextureId;\n  vColor = aColor;\n}";
var shaderFrag = "\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main (void) {\n  vec4 color;\n  %forloop%;\n  gl_FragColor = color * vColor;\n}";
var Batch2dGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(Batch2dGeometry, _Geometry);

  var _super = _createSuper(Batch2dGeometry);

  function Batch2dGeometry() {
    var _this;

    var _static = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Batch2dGeometry);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_buffer", null);

    _defineProperty(_assertThisInitialized(_this), "_indexBuffer", null);

    _this._buffer = new Buffer(null, _static, false);
    _this._indexBuffer = new Buffer(null, _static, true);

    _this.addAttribute('aVertexPosition', _this._buffer, 3, false, TYPES.FLOAT).addAttribute('aTextureCoord', _this._buffer, 2, false, TYPES.FLOAT).addAttribute('aColor', _this._buffer, 4, true, TYPES.UNSIGNED_BYTE).addAttribute('aTextureId', _this._buffer, 1, true, TYPES.FLOAT).addIndex(_this._indexBuffer);

    return _this;
  }

  return Batch2dGeometry;
}(Geometry);
var Batch2dPlugin = /*#__PURE__*/function (_AbstractBatchRendere) {
  _inherits(Batch2dPlugin, _AbstractBatchRendere);

  var _super2 = _createSuper(Batch2dPlugin);

  /**
   * @param {PIXI.Renderer} renderer 
   */
  function Batch2dPlugin(renderer) {
    var _this2;

    _classCallCheck(this, Batch2dPlugin);

    _this2 = _super2.call(this, renderer);

    _defineProperty(_assertThisInitialized(_this2), "shaderGenerator", new BatchShaderGenerator(shaderVert, shaderFrag));

    _defineProperty(_assertThisInitialized(_this2), "geometryClass", Batch2dGeometry);

    _defineProperty(_assertThisInitialized(_this2), "vertexSize", 7);

    return _this2;
  }
  /**
   * @param {PIXI.DisplayObject} element 
   * @param {PIXI.ViewableBuffer} attributeBuffer 
   * @param {Uint16Array} indexBuffer 
   * @param {Number} aIndex 
   * @param {Number} iIndex 
   */


  _createClass(Batch2dPlugin, [{
    key: "packInterleavedGeometry",
    value: function packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
      var uint32View = attributeBuffer.uint32View,
          float32View = attributeBuffer.float32View;
      var p = aIndex / this.vertexSize;
      var uvs = element.uvs;
      var indices = element.indices;
      var vertexData = element.vertexData;
      var vertexData2d = element.vertexData2d;
      var textureId = element._texture.baseTexture._batchLocation;
      var alpha = Math.min(element.worldAlpha, 1.0);
      var argb = alpha < 1.0 && element._texture.baseTexture.alphaMode ? utils.premultiplyTint(element._tintRGB, alpha) : element._tintRGB + (alpha * 255 << 24);

      if (vertexData2d) {
        var j = 0;

        for (var i = 0; i < vertexData2d.length; i += 3, j += 2) {
          float32View[aIndex++] = vertexData2d[i];
          float32View[aIndex++] = vertexData2d[i + 1];
          float32View[aIndex++] = vertexData2d[i + 2];
          float32View[aIndex++] = uvs[j];
          float32View[aIndex++] = uvs[j + 1];
          uint32View[aIndex++] = argb;
          float32View[aIndex++] = textureId;
        }
      } else {
        for (var _i = 0; _i < vertexData.length; _i += 2) {
          float32View[aIndex++] = vertexData[_i];
          float32View[aIndex++] = vertexData[_i + 1];
          float32View[aIndex++] = 1.0;
          float32View[aIndex++] = uvs[_i];
          float32View[aIndex++] = uvs[_i + 1];
          uint32View[aIndex++] = argb;
          float32View[aIndex++] = textureId;
        }
      }

      for (var _i2 = 0; _i2 < indices.length; _i2++) {
        indexBuffer[iIndex++] = p + indices[_i2];
      }
    }
  }]);

  return Batch2dPlugin;
}(AbstractBatchRenderer);

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 10:55:40
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 17:50:13
 */
// 枚举，变换步骤
var TRANSFORM_STEP = {
  NONE: 0,
  // POS: 1,
  // ROT: 2,
  // SCALE: 3,
  // PIVOT: 4,
  BEFORE_PROJ: 4,
  PROJ: 5,
  // POS_2: 6,
  // ROT_2: 7,
  // SCALE_2: 8,
  // PIVOT_2: 9,
  ALL: 9
};

var AbstractProjection = /*#__PURE__*/function () {
  // 继承变换信息

  /**
   * @param {PIXI.Transform} legacy 
   * @param {Boolean} enabled
   */
  function AbstractProjection(legacy) {
    var enabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AbstractProjection);

    _defineProperty(this, "_enabled", false);

    _defineProperty(this, "legacy", null);

    this.legacy = legacy;
    this.enabled = enabled ? true : false; // sorry for hidden class, it would be good to have special projection field in official pixi

    this.legacy.proj = this;
  }

  _createClass(AbstractProjection, [{
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(val) {
      this._enabled = val;
    }
  }, {
    key: "clear",
    value: function clear() {}
  }]);

  return AbstractProjection;
}();

AbstractProjection.TRANSFORM_STEP = TRANSFORM_STEP;

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

var AFFINE = {
  NONE: 0,
  FREE: 1,
  AXIS_X: 2,
  AXIS_Y: 3,
  POINT: 4,
  AXIS_XR: 5
}; // 3阶单位矩阵

var mat3id = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // 是否为合法数字

function isNum(val) {
  return typeof val === 'number' && !Number.isNaN(val) && val !== Infinity && val !== -Infinity;
} // 是否为变换矩阵数组


function isMat3(arr) {
  return Array.isArray(arr) && arr.length === 9 && arr.every(function (item) {
    return isNum(item);
  });
}
/**
 * 2d变化矩阵
 * |a, c, tx|
 * |b, d, ty|
 * |0, 0, z|
 * mat3 = [a, b, 0, c, d, 0, tx, ty, z]
 */


var Matrix2d = /*#__PURE__*/function () {
  // A default (identity) matrix
  // A temp matrix
  function Matrix2d() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Matrix2d);

    _defineProperty(this, "mat3", new Float64Array(mat3id));

    if (isMat3(arr)) {
      this.mat3 = new Float64Array(arr);
    }
  }

  _createClass(Matrix2d, [{
    key: "a",
    get: function get() {
      return this.mat3[0] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[0] = val * this.mat3[8];
    }
  }, {
    key: "b",
    get: function get() {
      return this.mat3[1] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[1] = val * this.mat3[8];
    }
  }, {
    key: "c",
    get: function get() {
      return this.mat3[3] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[3] = val * this.mat3[8];
    }
  }, {
    key: "d",
    get: function get() {
      return this.mat3[4] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[4] = val * this.mat3[8];
    }
  }, {
    key: "tx",
    get: function get() {
      return this.mat3[6] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[6] = val * this.mat3[8];
    }
  }, {
    key: "ty",
    get: function get() {
      return this.mat3[7] / this.mat3[8];
    },
    set: function set(val) {
      this.mat3[7] = val * this.mat3[8];
    }
  }, {
    key: "set",
    value: function set(a, b, c, d, tx, ty) {
      var mat3 = this.mat3;
      mat3[0] = a;
      mat3[1] = b;
      mat3[2] = 0;
      mat3[3] = c;
      mat3[4] = d;
      mat3[5] = 0;
      mat3[6] = tx;
      mat3[7] = ty;
      mat3[8] = 1;
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var transpose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var mat3 = this.mat3;
      return transpose ? new Float32Array([mat3[0], mat3[1], mat3[2], mat3[3], mat3[4], mat3[5], mat3[6], mat3[7], mat3[8]]) : new Float32Array([mat3[0], mat3[3], mat3[6], mat3[1], mat3[4], mat3[7], mat3[2], mat3[5], mat3[8]]);
    }
    /**
     * @returns {PIXI.Point}
     */

  }, {
    key: "apply",
    value: function apply(pos, newPos) {
      newPos = newPos || new Point();
      var mat3 = this.mat3;
      var x = pos.x,
          y = pos.y;
      var z = 1.0 / (mat3[2] * x + mat3[5] * y + mat3[8]);
      newPos.x = z * (mat3[0] * x + mat3[3] * y + mat3[6]);
      newPos.y = z * (mat3[1] * x + mat3[4] * y + mat3[7]);
      return newPos;
    }
  }, {
    key: "translate",
    value: function translate(tx, ty) {
      var mat3 = this.mat3;
      mat3[0] += tx * mat3[2];
      mat3[1] += ty * mat3[2];
      mat3[3] += tx * mat3[5];
      mat3[4] += ty * mat3[5];
      mat3[6] += tx * mat3[8];
      mat3[7] += ty * mat3[8];
      return this;
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      var mat3 = this.mat3;
      mat3[0] *= x;
      mat3[1] *= y;
      mat3[3] *= x;
      mat3[4] *= y;
      mat3[6] *= x;
      mat3[7] *= y;
      return this;
    }
  }, {
    key: "scaleAndTranslate",
    value: function scaleAndTranslate(scaleX, scaleY, tx, ty) {
      var mat3 = this.mat3;
      mat3[0] = scaleX * mat3[0] + tx * mat3[2];
      mat3[1] = scaleY * mat3[1] + ty * mat3[2];
      mat3[3] = scaleX * mat3[3] + tx * mat3[5];
      mat3[4] = scaleY * mat3[4] + ty * mat3[5];
      mat3[6] = scaleX * mat3[6] + tx * mat3[8];
      mat3[7] = scaleY * mat3[7] + ty * mat3[8];
    }
    /**
     * @returns {PIXI.Point}
     */

  }, {
    key: "applyInverse",
    value: function applyInverse(pos, newPos) {
      newPos = newPos || new Point();
      var a = this.mat3;
      var x = pos.x,
          y = pos.y;
      var a00 = a[0],
          a01 = a[3],
          a02 = a[6],
          a10 = a[1],
          a11 = a[4],
          a12 = a[7],
          a20 = a[2],
          a21 = a[5],
          a22 = a[8];
      var newX = (a22 * a11 - a12 * a21) * x + (-a22 * a01 + a02 * a21) * y + (a12 * a01 - a02 * a11);
      var newY = (-a22 * a10 + a12 * a20) * x + (a22 * a00 - a02 * a20) * y + (-a12 * a00 + a02 * a10);
      var newZ = (a21 * a10 - a11 * a20) * x + (-a21 * a00 + a01 * a20) * y + (a11 * a00 - a01 * a10);
      newPos.x = newX / newZ;
      newPos.y = newY / newZ;
      return newPos;
    }
  }, {
    key: "invert",
    value: function invert() {
      var a = this.mat3;
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a10 = a[3],
          a11 = a[4],
          a12 = a[5],
          a20 = a[6],
          a21 = a[7],
          a22 = a[8],
          b01 = a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 = a21 * a10 - a11 * a20; // Calculate the determinant

      var det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
        return this;
      }

      det = 1.0 / det;
      a[0] = b01 * det;
      a[1] = (-a22 * a01 + a02 * a21) * det;
      a[2] = (a12 * a01 - a02 * a11) * det;
      a[3] = b11 * det;
      a[4] = (a22 * a00 - a02 * a20) * det;
      a[5] = (-a12 * a00 + a02 * a10) * det;
      a[6] = b21 * det;
      a[7] = (-a21 * a00 + a01 * a20) * det;
      a[8] = (a11 * a00 - a01 * a10) * det;
      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      this.mat3 = new Float64Array(mat3id);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Matrix2d(this.mat3);
    }
    /**
     * @param {Matrix2d} matrix 
     */

  }, {
    key: "copyTo2dOr3d",
    value: function copyTo2dOr3d(matrix) {
      var mat3 = this.mat3;
      var ar2 = matrix.mat3;
      ar2[0] = mat3[0];
      ar2[1] = mat3[1];
      ar2[2] = mat3[2];
      ar2[3] = mat3[3];
      ar2[4] = mat3[4];
      ar2[5] = mat3[5];
      ar2[6] = mat3[6];
      ar2[7] = mat3[7];
      ar2[8] = mat3[8];
      return matrix;
    }
    /**
     * legacy method, change the values of given pixi matrix
     * @param {PIXI.Matrix} matrix 
     */

  }, {
    key: "copyTo",
    value: function copyTo(matrix) {
      var affine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AFFINE.AXIS_X;
      var preserveOrientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var mat3 = this.mat3;
      var d = 1.0 / mat3[8];
      var tx = mat3[6] * d,
          ty = mat3[7] * d;
      matrix.a = (mat3[0] - mat3[2] * tx) * d;
      matrix.b = (mat3[1] - mat3[2] * ty) * d;
      matrix.c = (mat3[3] - mat3[5] * tx) * d;
      matrix.d = (mat3[4] - mat3[5] * ty) * d;
      matrix.tx = tx;
      matrix.ty = ty;

      if (affine >= 2) {
        var D = matrix.a * matrix.d - matrix.b * matrix.c;

        if (!preserveOrientation) {
          D = Math.abs(D);
        }

        if (affine === AFFINE.POINT) {
          D = D > 0 ? 1 : -1;
          matrix.a = D;
          matrix.b = 0;
          matrix.c = 0;
          matrix.d = D;
        } else if (affine === AFFINE.AXIS_X) {
          D /= Math.sqrt(matrix.b * matrix.b + matrix.d * matrix.d);
          matrix.c = 0;
          matrix.d = D;
        } else if (affine === AFFINE.AXIS_Y) {
          D /= Math.sqrt(matrix.a * matrix.a + matrix.c * matrix.c);
          matrix.a = D;
          matrix.c = 0;
        } else if (affine === AFFINE.AXIS_XR) {
          matrix.a = matrix.d * D;
          matrix.c = -matrix.b * D;
        }
      }

      return matrix;
    }
    /**
     * legacy method, change the values of given pixi matrix
     * @param {PIXI.Matrix} matrix 
     */

  }, {
    key: "copyFrom",
    value: function copyFrom(matrix) {
      var mat3 = this.mat3;
      mat3[0] = matrix.a;
      mat3[1] = matrix.b;
      mat3[2] = 0;
      mat3[3] = matrix.c;
      mat3[4] = matrix.d;
      mat3[5] = 0;
      mat3[6] = matrix.tx;
      mat3[7] = matrix.ty;
      mat3[8] = 1.0;
      return this;
    }
    /**
     * PIXI matrix to lagacy
     * @param {PIXI.Matrix} pt 
     * @param {Matrix2d} lt 
     */

  }, {
    key: "setToMultLegacy",
    value: function setToMultLegacy(pt, lt) {
      var out = this.mat3;
      var b = lt.mat3;
      var a00 = pt.a,
          a01 = pt.b,
          a10 = pt.c,
          a11 = pt.d,
          a20 = pt.tx,
          a21 = pt.ty,
          b00 = b[0],
          b01 = b[1],
          b02 = b[2],
          b10 = b[3],
          b11 = b[4],
          b12 = b[5],
          b20 = b[6],
          b21 = b[7],
          b22 = b[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b02;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b12;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b22;
      return this;
    }
    /**
     * lagacy matrix to PIXI
     * @param {Matrix2d} pt 
     * @param {PIXI.Matrix} lt 
     */

  }, {
    key: "setToMultLegacy2",
    value: function setToMultLegacy2(pt, lt) {
      var out = this.mat3;
      var a = pt.mat3;
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a10 = a[3],
          a11 = a[4],
          a12 = a[5],
          a20 = a[6],
          a21 = a[7],
          a22 = a[8],
          b00 = lt.a,
          b01 = lt.b,
          b10 = lt.c,
          b11 = lt.d,
          b20 = lt.tx,
          b21 = lt.ty;
      out[0] = b00 * a00 + b01 * a10;
      out[1] = b00 * a01 + b01 * a11;
      out[2] = b00 * a02 + b01 * a12;
      out[3] = b10 * a00 + b11 * a10;
      out[4] = b10 * a01 + b11 * a11;
      out[5] = b10 * a02 + b11 * a12;
      out[6] = b20 * a00 + b21 * a10 + a20;
      out[7] = b20 * a01 + b21 * a11 + a21;
      out[8] = b20 * a02 + b21 * a12 + a22;
      return this;
    }
    /**
     * that's transform multiplication we use
     * @param {Matrix2d} pt 
     * @param {Matrix2d} lt 
     */

  }, {
    key: "setToMult",
    value: function setToMult(pt, lt) {
      var out = this.mat3;
      var a = pt.mat3,
          b = lt.mat3;
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a10 = a[3],
          a11 = a[4],
          a12 = a[5],
          a20 = a[6],
          a21 = a[7],
          a22 = a[8],
          b00 = b[0],
          b01 = b[1],
          b02 = b[2],
          b10 = b[3],
          b11 = b[4],
          b12 = b[5],
          b20 = b[6],
          b21 = b[7],
          b22 = b[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return this;
    }
  }, {
    key: "prepend",
    value: function prepend(lt) {
      return lt.mat3 ? this.setToMult(lt, this) : this.setToMultLegacy(lt, this);
    }
  }]);

  return Matrix2d;
}();

_defineProperty(Matrix2d, "IDENTITY", new Matrix2d());

_defineProperty(Matrix2d, "TEMP_MATRIX", new Matrix2d());

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
 * pixi-projection 内部的黑客变换方法
 * @warn 有一个恶劣的this需要严重注意
 * @param {PIXI.Transform} parentTrans 
 */

function transformHack(parentTrans) {
  var localTransform = this.localTransform,
      worldTransform = this.worldTransform,
      proj = this.proj;
  var scaleAfterAffine = proj.scaleAfterAffine && proj.affine >= 2;

  if (this._localID !== this._currentLocalID) {
    // get the matrix values of the displayobject based on its transform properties..
    if (scaleAfterAffine) {
      localTransform.a = this._cx;
      localTransform.b = this._sx;
      localTransform.c = this._cy;
      localTransform.d = this._sy;
      localTransform.tx = this.position._x;
      localTransform.ty = this.position._y;
    } else {
      localTransform.a = this._cx * this.scale._x;
      localTransform.b = this._sx * this.scale._x;
      localTransform.c = this._cy * this.scale._y;
      localTransform.d = this._sy * this.scale._y;
      localTransform.tx = this.position._x - (this.pivot._x * localTransform.a + this.pivot._y * localTransform.c);
      localTransform.ty = this.position._y - (this.pivot._x * localTransform.b + this.pivot._y * localTransform.d);
    }

    this._currentLocalID = this._localID; // force an update..

    proj._currentProjID = -1;
  }

  if (proj._currentProjID !== proj._projID) {
    proj._currentProjID = proj._projID;
    proj.updateLocalTransform(localTransform);
    this._parentID = -1;
  }

  if (this._parentID !== parentTrans._worldID) {
    var parentProj = parentTrans.proj;

    if (parentProj && !parentProj._affine) {
      proj.world.setToMult(parentProj.world, proj.local);
    } else {
      proj.world.setToMultLegacy(parentTrans.worldTransform, proj.local);
    }

    proj.world.copyTo(worldTransform, proj._affine, proj.affinePreserveOrientation);

    if (scaleAfterAffine) {
      worldTransform.a *= this.scale._x;
      worldTransform.b *= this.scale._x;
      worldTransform.c *= this.scale._y;
      worldTransform.d *= this.scale._y;
      worldTransform.tx -= this.pivot._x * worldTransform.a + this.pivot._y * worldTransform.c;
      worldTransform.ty -= this.pivot._x * worldTransform.b + this.pivot._y * worldTransform.d;
    }

    this._parentID = parentTrans._worldID;
    this._worldID++;
  }
}

var LinearProjection = /*#__PURE__*/function (_AbstractProjection) {
  _inherits(LinearProjection, _AbstractProjection);

  var _super = _createSuper$1(LinearProjection);

  /**
   * @param {PIXI.Transform} legacy 
   * @param {Boolean} enabled
   */
  function LinearProjection(legacy, enabled) {
    var _this;

    _classCallCheck(this, LinearProjection);

    _this = _super.call(this, legacy, enabled);

    _defineProperty(_assertThisInitialized(_this), "_projID", 0);

    _defineProperty(_assertThisInitialized(_this), "_currentProjID", -1);

    _defineProperty(_assertThisInitialized(_this), "_affine", AFFINE.NONE);

    _defineProperty(_assertThisInitialized(_this), "affinePreserveOrientation", false);

    _defineProperty(_assertThisInitialized(_this), "scaleAfterAffine", true);

    return _this;
  }

  _createClass(LinearProjection, [{
    key: "affine",
    get: function get() {
      return this._affine;
    }
    /**
     * @override
     */
    ,
    set: function set(val) {
      this._affine = val;
      this._currentProjID = -1;
      this.legacy._currentLocalID = -1;
    }
  }, {
    key: "enabled",
    set: function set(val) {
      this._enabled = val;

      if (val) {
        this.legacy.updateTransform = transformHack;
      } else {
        this.legacy.updateTransform = Transform.prototype.updateTransform;
      }

      this.legacy._parentID = -1;
    }
    /**
     * @override
     */

  }, {
    key: "clear",
    value: function clear() {
      this._currentProjID = -1;
      this._projID = 0;
    }
  }]);

  return LinearProjection;
}(AbstractProjection);

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 16:25:05
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-05 16:28:19
 */

function getIntersectionFactor(p1, p2, p3, p4, out) {
  var A1 = p2.x - p1.x,
      B1 = p3.x - p4.x,
      C1 = p3.x - p1.x;
  var A2 = p2.y - p1.y,
      B2 = p3.y - p4.y,
      C2 = p3.y - p1.y;
  var D = A1 * B2 - A2 * B1;

  if (Math.abs(D) < 1e-7) {
    out.x = A1;
    out.y = A2;
    return 0;
  }

  var T = C1 * B2 - C2 * B1;
  var U = A1 * C2 - A2 * C1;
  var t = T / D,
      u = U / D;

  if (u < 1e-6 || u - 1 > -1e-6) {
    return -1;
  }

  out.x = p1.x + t * (p2.x - p1.x);
  out.y = p1.y + t * (p2.y - p1.y);
  return 1;
}

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var t0 = new Point();
var tt = [new Point(), new Point(), new Point(), new Point()];
var tempRect = new Rectangle();
var tempMat = new Matrix2d();
var Projection2d = /*#__PURE__*/function (_LinearProjection) {
  _inherits(Projection2d, _LinearProjection);

  var _super = _createSuper$2(Projection2d);

  /**
   * @param {PIXI.Transform} lagacy 
   * @param {Boolean} enabled
   */
  function Projection2d(lagacy, enabled) {
    var _this;

    _classCallCheck(this, Projection2d);

    _this = _super.call(this, lagacy, enabled);

    _defineProperty(_assertThisInitialized(_this), "matrix", new Matrix2d());

    _defineProperty(_assertThisInitialized(_this), "pivot", new ObservablePoint(_this.onChange, _assertThisInitialized(_this), 0, 0));

    _defineProperty(_assertThisInitialized(_this), "reverseLocalOrder", false);

    _this.local = new Matrix2d();
    _this.world = new Matrix2d();
    return _this;
  }

  _createClass(Projection2d, [{
    key: "onChange",
    value: function onChange() {
      var pivot = this.pivot;
      var mat3 = this.matrix.mat3;
      mat3[6] = -(pivot._x * mat3[0] + pivot._y * mat3[3]);
      mat3[7] = -(pivot._x * mat3[1] + pivot._y * mat3[4]);
      this._projID++;
    }
  }, {
    key: "setAxisX",
    value: function setAxisX(p) {
      var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var x = p.x,
          y = p.y;
      var d = Math.sqrt(x * x + y * y);
      var mat3 = this.matrix.mat3;
      mat3[0] = x / d;
      mat3[1] = y / d;
      mat3[2] = factor / d;
      this.onChange();
    }
  }, {
    key: "setAxisY",
    value: function setAxisY(p) {
      var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var x = p.x,
          y = p.y;
      var d = Math.sqrt(x * x + y * y);
      var mat3 = this.matrix.mat3;
      mat3[3] = x / d;
      mat3[4] = y / d;
      mat3[5] = factor / d;
      this.onChange();
    }
    /**
     * @param {PIXI.Sprite} sprite 
     * @param {Array<Point>} quad 
     */

  }, {
    key: "mapSprite",
    value: function mapSprite(sprite, quad) {
      var tex = sprite.texture;
      tempRect.x = -sprite.anchor.x * tex.orig.width;
      tempRect.y = -sprite.anchor.y * tex.orig.height;
      tempRect.width = tex.orig.width;
      tempRect.height = tex.orig.height;
      return this.mapQuad(tempRect, quad);
    }
    /**
     * @param {PIXI.Rectangle} rect 
     * @param {Array<Point>} p 
     */

  }, {
    key: "mapQuad",
    value: function mapQuad(rect, p) {
      // getPositionFromQuad(p, anchor, t0);
      tt[0].set(rect.x, rect.y);
      tt[1].set(rect.x + rect.width, rect.y);
      tt[2].set(rect.x + rect.width, rect.y + rect.height);
      tt[3].set(rect.x, rect.y + rect.height);
      var k1 = 1,
          k2 = 2,
          k3 = 3;
      var f = getIntersectionFactor(p[0], p[2], p[1], p[3], t0);

      if (f !== 0) {
        k1 = 1;
        k2 = 3;
        k3 = 2;
      } else {
        return;
        /*
        f = getIntersectionFactor(p[0], p[1], p[2], p[3], t0)
        if (f > 0) {
          k1 = 2
          k2 = 3
          k3 = 1
        } 
        else {
          f = getIntersectionFactor(p[0], p[3], p[1], p[2], t0)
          if (f > 0) {
            // cant find it :(
            k1 = 1
            k2 = 2
            k3 = 3
          } 
          else {
            return
          }
        }
        */
      }

      var d0 = Math.sqrt((p[0].x - t0.x) * (p[0].x - t0.x) + (p[0].y - t0.y) * (p[0].y - t0.y));
      var d1 = Math.sqrt((p[k1].x - t0.x) * (p[k1].x - t0.x) + (p[k1].y - t0.y) * (p[k1].y - t0.y));
      var d2 = Math.sqrt((p[k2].x - t0.x) * (p[k2].x - t0.x) + (p[k2].y - t0.y) * (p[k2].y - t0.y));
      var d3 = Math.sqrt((p[k3].x - t0.x) * (p[k3].x - t0.x) + (p[k3].y - t0.y) * (p[k3].y - t0.y));
      var q0 = (d0 + d3) / d3;
      var q1 = (d1 + d2) / d2;
      var q2 = (d1 + d2) / d1;
      var mat3 = this.matrix.mat3;
      mat3[0] = tt[0].x * q0;
      mat3[1] = tt[0].y * q0;
      mat3[2] = q0;
      mat3[3] = tt[k1].x * q1;
      mat3[4] = tt[k1].y * q1;
      mat3[5] = q1;
      mat3[6] = tt[k2].x * q2;
      mat3[7] = tt[k2].y * q2;
      mat3[8] = q2;
      this.matrix.invert();
      mat3 = tempMat.mat3;
      mat3[0] = p[0].x;
      mat3[1] = p[0].y;
      mat3[2] = 1;
      mat3[3] = p[k1].x;
      mat3[4] = p[k1].y;
      mat3[5] = 1;
      mat3[6] = p[k2].x;
      mat3[7] = p[k2].y;
      mat3[8] = 1;
      this.matrix.setToMult(tempMat, this.matrix);
      this._projID++;
    }
    /**
     * @param {PIXI.Matrix} lt 
     */

  }, {
    key: "updateLocalTransform",
    value: function updateLocalTransform(lt) {
      if (this._projID !== 0) {
        if (this.reverseLocalOrder) {
          // tilingSprite inside order
          this.local.setToMultLegacy2(this.matrix, lt);
        } else {
          // good order
          this.local.setToMultLegacy(lt, this.matrix);
        }
      } else {
        this.local.copyFrom(lt);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _get(_getPrototypeOf(Projection2d.prototype), "clear", this).call(this);

      this.matrix.identity();
      this.pivot.set(0, 0);
    }
  }]);

  return Projection2d;
}(LinearProjection);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Container2d = /*#__PURE__*/function (_Container) {
  _inherits(Container2d, _Container);

  var _super = _createSuper$3(Container2d);

  function Container2d() {
    var _this;

    _classCallCheck(this, Container2d);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "proj", {});

    _this.proj = new Projection2d(_this.transform);
    return _this;
  }
  /**
   * @override
   * @param {PIXI.Point} position 
   * @param {PIXI.DisplayObject} from 
   * @param {PIXI.Point} point 
   * @param {Boolean} skipUpdate 
   * @param {TRANSFORM_STEP} step
   * @returns {PIXI.Point}
   */


  _createClass(Container2d, [{
    key: "toLocal",
    value: function toLocal(position, from, point) {
      var skipUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TRANSFORM_STEP.ALL;

      if (from) {
        position = from.toGlobal(position, point, skipUpdate);
      }

      if (!skipUpdate) {
        this._recursivePostUpdateTransform();
      }

      if (step >= TRANSFORM_STEP.PROJ) {
        if (!skipUpdate) {
          this.displayObjectUpdateTransform();
        }

        if (this.proj.affine) {
          return this.transform.worldTransform.applyInverse(position, point);
        }

        return this.proj.world.applyInverse(position, point);
      }

      if (this.parent) {
        point = this.parent.worldTransform.applyInverse(position, point);
      } else {
        point.copyFrom(position);
      }

      if (step === TRANSFORM_STEP.NONE) {
        return point;
      }

      return this.transform.localTransform.applyInverse(point, point);
    }
    /**
     * @override
     */

  }, {
    key: "worldTransform",
    get: function get() {
      return this.proj.affine ? this.transform.worldTransform : this.proj.world;
    }
  }]);

  return Container2d;
}(Container);
var container2dToLocal = Container2d.prototype.toLocal;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Sprite2d = /*#__PURE__*/function (_Sprite) {
  _inherits(Sprite2d, _Sprite);

  var _super = _createSuper$4(Sprite2d);

  function Sprite2d(texture) {
    var _this;

    _classCallCheck(this, Sprite2d);

    _this = _super.call(this, texture);

    _defineProperty(_assertThisInitialized(_this), "vertexData2d", null);

    _defineProperty(_assertThisInitialized(_this), "proj", {});

    _this.proj = new Projection2d(_this.transform);
    _this.pluginName = 'batch2d';
    return _this;
  }
  /**
   * @override
   * @param {PIXI.Point} position 
   * @param {PIXI.DisplayObject} from 
   * @param {PIXI.Point} point 
   * @param {Boolean} skipUpdate 
   * @param {TRANSFORM_STEP} step
   * @returns {PIXI.Point}
   */


  _createClass(Sprite2d, [{
    key: "toLocal",
    value: function toLocal(position, from, point) {
      var skipUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TRANSFORM_STEP.ALL;
      return container2dToLocal.call(this, position, from, point, skipUpdate, step);
    }
    /**
     * @override
     */

  }, {
    key: "worldTransform",
    get: function get() {
      return this.proj.affine ? this.transform.worldTransform : this.proj.world;
    }
  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {
      this.calculateTrimmedVertices();

      this._bounds.addQuad(this.vertexTrimmedData);
    }
  }, {
    key: "calculateVertices",
    value: function calculateVertices() {
      var texture = this._texture;

      if (this.proj._affine) {
        this.vertexData2d = null;

        _get(_getPrototypeOf(Sprite2d.prototype), "calculateVertices", this).call(this);

        return;
      }

      if (!this.vertexData2d) {
        this.vertexData2d = new Float32Array(12);
      }

      if (this._transformID === this.transform._worldID && this._textureID === texture._updateID) {
        return;
      } // update texture UV here, because base texture can be changed without calling `_onTextureUpdate`


      if (this._textureID !== texture._updateID) {
        this.uvs = texture._uvs.uvsFloat32;
      }

      this._transformID = this.transform._worldID;
      this._textureID = texture._updateID;
      var wt = this.proj.world.mat3;
      var vertexData2d = this.vertexData2d;
      var vertexData = this.vertexData;
      var trim = texture.trim;
      var orig = texture.orig;
      var anchor = this._anchor;
      var w0 = 0;
      var w1 = 0;
      var h0 = 0;
      var h1 = 0;

      if (trim) {
        w1 = trim.x - anchor._x * orig.width;
        w0 = w1 + trim.width;
        h1 = trim.y - anchor._y * orig.height;
        h0 = h1 + trim.height;
      } else {
        w1 = -anchor._x * orig.width;
        w0 = w1 + orig.width;
        h1 = -anchor._y * orig.height;
        h0 = h1 + orig.height;
      }

      vertexData2d[0] = wt[0] * w1 + wt[3] * h1 + wt[6];
      vertexData2d[1] = wt[1] * w1 + wt[4] * h1 + wt[7];
      vertexData2d[2] = wt[2] * w1 + wt[5] * h1 + wt[8];
      vertexData2d[3] = wt[0] * w0 + wt[3] * h1 + wt[6];
      vertexData2d[4] = wt[1] * w0 + wt[4] * h1 + wt[7];
      vertexData2d[5] = wt[2] * w0 + wt[5] * h1 + wt[8];
      vertexData2d[6] = wt[0] * w0 + wt[3] * h0 + wt[6];
      vertexData2d[7] = wt[1] * w0 + wt[4] * h0 + wt[7];
      vertexData2d[8] = wt[2] * w0 + wt[5] * h0 + wt[8];
      vertexData2d[9] = wt[0] * w1 + wt[3] * h0 + wt[6];
      vertexData2d[10] = wt[1] * w1 + wt[4] * h0 + wt[7];
      vertexData2d[11] = wt[2] * w1 + wt[5] * h0 + wt[8];
      vertexData[0] = vertexData2d[0] / vertexData2d[2];
      vertexData[1] = vertexData2d[1] / vertexData2d[2];
      vertexData[2] = vertexData2d[3] / vertexData2d[5];
      vertexData[3] = vertexData2d[4] / vertexData2d[5];
      vertexData[4] = vertexData2d[6] / vertexData2d[8];
      vertexData[5] = vertexData2d[7] / vertexData2d[8];
      vertexData[6] = vertexData2d[9] / vertexData2d[11];
      vertexData[7] = vertexData2d[10] / vertexData2d[11];
    }
  }, {
    key: "calculateTrimmedVertices",
    value: function calculateTrimmedVertices() {
      if (this.proj._affine) {
        _get(_getPrototypeOf(Sprite2d.prototype), "calculateTrimmedVertices", this).call(this);

        return;
      }

      if (!this.vertexTrimmedData) {
        this.vertexTrimmedData = new Float32Array(8);
      } else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) {
        return;
      }

      this._transformTrimmedID = this.transform._worldID;
      this._textureTrimmedID = this._texture._updateID; // lets do some special trim code!

      var texture = this._texture;
      var vertexData = this.vertexTrimmedData;
      var orig = texture.orig;
      var anchor = this._anchor; // lets calculate the new untrimmed bounds..

      var wt = this.proj.world.mat3;
      var w1 = -anchor._x * orig.width;
      var w0 = w1 + orig.width;
      var h1 = -anchor._y * orig.height;
      var h0 = h1 + orig.height;
      var z = 1.0 / (wt[2] * w1 + wt[5] * h1 + wt[8]);
      vertexData[0] = z * (wt[0] * w1 + wt[3] * h1 + wt[6]);
      vertexData[1] = z * (wt[1] * w1 + wt[4] * h1 + wt[7]);
      z = 1.0 / (wt[2] * w0 + wt[5] * h1 + wt[8]);
      vertexData[2] = z * (wt[0] * w0 + wt[3] * h1 + wt[6]);
      vertexData[3] = z * (wt[1] * w0 + wt[4] * h1 + wt[7]);
      z = 1.0 / (wt[2] * w0 + wt[5] * h0 + wt[8]);
      vertexData[4] = z * (wt[0] * w0 + wt[3] * h0 + wt[6]);
      vertexData[5] = z * (wt[1] * w0 + wt[4] * h0 + wt[7]);
      z = 1.0 / (wt[2] * w1 + wt[5] * h0 + wt[8]);
      vertexData[6] = z * (wt[0] * w1 + wt[3] * h0 + wt[6]);
      vertexData[7] = z * (wt[1] * w1 + wt[4] * h0 + wt[7]);
    }
  }]);

  return Sprite2d;
}(Sprite);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Text2d = /*#__PURE__*/function (_Text) {
  _inherits(Text2d, _Text);

  var _super = _createSuper$5(Text2d);

  /**
   * @param {String} text 
   * @param {PIXI.TextStyle/Object} style 
   * @param {HTMLCanvasElement} canvas 
   */
  function Text2d(text, style, canvas) {
    var _this;

    _classCallCheck(this, Text2d);

    _this = _super.call(this, text, style, canvas);

    _defineProperty(_assertThisInitialized(_this), "vertexData2d", null);

    _defineProperty(_assertThisInitialized(_this), "proj", {});

    _this.proj = new Projection2d(_this.transform);
    _this.pluginName = 'batch2d';
    return _this;
  }

  _createClass(Text2d, [{
    key: "worldTransform",
    get: function get() {
      return this.proj.affine ? this.transform.worldTransform : this.proj.world;
    }
  }]);

  return Text2d;
}(Text);
Text2d.prototype.calculateVertices = Sprite2d.prototype.calculateVertices;
Text2d.prototype.calculateTrimmedVertices = Sprite2d.prototype.calculateTrimmedVertices;
Text2d.prototype._calculateBounds = Sprite2d.prototype._calculateBounds;

/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 10:45:40
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 17:32:42
 */
/**
 * 注册sprite-2d的渲染器，使其能正常工作
 * @param {PIXI.Renderer} renderer 
 */

function registerProjection(renderer) {
  renderer.registerPlugin('batch2d', Batch2dPlugin);
}

export { AFFINE, Container2d, Matrix2d, Projection2d, Sprite2d, TRANSFORM_STEP, Text2d, registerProjection };
//# sourceMappingURL=pixi-projection2d.esm.js.map
