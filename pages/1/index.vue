<template>
  <div ref="wrapper" :class="name" class="text-scroller-page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" />
    </div>
    <div class="wrapper">
      <div class="image-zoom-wrapper">
        <ImageZoomer
          :height="wrapperHeight"
          :src="img.src"
          :alt="img.alt"
          :caption="img.caption"
        />
      </div>
      <div class="text-scroller-wrapper">
        <TextScroller :panels="panels" @scrolled-to-end="showPagination()" />
      </div>
      <div v-show="isPaginationVisible">
        <Pagination link="/1/stories" message="Meet the people" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("01/introduction").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "introduction",
      isPaginationVisible: false,
      wrapperHeight: null,
      img: {
        src: "/images/01/bgimg.jpg",
        alt: "Painting of a person (small in frame) running into a forest.",
        caption:
          "Escape into the Forests, Painting by Yosef Zilberberg, Courtesy Yosef Zilberberg.",
      },
      panels: [
        "Far away in Ukraine sits a small town named Tuchyn. Farmland and forests surround it.",
        "The German army took over Tuchyn in July 1941. The Germans and their Ukrainian helpers constantly persecuted the Jewish community and treated them with violence.",
        "In September 1942, the Jewish residents of Tuchyn learned that the Germans planned to kill them all. The Jews resisted by setting fire to their homes and fighting back.",
        "Thousands of people fled to the forests but many were caught. Almost all Tuchyn’s Jews perished at the hands of the Germans and their own Ukrainian neighbors.",
        "In this exhibition, you will learn about this “Holocaust by Bullets” through family stories. You will find out about many forms of resistance during this mass genocide.",
        "Unearth these roots of resistance. Share these stories with people you know. Consider how you can stand up to intolerance in your own lives.",
      ],
    };
  },
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
  mounted() {
    this.setWrapperHeight();
    window.addEventListener("resize", () => {
      this.setWrapperHeight();
    });
  },
  methods: {
    setWrapperHeight() {
      this.wrapperHeight = window.innerHeight * this.panels.length;
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
  },
};
</script>

<style lang="scss">
.introduction {
  &.text-scroller-page .wrapper .nuxt-content p {
    background: transparent !important;
  }
  &.text-scroller-page > .wrapper {
    background: rgba(10, 10, 10, 0.4);
  }
}
</style>