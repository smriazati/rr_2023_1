<template>
  <div :class="name" class="story stories-individual" ref="story">
    <div class="page-grid">
      <div class="slider-controls">
        <button @click="goToPrev()" class="flat">
          <span class="visually-hidden">Prev</span
          ><SystemIcon
            type="arrow"
            color="light"
            :width="25"
            class="icon icon-arrow-left"
          />
        </button>
        <button @click="goToNext()" class="flat">
          <span class="visually-hidden">Next</span
          ><SystemIcon type="arrow" color="light" :width="25" />
        </button>
      </div>
      <div class="title" v-if="this.$route.params.id === '1'">
        <StoryTitle
          title="Luba Chomut"
          sectionTitle="Aftermath"
          img="/images/01/intro_01.png"
          imgAlt="Young girl in a dark dress"
        />
      </div>
      <div class="title" v-if="this.$route.params.id === '2'">
        <StoryTitle
          title="Yosef Zilberberg"
          sectionTitle="Aftermath"
          img="/images/01/intro_02.png"
          imgAlt="Adolescent boy in a shirt and jacket"
        />
      </div>
      <div class="title" v-if="this.$route.params.id === '3'">
        <StoryTitle
          title="Mania Schwartzman"
          sectionTitle="Aftermath"
          img="/images/01/intro_03.png"
          imgAlt="Young woman in 1940s era clothing"
        />
      </div>
      <div class="story" v-if="this.$route.params.id === '1'">
        <StoriesAftermath1 />
      </div>
      <div class="story" v-if="this.$route.params.id === '2'">
        <StoriesAftermath2 />
      </div>
      <div class="story" v-if="this.$route.params.id === '3'">
        <StoriesAftermath3 />
      </div>
      <div class="pagination" v-if="isPaginationVisible">
        <Pagination
          link="/4/stories"
          message="Back to All Stories"
          :back="true"
        />
        <Pagination link="/5" message="Move on to the Conclusion" />
      </div>
    </div>
  </div>
</template>

<script>
import animation from "~/mixins/storyAnimations.js";

export default {
  data() {
    return {
      name: "aftermath-stories-individual",
      isPaginationVisible: false,
      pageNames: {
        1: "Aftermath: Luba Chomut",
        2: "Aftermath: Yosef Zilberberg",
        3: "Aftermath: Mania Schwartzman",
      },
      activeSlide: 0,
      activeSlideClass: "active-slide",
      previousActiveSlide: null,
      slideNum: null,
    };
  },
  head() {
    return {
      title: this.pageNames[this.$route.params.id],
    };
  },
  mounted() {
    // this.setAnim();
    // this.showPaginationAtBodyEnd();

    this.initSlider();
    // console.log(slides);
  },
  watch: {
    activeSlide() {
      const activeSlideClass = this.activeSlideClass;
      const activeSlideEl = document.querySelector(
        `.slide-${this.activeSlide}`
      );
      activeSlideEl?.classList.add(activeSlideClass);

      const previousActiveSlideEl = document.querySelector(
        `.slide-${this.previousActiveSlide}`
      );
      previousActiveSlideEl?.classList.remove(activeSlideClass);
      // console.log(activeSlideEl);

      if (this.activeSlide === this.slideNum - 1) {
        this.isPaginationVisible = true;
      }
    },
  },
  methods: {
    initSlider() {
      const parent = this.$refs.story;

      const main = parent.querySelector("main.content");
      main.classList.add("slider-wrapper");

      const slides = Array.from(main.children);
      this.slideNum = slides.length;

      slides.forEach((slide, i) => {
        slide.classList.add("slide");
        slide.classList.add(`slide-${i}`);

        if (i === 0) {
          slide.classList.add(this.activeSlideClass);
        }
      });
    },
    goToNext() {
      this.previousActiveSlide = this.activeSlide;
      if (this.activeSlide === this.slideNum - 1) {
        this.activeSlide = 0;
      } else {
        this.activeSlide = this.activeSlide + 1;
      }
    },
    goToPrev() {
      this.previousActiveSlide = this.activeSlide;
      if (this.activeSlide === 0) {
        this.activeSlide = this.slideNum - 1;
      } else {
        this.activeSlide = this.activeSlide - 1;
      }
    },
  },
  mixins: [animation],
};
</script>



<style lang="scss">
.aftermath-stories-individual {
  .slider-controls {
    z-index: 100;
    display: flex;
    justify-content: center;
    @media (max-width: $collapse-bp) {
      padding: 15px 0 30px;
    }
  }
  main.content > * {
    opacity: 0;
  }
  header.story-title .story-title-container {
    grid-template-rows: 165px 1fr 25px;
    .image-wrapper {
      max-width: 150px;
    }
    .text-wrapper {
      padding-top: 0;
      padding-bottom: 0;
    }
    @media (max-width: $collapse-bp) {
      grid-template-rows: 65px 1fr 25px;
      .image-wrapper {
        max-width: 50px;
      }
      .banner {
        grid-row-end: 4;
      }
    }
  }
  .slider-wrapper {
    // @include siteContainer();

    padding: 0 30px;
    @media (max-width: $collapse-bp) {
      padding-top: 30px;
    }
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: 100%;
    place-items: center;
    @media (max-width: $collapse-bp) {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .slide {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      width: 100%;
      // height: 100%;
      height: 0%;
      @media (max-width: $collapse-bp) {
        flex: 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
      }
      transition: 0.3s ease opacity;
      opacity: 0;
      pointer-events: none;
      z-index: 9;
    }
    .active-slide {
      top: 0;
      display: flex;
      opacity: 1;
      height: auto;
      @media (max-width: $collapse-bp) {
        flex: 100%;
        position: relative;
      }
      pointer-events: none;
      z-index: 11;
    }
  }

  &.stories-individual main.content > .row {
    padding: 0 !important;
  }
  .page-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: 225px 1fr 100px;
    grid-template-rows: 25% 60% 15%;
    height: calc(100vh - 54px);
    @media (max-width: $collapse-bp) {
      height: auto;
      display: flex;
      flex-direction: column;
      .title {
        order: 1;
      }
      .story {
        order: 2;
      }
      .slider-controls {
        order: 3;
      }
      .pagination {
        order: 4;
        display: flex;
        flex-direction: column;
      }
    }
    width: 100%;
    top: 0;
    position: absolute;
    .title {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
      width: 100%;
      height: 100%;
    }
    .story {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 3;
      width: 100%;
      height: 100%;
    }
    .slider-controls {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 4;
      @media (min-width: $collapse-bp) {
        width: 100%;
        height: 100%;
      }
    }
  }
  &.stories-individual main.content > .row figure {
    img {
      // max-height: 50vh;
      height: 100%;
      // width: 100%;
      overflow: hidden;
    }

    &.banner {
      max-width: 800px;
      max-height: 100%;
      margin: 0 auto;
      text-align: center;
      background: transparent;
    }
  }
}

@media (max-width: $collapse-bp) {
  .slider-wrapper {
    .vimeo-component {
      width: 100%;
    }
  }
}
</style>
