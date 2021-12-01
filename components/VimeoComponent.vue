<template>
  <div class="vimeo-component">
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
        @timeupdate="onVidTimeUpdate"
        @ended="onVidEnded"
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
        controls: true,
        loop: false,
        autoplay: false,
        muted: false,
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
      this.$emit("on-vid-playing");
    },
    onVidEnded() {
      // console.log("ended now");
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
  padding: 30px;
  background: rgba(lighten($gray, 10), 0.3);
  border-radius: 6px;
  margin: 1rem;
  iframe {
    max-width: 1280px;
    max-height: 100vh;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
