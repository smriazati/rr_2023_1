<template>
  <div ref="videoWrapper" class="video-wrapper">
    <div v-if="subtitles">
      <video
        ref="video"
        :controls="controls"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
      >
        <source :src="src" type="video/mp4" />
        <source type="mp4" />
        <track
          :label="subtitles.label"
          kind="subtitles"
          :srclang="subtitles.lang"
          :src="subtitles.src"
          default
        />
      </video>
    </div>
    <div v-else>
      <video
        ref="video"
        :controls="controls"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
      >
        <source :src="src" type="video/mp4" />
        <source type="mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    muted: {
      type: Boolean,
      required: false,
    },
    autoplay: {
      type: Boolean,
      required: false,
    },
    controls: {
      type: Boolean,
      required: false,
    },
    loop: {
      type: Boolean,
      required: false,
    },
    subtitles: {
      type: Object, // src, label, srclang
      required: false,
    },
  },
  mounted() {
    const vid = this.$refs.video;
    if (vid) {
      vid.addEventListener("ended", () => {
        this.onVidEnd();
      });
    }
  },
  data() {
    return {
      isVidEnded: false,
    };
  },
  methods: {
    onVidEnd() {
      console.log("emitting end");

      this.isVidEnded = true;
      this.$emit("vid-ended");
    },
  },
  computed: {
    videoSrc() {
      const element = this.$cloudinary.video.url(this.src, {
        format: "mp4",
      });
      return element;
    },
  },
};
</script>

<style lang="scss">
.video-wrapper {
  display: flex;
  margin-bottom: 30px;
}
</style>