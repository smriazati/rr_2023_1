<template>
  <div class="vimeo-component" :class="isPlaying ? 'playing' : ''">
    <button class="visually-hidden pauseBtn" @click="pauseVid">Pause</button>
    <client-only>
      <div class="iframe-wrapper" v-if="vidId" ref="vidWrapper">
        <vimeo-player
          ref="vid"
          :key="vidId"
          :video-url="`https://vimeo.com/${vidId}`"
          :video-id="vidId"
          :options="options"
          @ready="onVidReady"
          @loaded="onVidLoaded"
          @playing="onVidPlaying"
          @pause="onVidPaused"
          @timeupdate="onVidTimeUpdate"
          @ended="onVidEnded"
        >
        </vimeo-player>
      </div>
    </client-only>
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
        controls: true,
        loop: false,
        autoplay: false,
        muted: false,
        portrait: false,
        title: false,
        byline: false,
      },
      isPlaying: false,
    };
  },
  methods: {
    pauseVid() {
      console.log("pausing now");
      this.$refs.vid.pause();
    },
    onVidLoaded() {
      // console.log("loaded");
    },
    onVidReady() {
      // console.log("ready now");
    },
    onVidPlaying() {
      console.log("playing now");
      this.isPlaying = true;
      this.$emit("on-vid-playing");
    },
    onVidPaused() {
      console.log("pausing now");
      this.isPlaying = false;
    },
    onVidEnded() {
      // console.log("ended now");
      this.isPlaying = false;

      this.$emit("on-vid-ended");
    },
    onVidTimeUpdate(event, data, player) {
      //   console.log(event, data, player);
    },
  },
};
</script>

<style lang="scss">
.vimeo-component {
  flex: 1;
  margin: 1rem;

  @media (min-width: $collapse-bp) {
    // padding: 30px;
    border-radius: 6px;
  }
  .iframe-wrapper {
    box-shadow: 0px 0px 100px #d8d8d861;
  }
  iframe {
    max-width: 1280px;
    max-height: 100vh;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
