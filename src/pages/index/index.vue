<template>
  <view class="index">
    <LogoHeader :type="genre.name"
      @tapMore="showMore" ref="header"/>
    <AsideMenu title="技术栈：" :list="technologyList"
      @selectGenre="selectGenre" ref="aside"/>
    <scroll-view class="container"
      scroll-with-animation="true"
      @scroll="watchScroll" scroll-y="true"
      @scrolltolower="getMore">
      <swiper class="swiper" autoplay circular indicator-dots>
        <swiper-item v-for="i in 5" :key="i" class="swiper-item">
          <image :src="`/static/images/lun${i}.png`"/>
        </swiper-item>
      </swiper>
      <view class="blog-list">
        <BlogItem v-for="(article, i) in articleList"
          :key="i" :item="article"/>
      </view>
      <view class="loading">
        <text>{{ loadMsg }}</text>
      </view>
    </scroll-view>
    <van-toast id="van-toast"/>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LogoHeader from '../../components/LogoHeader.vue'
import AsideMenu from '../../components/AsideMenu.vue'
import BlogItem from '../../components/BlogItem.vue'
import axios from '../../http/axios.config'
import { ScrollViewEvent } from '../../utils/type'
import { Technology, Article } from '../../utils/interface'
import { AxiosResponse } from 'axios'

@Component({
  components: {
    LogoHeader,
    AsideMenu,
    BlogItem,
  }
})
export default class Index extends Vue {

  private timer:number = 0
  private technologyList:Array<Technology> = []
  private articleList:Array<Article> = []
  private haveMore:boolean = true
  private loadMsg:string = '上拉加载更多'
  private pageIndex:number = 0
  private pageSize:number = 5
  private genre:Technology = {
    id: 0,
    name: '全部分类',
  }

  private showMore():void {
    (this.$refs.aside as AsideMenu).switchMenu()
  }
  private watchScroll(e:ScrollViewEvent):void {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      (this.$refs.header as LogoHeader)
      .setHide(e.detail.deltaY < 0)
    }, 100)
  }
  private getDatas():void {
    axios.get('/sys/genre/list')
    .then((res:AxiosResponse) => {
      console.log(res.data)
      this.technologyList = Object.freeze(res.data)
      this.getMore()
    }).catch((mockData:Array<Technology>) => {
      console.log(mockData)
      this.technologyList = mockData
      this.getMore()
    })
  }
  private getMore():void {
    if (this.haveMore) {
      this.loadMsg = '拼命加载中...'
      axios.get(`/sys/article/list?page=${++this.pageIndex}&limit=${this.pageSize}&genre.id=${this.genre.id}`)
      .then((res:AxiosResponse) => {
        console.log(res.data)
        this.articleList.push(...Object.freeze(res.data))
        this.loadMsg = '上拉加载更多'
        if (res.data.length === 0) {
          this.haveMore = false
          this.loadMsg = '该类别暂无文章'
        } else if (this.noMore(res.data)) {
          this.haveMore = false
          this.loadMsg = '没有更多文章了'
        }
      }).catch((mockData:Array<Article>) => {
        console.log(mockData)
        this.articleList.push(...Object.freeze(mockData))
        this.loadMsg = '上拉加载更多'
        if (this.noMore(mockData)) {
          this.haveMore = false
          this.loadMsg = '没有更多文章了'
        }
      })
    } else {
      this.loadMsg = '没有更多文章了'
    }
  }
  private noMore(list:Array<any>):boolean {
    return list.length < this.pageSize
  }
  private selectGenre(genre:Technology):void {
    (this.$refs.aside as AsideMenu).switchMenu()
    if (genre.id !== this.genre.id) {
      this.genre = genre
      this.articleList = []
      this.pageIndex = 0
      this.haveMore = true
      this.getMore()
    }
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
      margin-bottom: 5vw;
      .swiper-item {
        @extend .flexCenter;
        height: 40vw;
        image {
          width: 100vw;
          height: 40vw;
        }
      }
    }
    .loading {
      width: 100vw;
      height: 10vw;
      font-size: 4vw;
      color: #7f8c8d;
      @extend .flexCenter;
    }
  }
}
</style>