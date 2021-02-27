/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 17:44:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-27 10:17:03
 */
import { ref } from 'vue'

import ActiveContainerView from '@/views/ActiveContainerView/ActiveContainerView.vue'
import ProgressBarView from '@/views/ProgressBarView/ProgressBarView.vue'

export default {
  name: 'App',
  components: {
    ActiveContainerView,
    ProgressBarView,
  },
  setup () {
    let curView = ref('ActiveContainerView')

    return { curView }
  }
}