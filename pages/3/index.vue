<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="stacked-divs">
      <div class="video-player-background">
        <video muted autoplay loop>
          <source src="/videos/03/videobg.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        :class="isPlayerVisible ? 'visually-hidden' : ''"
        class="video-instructions"
      >
        <div class="text-wrapper center">
          <h2>Resistance</h2>
          <p>
            Watch a short film about how the Jewish people of Tuchyn resisted
            occupation.
          </p>
          <p>Complete the video to unlock the next page.</p>
          <button class="cursor-hover bright" @click="setPlayerVisible">
            <span>Play video</span>
          </button>
        </div>
      </div>

      <div
        :class="
          isPlayerVisible
            ? isFirstView
              ? 'show-player-first-view'
              : 'show-player'
            : 'hide-player'
        "
        class="video-player-foreground"
      >
        <div ref="videoPlayer" class="video-player">
          <video ref="video" controls>
            <source src="/videos/03/placeholder.mp4" type="video/mp4" />
          </video>
        </div>

        <div class="inline-instructions">
          <button class="flat" @click="openInstructionsInline">
            <span>View instructions</span>
          </button>
        </div>
      </div>
      <div v-show="isPaginationVisible">
        <Pagination
          link="/3/talkback"
          message="Reflect on the resistance movement"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: "resistance",
      isVideoStarted: false,
      isVideoEnded: false,
      isPaginationVisible: false,
      isPlayerVisible: false,
      areInlineInstructionsVisible: false,
      isFirstView: false,
      viewCount: 0,
    };
  },
  mounted() {
    this.addEventListenersToVideo(this.$refs.video);
  },
  watch: {
    isVideoEnded() {
      if (this.isVideoEnded) {
        this.showPagination();
      }
    },
  },
  methods: {
    setPlayerVisible() {
      this.isPlayerVisible = true;
      this.playVid(this.$refs.video);
      if (this.viewCount === 0) {
        this.isFirstView = true;
      } else {
        this.isFirstView = false;
      }
      this.viewCount = this.viewCount + 1;
    },
    setPlayerInvisible() {
      this.isPlayerVisible = false;
      this.pauseVid(this.$refs.video);
    },
    openInstructionsInline() {
      this.setPlayerInvisible();
    },
    toggleInlineInstructions() {
      this.areInlineInstructionsVisible = !this.areInlineInstructionsVisible;
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
    playVid(vid) {
      vid.play();
    },
    pauseVid(vid) {
      vid.pause();
    },
    addEventListenersToVideo(vid) {
      var media = vid;

      // Playing event
      media.addEventListener("playing", () => {
        // console.log("Playing event triggered");
        this.isVideoStarted = true;
      });

      // Pause event
      media.addEventListener("pause", () => {
        // console.log("Pause event triggered");
      });

      // Seeking event
      media.addEventListener("seeking", () => {
        // console.log("Seeking event triggered");
      });

      // Volume changed event
      media.addEventListener("volumechange", () => {
        // console.log("Volumechange event triggered");
      });

      // Volume changed event
      media.addEventListener("ended", () => {
        console.log("Ended event triggered");
        this.showPagination();
      });
    },
  },
};
</script>

<style lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes blurVid {
  from {
    filter: blur(0px) grayscale(0) brightness(1) contrast(1);
  }
  to {
    filter: blur(3px) grayscale(0.2) brightness(0.3) contrast(1.5);
  }
}
.resistance {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .video-player-background {
    background: black;
    width: 100%;
    max-width: 100%;
    height: 100%;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: blurVid 2.5s ease forwards;

      // filter: blur(3px) grayscale(0.2) brightness(0.3) contrast(1.5);
    }
  }
  .video-player-foreground {
    width: 90%;
    max-width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    z-index: 11;
    opacity: 0;
    &.show-player-first-view {
      animation: fadeIn 2.5s ease forwards;
    }
    &.show-player {
      animation: fadeIn 0.1s ease forwards;
    }
    .video-player {
      display: flex;
      justify-content: center;
    }
  }

  .video-instructions {
    background: rgba(0, 0, 0, 0.12);
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .text-wrapper {
      padding: 30px;
      border-radius: 30px;
      background: rgba(0, 0, 0, 0.42);
    }
  }

  .inline-instructions {
    color: #a1a1a1;

    button {
      padding-top: 15px;
      color: #a1a1a1;
      transition: 0.3s ease all;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>