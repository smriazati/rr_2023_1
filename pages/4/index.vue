<template>
  <div ref="wrapper" :class="name" class="text-scroller-page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" />
    </div>
    <div class="wrapper">
      <div class="text-scroller-wrapper">
        <SystemTextScroller
          :panels="panels"
          @scrolled-to-end="showPagination()"
        />
      </div>
      <div v-show="isPaginationVisible">
        <Pagination link="/4/stories" message="Hear People's Stories" />
      </div>
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
      name: "aftermath",
      isPaginationVisible: false,
      wrapperHeight: null,
      panels: [
        "During the fires and the chaos, about 2,000 Jews escaped into the forest around Tuchyn.",
        "Germans and Ukrainians murdered the Jews remaining in the ghetto and launched a manhunt for those who had escaped. Within three days, about half were recaptured and killed.",
        "Many people, especially women and children were starving and freezing in the forest. German officials announced they would not harm any remaining escapees if they returned.",
        "Hoping the Germans would honor this promise, many women and children came back to Tuchyn. After a few days, several hundred Jews were taken to the Jewish cemetery and town park and shot.",
        "On January 16, 1944, the Soviet Army liberated the town and much of the region. About 3,000 Jews from Tuchyn had died and only 69 survived.",
        "Tuchyn is one of thousands of Jewish shtetls in Eastern Europe destroyed in this Holocaust by Bullets.",
      ],
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
.aftermath {
  .text-wrapper {
    p {
      @include pBigStyle();
    }
  }
}
</style>