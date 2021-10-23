<template>
  <div ref="wrapper" :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div ref="sliderWrapper" class="slider-wrapper">
      <div class="slider-area">
        <div class="slide-item">
          <div ref="textWrapper" class="text-wrapper">
            <nuxt-content :document="page" />
            <button class="flat light">
              <span class="icon icon-arrow icon-arrow-left"><IconArrow /></span>
              <nuxt-link to="/1/stories">Back to all stories</nuxt-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isPaginationVisible">
      <Pagination link="/2" message="Learn about the German Occupation" />
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
      const page = await $content(`01/stories_0${params.id}`).fetch();
      return {
        page,
      };
    }
  },

  data() {
    return {
      name: "intro-stories-individual",
      isPaginationVisible: true,
    };
  },
  mounted() {
    // console.log();
    const textWrapper = this.$refs.textWrapper;
    if (textWrapper) {
      this.showTitlesAsCaption(textWrapper);
    }
  },
  methods: {
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
  },
};
</script>

<style lang="scss">
.intro-stories-individual {
  .pagination {
    bottom: 100px;
  }
  .slider-wrapper {
    padding-top: 50px;
  }
  .text-wrapper p:not(.img-container) {
    max-width: calc(80ch - 300px);
  }
  figure {
    margin: 30px;
    margin-top: 0;
    max-height: 60vh;
    overflow: hidden;
  }

  .slide-item {
    margin-bottom: 80px;
  }
}
</style>