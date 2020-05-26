<template>
  <view class="message">
    msg
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
}
</style>