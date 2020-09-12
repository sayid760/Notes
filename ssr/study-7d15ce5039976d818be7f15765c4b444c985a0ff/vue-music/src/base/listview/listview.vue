<template>
  <div class="wrapper">
    <scroll
      @scroll="scroll"
      :probe-type="probeType"
      :listenScroll="listenScroll"
      v-if="data.length"
      class="listview"
      ref="listview"
      :data="data"
    >
      <ul>
        <li class="list-group" ref="listGroup"></li>
        <li v-for="group in data" class="list-group" ref="listGroup" :key="group.title">
          <h2 class="list-group-title">{{group.title}}</h2>
          <uL>
            <li
              @click="selectItem(item)"
              v-for="item in group.items"
              class="list-group-item"
              :key="item.id"
            >
              <img class="avatar" v-lazy="item.avatar" />
              <span class="name">{{item.name}}</span>
            </li>
          </uL>
        </li>
      </ul>
    </scroll>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="index"
          class="item"
          :class="{'current':currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import { getData } from "@/common/js/dom";

const ANCHOR_HEIGHT = 18;

export default {
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  },
  created() {
    this.touch = {};
    this.listHeight = [];
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      if (newY) {
        this.currentIndex = 0;
      }
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
        }
      }
    }
  },
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 3
    },
    listenScroll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectItem(item) {},
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = parseInt(anchorIndex);
      this.currentIndex = parseInt(this.touch.anchorIndex);
      this._scrollTo(parseInt(this.touch.anchorIndex));
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this.currentIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    scroll(p) {
      this.scrollY = p.y;
    },

    _calculateHeight() {
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },

    _scrollTo(index) {
      // if (!index && index !== 0) {
      //   return;
      // }
      // if (index < 0) {
      //   index = 0;
      // } else if (index > this.listHeight.length - 2) {
      //   index = this.listHeight.length - 2;
      // }
      // this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .list-shortcut {
    position: fixed;
    z-index: 30;
    right: 0;
    top: 60%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    font-size: $font-size-small-s;

    .item {
      line-height: 18px;
    }

    .current {
      color: $color-theme;
    }
  }

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
      padding-bottom: 30px;

      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }

      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
  }
}
</style>