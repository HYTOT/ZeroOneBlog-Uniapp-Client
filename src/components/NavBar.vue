<template>
  <view class="navbar">
    <view v-for="(item, i) in NAV_LIST" :key="i"
      class="navitem" :class="{
        current: curentPage === item.path
      }"
      @click="$emit('switchPage', item.path)">
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NavItem } from '../utils/interface'

declare let getCurrentPages:Function

@Component
export default class NavBar extends Vue {

  private readonly NAV_LIST:Array<NavItem> = [
    { name: '首页', path: 'index' },
    { name: '留言', path: 'message' },
    { name: '关于', path: 'about' },
  ]

  private get curentPage():string {
    const arr:Array<string> = getCurrentPages()[0].route.split('/')
    return arr.slice(arr.length - 1).join('')
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100vw;
  height: 9vh;
  position: fixed;
  top: 91vh;
  background: white;
  box-shadow: 0 -1vw 3vw #ccc;
  color: #666;
  user-select: none;
  @extend .flexCenter;
  .navitem {
    height: inherit;
    flex: 1;
    @extend .flexCenter;
    font-size: 3vh;
    transition: all .3s;
    &.current {
      color: $vue-color;
    }
    &:active {
      background: #ccc;
      transform: scale(.9);
    }
  }
}
</style>