<template>
  <view class="logo-header">
    <view class="top" :class="{ hide }">
      <view class="logo">
        <image src="/static/images/logo.png"/>
        <text class="logo-title">{{ title }}</text>
      </view>
      <image class="more" src="/static/images/more.png"
        @click="$emit('tapMore')"/>
    </view>
    <view class="bottom">
      <text class="type-title">{{ type }}文章</text>
      <view class="other-pages">
        <text @click="switchPage('message')">留言</text>
        <text @click="switchPage('about')">关于</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import uni from '@dcloudio/uni-app-plus'

@Component
export default class LogoHeader extends Vue {

  @Prop({ type: String, default: 'Zero One Blog' })
  private title?:string
  @Prop({ type: String, default: '全部分类' })
  private type?:string

  private hide:boolean = false

  public setHide(hide:boolean) {
    this.hide = hide
  }
  private switchPage(url:string):void {
    uni.navigateTo({
      url: `/pages/${url}/${url}`
    })
  }

}
</script>

<style lang="scss" scoped>
.logo-header {
  width: 100vw;
  height: 18vw;
  background: white;
  box-shadow: 0 1vw 3vw #ccc;
  user-select: none;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
  .top {
    height: 18vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .2s;
    &.hide {
      transform: translateY(-18vw);
      height: 0;
    }
    .logo {
      display: flex;
      align-items: center;
      transform: skewX(-10deg);
      transform-origin: left;
      image {
        width: 15vw;
        height: 15vw;
        margin: 2.5vw;
      }
      .logo-title {
        font-size: 5vw;
        color: #666;
      }
    }
    .more {
      width: 6vw;
      height: 6vw;
      padding: 2vw;
      color: #666;
      border: .5vw double #ccc;
      border-radius: 2vw;
      margin: 0 5vw;
      transition: all .3s;
      &:active {
        background: #ccc;
        transform: scale(.95);
        box-shadow: 0 0 2vw #666 inset;
      }
    }
  }
  .bottom {
    height: 18vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    .type-title {
      font: {
        size: 5vw;
        weight: bold;
      }
      color: #666;
    }
    .other-pages {
      text {
        font-size: 4.5vw;
        margin-left: 5vw;
        color: $vue-color;
      }
    }
  }
}
</style>