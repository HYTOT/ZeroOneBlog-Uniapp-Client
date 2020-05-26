<template>
  <view class="index">
    <LogoHeader @tapMore="showMore" ref="header"/>
    <AsideMenu title="技术栈：" :list="technologyList" ref="aside"/>
    <scroll-view class="container"
      @scroll="watchScroll" scroll-y="true">
      <swiper class="swiper" autoplay circular indicator-dots>
        <swiper-item v-for="i in 5" :key="i" class="swiper-item">
          <image :src="`/static/images/lun${i}.png`"/>
        </swiper-item>
      </swiper>
      <view v-for="i in 50" :key="i">{{ i }}</view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LogoHeader from '../../components/LogoHeader.vue'
import AsideMenu from '../../components/AsideMenu.vue'
import axios from '../../http/axios.config'
import { ScrollViewEvent } from '../../utils/type'
import { Technology, UniAppAxiosError } from '../../utils/interface'
import { AxiosResponse } from 'axios'

@Component({
  components: {
    LogoHeader,
    AsideMenu,
  }
})
export default class Index extends Vue {

  private timer:number = 0
  private technologyList:Array<Technology> = [
    { id: 0, title: '全部分类' },
  ]

  private showMore():void {
    (this.$refs.aside as AsideMenu).switchMenu()
  }
  private watchScroll(e:ScrollViewEvent):void {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      (this.$refs.header as LogoHeader)
      .setHide(e.detail.deltaY < 0)
    }, 50)
  }
  private getDatas():void {
    axios.get('/technology')
    .then((res:AxiosResponse) => {
      console.log(res.data)
      this.technologyList = Object.freeze(res.data)
    }).catch((err:UniAppAxiosError<Array<Technology>>) => {
      console.log(err)
    })
  }

  private onLoad():void {
    this.getDatas()
  }

}
</script>

<style lang="scss" scoped>
.index {
  .container {
    height: 88vh;
    .swiper {
      height: 45vw;
      .swiper-item {
        @extend .flexCenter;
        height: 40vw;
        image {
          width: 100vw;
          height: 40vw;
        }
      }
    }
  }
}
</style>