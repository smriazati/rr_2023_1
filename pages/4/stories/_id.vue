<template>
  <div :class="name" class="story">
    <div ref="sliderWrapper" class="slider-wrapper">
      <div class="slider-area">
        <div v-show="activeState === 1" class="intro slide-item">
          <div class="text-wrapper">
            <nuxt-content :document="page.start" />
            <div class="buttons-bar flex-row">
              <button class="flat light align-right" @click="setActiveState(2)">
                <span class="text">Watch the video interview</span
                ><span class="arrow"><IconArrow /></span>
              </button>
            </div>
          </div>
        </div>
        <div v-show="activeState === 2" class="video slide-item">
          <CloudinaryVideo
            :src="videos[$route.params.id].src"
            :controls="true"
            :autoplay="false"
            :subtitles="videos[$route.params.id].subtitles"
            ref="videoComp"
          />
          <div class="buttons-bar flex-row">
            <button class="flat light align-left" @click="setActiveState(1)">
              <span class="icon-arrow icon icon-arrow-left"><IconArrow /></span
              ><span class="text">Go back</span>
            </button>
            <button class="flat light align-right" @click="setActiveState(3)">
              <span class="text">Next</span
              ><span class="arrow"><IconArrow /></span>
            </button>
          </div>
        </div>
        <div v-show="activeState === 3" class="story-conclusion slide-item">
          <div class="text-wrapper">
            <nuxt-content :document="page.end" />
            <div class="buttons-bar flex-row">
              <button class="flat light align-left" @click="setActiveState(2)">
                <span class="icon-arrow icon icon-arrow-left"
                  ><IconArrow /></span
                ><span class="text">Go back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-controls flex-row">
        <button
          :class="activeState === 1 ? 'active-slide' : ''"
          @click="setActiveState(1)"
        >
          <span></span>
        </button>
        <button
          :class="activeState === 2 ? 'active-slide' : ''"
          @click="setActiveState(2)"
        >
          <span></span>
        </button>
        <button
          :class="activeState === 3 ? 'active-slide' : ''"
          @click="setActiveState(3)"
        >
          <span></span>
        </button>
      </div>
    </div>

    <div v-if="isPaginationVisible">
      <Pagination link="/5" message="Move on to the conclusion" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const validRoutes = ["1", "2", "3"];
    if (!validRoutes.includes(params.id)) {
      return error({ statusCode: 404, message: "oops" });
    } else {
      const page_start = await $content(`04/${params.id}_start`).fetch();
      const page_end = await $content(`04/${params.id}_end`).fetch();
      return {
        page: {
          start: page_start,
          end: page_end,
        },
      };
    }
  },

  data() {
    return {
      name: "aftermath-stories-individual",
      states: [1, 2, 3],
      activeState: 1,
      isPaginationVisible: false,
      pageNames: {
        1: "Laura Oberlender",
        2: "Yosef Zilberberg",
        3: "Miriam Schwartzman",
      },
      videos: {
        1: {
          src: "https://res.cloudinary.com/dn8rmd4ql/video/upload/v1634926620/remembering-resistance-videos/04-placeholder_thon9a.mp4",
          subtitles: {
            src: "/placeholder_subs.vtt",
            label: "English",
            srclang: "en",
          },
        },
        2: {
          src: "https://res.cloudinary.com/dn8rmd4ql/video/upload/v1634926620/remembering-resistance-videos/04-placeholder_thon9a.mp4",
          subtitles: {
            src: "/placeholder_subs.vtt",
            label: "English",
            srclang: "en",
          },
        },
        3: {
          src: "https://res.cloudinary.com/dn8rmd4ql/video/upload/v1634926620/remembering-resistance-videos/04-placeholder_thon9a.mp4",
          subtitles: {
            src: "/placeholder_subs.vtt",
            label: "English",
            srclang: "en",
          },
        },
      },
    };
  },
  head() {
    return {
      title: this.pageNames[this.$route.params.id],
    };
  },
  mounted() {
    // console.log();
    const wrapper = this.$refs.sliderWrapper;
    if (!wrapper) {
      return;
    }
    const texts = Array.from(wrapper.querySelectorAll(".text-wrapper"));
    if (!texts) {
      return;
    }
    texts.forEach((text) => {
      this.showTitlesAsCaption(text);
    });
  },
  watch: {
    activeState() {
      if (this.activeState === 3) {
        this.isPaginationVisible = true;
      }
    },
  },
  methods: {
    pauseVid() {
      const videoComponent = this.$refs.videoComp;
      if (!videoComponent) {
        return;
      }
      const video = videoComponent.$refs.video;
      if (!video) {
        return;
      }
      video.pause();
    },
    showTitlesAsCaption(textScroller) {
      // console.log("ref", ref);
      const imgs = Array.from(textScroller.querySelectorAll("img:not(.icon)"));
      if (!imgs) {
        return;
      }
      imgs.forEach((img) => {
        const figure = document.createElement("figure");

        const parent = img.parentElement;
        parent.classList.add("img-container");
        parent.dataset.lightbox = "true";
        figure.appendChild(img);
        const title = img.title;
        if (title) {
          const caption = document.createElement("figcaption");
          caption.innerHTML = title;
          figure.appendChild(caption);
        }
        parent.appendChild(figure);
      });
    },
    setActiveState(num) {
      this.activeState = num;
      if (this.activeState !== 2) {
        this.pauseVid();
      }
    },
  },
};
</script>


<style lang="scss">
.aftermath-stories-individual {
  .pagination {
    bottom: 100px;
  }
  button {
    span:last-child {
      padding-left: 0;
    }
  }
  .buttons-bar {
    margin-top: 30px;
    button {
      a,
      span {
        transition: 0.3s ease all;
      }
    }
    button:hover {
      a,
      span {
        color: darken(#fff, 30);
      }
    }
  }
  .icon img {
    filter: invert(1);
  }
}
</style>