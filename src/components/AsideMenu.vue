<template>
  <view class="aside-menu"
    :class="{ unfold }"
    @click="unfold = false">
    <view class="menu-block"
      @click.stop :style="{ width: `${width}vw` }">
      <view class="more-operations"
        :style="{ color: titleColor}">
        <text>{{ title }}</text>
      </view>
      <SectionItem title="全部分类"
        @tapItem="$emit('selectGenre', {
          id: 0,
          name: '全部分类',
        })"/>
      <view v-if="list.length">
        <SectionItem v-for="item in list" :key="item.id"
          :title="item.name" @tapItem="$emit('selectGenre', item)"/>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SectionItem from './SectionItem.vue'

@Component({
  components: {
    SectionItem,
  }
})
export default class AsideMenu extends Vue {

  @Prop({ type: String, default: '未命名标题：' })
  private title?:string
  @Prop({ type: String, default: '#42b983' })
  private titleColor?:string
  @Prop({ type: Number, default: 60 })
  private width?:number
  @Prop({ type: Array, default: [] })
  private list?:Array<any>

  private unfold:boolean = false

  public switchMenu():void {
    this.unfold = !this.unfold
  }

}
</script>

<style lang="scss" scoped>
.aside-menu {
  @extend .fullScreen;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translateX(-110vw);
  background: rgba(black, .5);
  transition: all .3s;
  opacity: 0;
  &.unfold {
    transform: translateY(0);
    opacity: 1;
  }
  .menu-block {
    height: 100vh;
    overflow-y: scroll;
    background: white;
    box-shadow: 0 0 3vw white;
    .more-operations {
      width: inherit;
      height: 20vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4vw 0;
      position: sticky;
      top: 0;
      background: white;
      box-shadow: 0 1vw 3vw #ccc;
      text {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0 5vw;
        font: {
          size: 6.5vw;
          weight: bold;
        }
      }
    }
  }
}
</style>