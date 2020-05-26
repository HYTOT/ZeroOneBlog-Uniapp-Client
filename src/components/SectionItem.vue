<template>
  <view class="section-item" @click="$emit('tapItem')">
    <text class="title">{{ title }}</text>
    <text class="title2" :style="{ color: title2Color }">
      {{ title2 && titleSlice }}
    </text>
    <image src="/static/images/arrow.png"
      class="icon-angle-right"></image>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SectionItem extends Vue {

  @Prop(String)
  private iconUrl?:string
  @Prop(String)
  private iconColor?:string
  @Prop(String)
  private title?:string
  @Prop(String)
  private title2?:string
  @Prop({ type: String, default: '#888' })
  private title2Color?:string
  @Prop(String)
  private hotText?:string

  private get titleSlice():string | undefined {
    return (this.title2 && this.title2.length <= 10)
      ? this.title2
      : this.title2?.slice(0, 10).concat('...')
  }

}
</script>

<style lang="scss" scoped>
.section-item {
  width: inherit;
  height: 15vw;
  display: flex;
  align-items: center;
  user-select: none;
  background: white;
  margin: -.5vw 0;
  border: {
    top: .1vw solid #dedede;
    bottom: .1vw solid #dedede;
  }
  .title {
    font: {
      size: 5vw;
      weight: bold;
    }
    padding-left: 5vw;
    width: 30vw;
    color: #666;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title2 {
    flex: 1;
    color: #999;
    font-size: 4vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .icon-angle-right {
    width: 4vw;
    height: 4vw;
    margin: 5.5vw;
  }
  .hot-text {
    font-size: 3.5vw;
    min-width: 5.5vw;
    color: white;
    background: #e74c3c;
    padding: .8vw 1vw;
    border-radius: 3.5vw;
    position: absolute;
    left: 80vw;
    @extend .flexCenter;
  }
}
</style>