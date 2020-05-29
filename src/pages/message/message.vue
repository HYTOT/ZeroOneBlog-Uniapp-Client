<template>
  <view class="message">
    <form>
      <view class="message-title">给我们留言</view>
      <textarea class="message-area"/>
    </form>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Message extends Vue {

}
</script>

<style lang="scss" scoped>
.message {
  width: 100vw;
  form {
    width: 100vw;
    height: 80vw;
    @extend .flexCenter;
    .message-title {
      font-size: 5vw;
      color: #666;
    }
    .message-area {
      width: 80vw;
      height: 60vw;
      border: .3vw solid #666;
      border-radius: 1vw;
    }
  }
}
</style>