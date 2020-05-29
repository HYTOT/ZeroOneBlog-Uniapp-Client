<template>
  <view class="blog-item">
    <view class="createtime">{{ item.createtime }}</view>
    <view class="title">{{ item.title }}</view>
    <view class="info">
      <text>{{ item.genre.name }}</text>
      <text>阅读量:{{ item.reader }}</text>
      <text>评论:{{ item.messages }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Technology, Article } from '../utils/interface'

@Component
export default class BlogItem extends Vue {

  @Prop({
    type: Object,
    default: {
      id: 1,
      genre: {
        id: 1,
        name: 'Vue.js',
      },
      createtime: '2020/01/01',
      title: '我是标题君',
      reader: 999,
      messages: 999,
    }
  })
  private item?:Article

}
</script>

<style lang="scss" scoped>
.blog-item {
  width: 80vw;
  height: 30vw;
  margin: -.5vw 5vw;
  padding: 5vw;
  border: .5vw dotted #ccc;
  border: {
    left: none;
    right: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .createtime {
    font-size: 4.5vw;
    color: #999;
  }
  .title {
    font: {
      size: 5vw;
      weight: bold;
    }
    color: #666;
  }
  .info {
    font-size: 4vw;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      &:nth-child(1) {
        width: 30vw;
        font-size: 4.5vw;
        color: #666;
      }
      &:nth-child(2), &:nth-child(3) {
        flex: 1;
      }
    }
  }
}
</style>