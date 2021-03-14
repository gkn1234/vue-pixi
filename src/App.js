/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 17:44:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-14 16:30:31
 */
import { ref } from 'vue'

import ButtonView from '@/views/ButtonView/ButtonView.vue'
import ProgressBarView from '@/views/ProgressBarView/ProgressBarView.vue'
import DragView from '@/views/DragView/DragView.vue'
import ProjectionView from '@/views/ProjectionView/ProjectionView.vue'
import GraphicView from '@/views/GraphicView/GraphicView.vue'

export default {
  name: 'App',
  components: {
    ButtonView,
    ProgressBarView,
    DragView,
    ProjectionView,
    GraphicView
  },
  setup () {
    let curView = ref('ButtonView')

    return { curView }
  }
}