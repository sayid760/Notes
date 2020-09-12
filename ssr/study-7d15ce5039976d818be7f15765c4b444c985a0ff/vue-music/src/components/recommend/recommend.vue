<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="slider-wrapper">
          <sliders>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="onloadHandler" />
              </a>
            </div>
          </sliders>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul v-if="discList.length">
            <li v-for="item in discList" @click="selectItem(item)" :key="item.dissid" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Sliders from "@/base/sliders/sliders";
import { getRecommend, getDiscList } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
export default {
  data: function() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  components: {
    Sliders,
    Scroll,
    Loading
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    selectItem(item) {
      console.log(item);
    },
    onloadHandler() {
      if (this.loadCheck) return;
      this.loadCheck = true;
      this.$refs.scroll.refresh();
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }
  }
}

.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>