/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 11:08:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-05 18:52:46
 */
import { Transform } from 'pixi.js'
import { AbstractProjection } from './AbstractProjection.js'
import { AFFINE } from '../Matrix2d.js'

/**
 * pixi-projection 内部的黑客变换方法
 * @param {PIXI.Transform} thisTrans 
 * @param {PIXI.Transform} parentTrans 
 */
function transformHack (thisTrans, parentTrans) {
  const { localTransform, worldTransform, proj } = thisTrans

  const scaleAfterAffine = proj.scaleAfterAffine && proj.affine >= 2

  if (thisTrans._localID !== thisTrans._currentLocalID) {
    // get the matrix values of the displayobject based on its transform properties..
    if (scaleAfterAffine) {
      localTransform.a = thisTrans._cx
      localTransform.b = thisTrans._sx
      localTransform.c = thisTrans._cy
      localTransform.d = thisTrans._sy

      localTransform.tx = thisTrans.position._x
      localTransform.ty = thisTrans.position._y
    }
    else {
      localTransform.a = thisTrans._cx * thisTrans.scale._x
      localTransform.b = thisTrans._sx * thisTrans.scale._x
      localTransform.c = thisTrans._cy * thisTrans.scale._y
      localTransform.d = thisTrans._sy * thisTrans.scale._y

      localTransform.tx = thisTrans.position._x - ((thisTrans.pivot._x * localTransform.a) + (thisTrans.pivot._y * localTransform.c))
      localTransform.ty = thisTrans.position._y - ((thisTrans.pivot._x * localTransform.b) + (thisTrans.pivot._y * localTransform.d))
    }

    thisTrans._currentLocalID = thisTrans._localID
    // force an update..
    proj._currentProjID = -1
  }

  if (proj._currentProjID !== proj._projID) {
    proj._currentProjID = proj._projID
    proj.updateLocalTransform(lt)
    thisTrans._parentID = -1
  }

  if (thisTrans._parentID !== parentTrans._worldID) {
    const parentProj = parentTrans.proj
    if (parentProj && !parentProj._affine) {
      proj.world.setToMult(parentProj.world, proj.local);
    }
    else {
      proj.world.setToMultLegacy(parentTrans.worldTransform, proj.local);
    }

    proj.world.copyTo(worldTransform, proj._affine, proj.affinePreserveOrientation);

    if (scaleAfterAffine) {
      worldTransform.a *= ta.scale._x
      worldTransform.b *= ta.scale._x
      worldTransform.c *= ta.scale._y
      worldTransform.d *= ta.scale._y

      worldTransform.tx -= ((thisTrans.pivot._x * worldTransform.a) + (thisTrans.pivot._y * worldTransform.c))
      worldTransform.ty -= ((thisTrans.pivot._x * worldTransform.b) + (thisTrans.pivot._y * worldTransform.d))
    }
    thisTrans._parentID = pwid
    thisTrans._worldID++
  }
}

export class LinearProjection extends AbstractProjection {
  /**
   * @param {PIXI.Transform} lagacy 
   * @param {Boolean} enabled
   */
  constructor (lagacy, enabled) {
    super(lagacy, enabled)
  }

  _projID = 0
  _currentProjID = -1
  _affine = AFFINE.NONE
  affinePreserveOrientation = false
  scaleAfterAffine = true

  set affine(val) {
    this._affine = val
    this._currentProjID = -1
    this.lagacy._currentLocalID = -1
  }
  get affine() { return this._affine }

  /**
   * @override
   */
  set enabled (val) {
    this._enabled = val
    if (val) {
      this.lagacy.updateTransform = transformHack
    }
    else {
      this.legacy.updateTransform = Transform.prototype.updateTransform
    }
    this.lagacy._parentID = -1
  }

  /**
   * @override
   */
  clear () {
    this._currentProjID = -1
    this._projID = 0
  }
}