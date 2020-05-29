<script>
/**
 * 小程序的 App.vue 不需提供模板
 */
import Vue from 'vue'

export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
})
</script>

<style>
/*每个页面公共css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
