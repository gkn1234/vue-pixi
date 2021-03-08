/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 17:44:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 17:06:26
 */
import { ref } from 'vue'

import ActiveContainerView from '@/views/ActiveContainerView/ActiveContainerView.vue'
import ProgressBarView from '@/views/ProgressBarView/ProgressBarView.vue'
import DragView from '@/views/DragView/DragView.vue'
import ProjectionView from '@/views/ProjectionView/ProjectionView.vue'

export default {
  name: 'App',
  components: {
    ActiveContainerView,
    ProgressBarView,
    DragView,
    ProjectionView
  },
  setup () {
    let curView = ref('ProjectionView')

    return { curView }
  }
}