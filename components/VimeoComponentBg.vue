<template>
  <div class="vimeo-component-bg">
    <div v-if="vidId" ref="vidWrapper" class="vid-wrapper vid-background">
      <vimeo-player
        class="video-foreground"
        ref="player"
        :key="vidId"
        :video-url="`https://vimeo.com/${vidId}`"
        :video-id="vidId"
        :options="options"
      >
      </vimeo-player>
    </div>
  </div>
</template>

<script>
// https://github.com/dobromir-hristov/vue-vimeo-player

export default {
  props: {
    vidId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: {
        controls: false,
        loop: true,
        autoplay: true,
        muted: true,
        portrait: false,
        title: false,
        byline: false,
      },
    };
  },
  methods: {
    onVidLoaded() {
      // console.log("loaded");
    },
    onVidReady() {
      // console.log("ready now");
    },
    onVidPlaying() {
      // console.log("playing now");
      // this.$emit("on-vid-playing");
    },
    onVidEnded() {
      // console.log("ended now");
      //   this.activateReplay();
      // this.$emit("on-vid-end");
    },
    onVidTimeUpdate(event, data, player) {
      //   console.log(event, data, player);
    },
  },
};
</script>

<style lang="scss">
.vimeo-component-bg {
  //   flex: 1;
  padding: 0;
  background: none;
  border-radius: 0;
  margin: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  // .vid-wrapper {
  //   width: 100%;
  //   height: 100%;
  //   min-width: 150vw;
  //   min-height: 150vw;
  //   transform: translateX(-50vw) translateY(-50vw);
  //   @media (max-width: $mobile-bp) {
  //     transform: translateX(-50vw) translateY(-25vw);
  //   }
  //   * {
  //     width: 100%;
  //     height: 100%;
  //     min-width: 150vw;
  //     min-height: 150vw;
  //   }
  // }

  .video-foreground,
  .vid-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  @media (min-aspect-ratio: 16/9) {
    .video-foreground {
      height: 300%;
      top: -100%;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground {
      width: 300%;
      left: -100%;
    }
  }
  iframe {
    max-width: unset;
  }
}
</style>
