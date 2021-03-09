/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 17:44:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:53:14
 */
import { ref } from 'vue'

import ButtonView from '@/views/ButtonView/ButtonView.vue'
import ProgressBarView from '@/views/ProgressBarView/ProgressBarView.vue'
import DragView from '@/views/DragView/DragView.vue'
import ProjectionView from '@/views/ProjectionView/ProjectionView.vue'

export default {
  name: 'App',
  components: {
    ButtonView,
    ProgressBarView,
    DragView,
    ProjectionView
  },
  setup () {
    let curView = ref('ProjectionView')

    return { curView }
  }
}