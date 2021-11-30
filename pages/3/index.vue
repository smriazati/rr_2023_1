<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="video-intro">
      <div class="video-background">
        <VimeoComponentBg ref="vidBg" vidId="650435263" />
      </div>
      <div class="video-intro-text">
        <div class="call-out">
          <div class="text-wrapper">
            <h1 class="center">Resistance to Oppression</h1>
            <p class="big">
              The Jews of Tuchyn were not just victims under German occupation.
              Instead, Jewish people resisted German and Ukrainian persecution
              in many different ways.
            </p>
          </div>
          <div class="text-wrapper instructions">
            <p>
              Watch a short film to learn about how Jews stood up to this
              oppression.
            </p>
            <p>
              As you watch this video, think about a time you practiced
              resistance in your life. What did you do? How do you feel about it
              now?
            </p>
            <button class="cursor-hover bright" @click="showFilm()">
              <span>Play video</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isFilmActive" class="resistance-film">
      <div class="col flex-col">
        <div class="iframe-wrapper">
          <vimeo-player
            ref="vid"
            key="650434994"
            video-url="https://vimeo.com/650434994"
            video-id="650434994"
            :options="options"
            @playing="onVidPlaying"
            @ended="onVidEnded"
          >
          </vimeo-player>
        </div>
        <div v-show="!isPaginationVisible" class="text">
          <p class="small muted">Complete the video to unlock the next page.</p>
        </div>
      </div>
      <button class="flat close-button" @click="hideFilm">
        <span class="icon icon-close"></span>
      </button>
    </div>

    <div v-show="isPaginationVisible">
      <Pagination link="/3/talkback" message="Reflect on Resistance" />
    </div>
  </div>
</template>


<script>
export default {
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
  data() {
    return {
      name: "resistance",
      isFilmEnded: false,
      isPaginationVisible: false,
      isFilmActive: false,
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
    onVidEnded() {
      this.isFilmEnded = true;
      this.showPagination();
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
    showFilm() {
      this.isFilmActive = true;
      this.pauseBgVid();
      this.playFilm();
    },
    hideFilm() {
      this.isFilmActive = false;
      this.playBgVid();
    },
    onVidPlaying() {
      this.isFilmPlaying = true;
    },
    pauseFilm() {
      this.$refs.vid.pause();
    },
    playFilm() {
      this.$refs.vid.play();
    },
    pauseBgVid() {
      if (this.$refs.vidBg) {
        this.$refs.vidBg.$refs.player.pause();
      }
    },
    playBgVid() {
      if (this.$refs.vidBg) {
        this.$refs.vidBg.$refs.player.play();
      }
    },
  },
};
</script>

<style lang="scss">
.resistance {
  .pagination {
    z-index: 999;
  }
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .video-intro {
    position: relative;
    width: 100%;
    height: 100%;
    .video-background {
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .video-intro-text {
    width: 50ch;
    position: absolute;
    z-index: 11;
    left: calc((100% - 50ch) / 2);
    max-height: 80%;
    height: 100%;
    max-width: 80%;
    // width: auto;
    top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .call-out {
      background: rgba($gray, 0.8);
      @media (max-height: 620px) {
        overflow-y: scroll;
      }
      border: 0;
    }
    p.big {
      font-size: 24px;
      line-height: 30px;
    }
  }
  .resistance-film {
    position: fixed;
    z-index: 909;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vw;
    background: rgba($gray, 0.95);

    div.col {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      min-height: 100vh;
    }
    .text {
      text-align: right;
      max-width: 1280px;
      margin-top: 30px;
      width: 100%;
      position: fixed;
      bottom: 30px;
      right: 30px;
      p {
        font-size: 16px;
        font-style: italic;
        color: lighten($gray, 60);
      }
    }
    .iframe-wrapper {
      padding: 0;
      margin: 0;
      max-width: 1280px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>