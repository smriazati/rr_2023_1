<template>
  <header class="story-title">
    <div class="story-title-container">
      <div class="banner"></div>
      <div class="text-wrapper">
        <h2 class="subheadline">{{ sectionTitle }}</h2>
        <h1>{{ title }}</h1>
      </div>
      <figure class="image-wrapper">
        <img :src="img" :alt="imgAlt" />
      </figure>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    sectionTitle: {
      type: String,
    },
    img: {
      type: String,
    },
    imgAlt: {
      type: String,
    },
  },
  mounted() {
    this.setAnim();
  },
  methods: {
    setAnim() {
      const gsap = this.$gsap;
      const header = document.querySelector(".story-title");
      const img = header.querySelector("figure");
      const title = header.querySelector("h1");
      const subheadline = header.querySelector("h2");

      gsap.set(img, {
        autoAlpha: 0,
        scale: 1.1,
      });

      gsap.set(title, {
        autoAlpha: 0,
        // x: "10vw",
      });

      gsap.set(subheadline, {
        autoAlpha: 0,
        // x: "10vw",
      });

      const tl = gsap.timeline({
        repeat: 0,
      });

      tl.to(
        img,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
        },
        0
      );
      tl.to(
        title,
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.1,
        },
        "<"
      );
      tl.to(
        subheadline,
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
        },
        "<"
      );
    },
  },
};
</script>

<style lang="scss">
header.story-title {
  figure {
    opacity: 0;
  }
  h1,
  h2 {
    opacity: 0;
  }

  .story-title-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    grid-template-rows: 5vh 1fr 25px;
    grid-gap: 30px;
    @media (max-width: $collapse-bp) {
      grid-template-rows: 130px 1fr 25px;
      grid-template-columns: 10px 1fr 10px;
      grid-gap: 10px;
    }
    > * {
      position: relative;
      max-width: 100%;
    }
    .banner {
      background: $gray;
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .text-wrapper {
      @media (min-width: $collapse-bp) {
        padding-top: 15vh;
      }
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      width: 100%;
      height: 100%;
      text-align: center;
      place-self: center;
      flex-direction: column;
      display: flex;
      flex-direction: column;
      padding-bottom: 15px;
      * {
        margin: 0;
      }
    }
    .image-wrapper {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3;
      grid-row-end: 4;
      max-width: 300px;
      place-self: end;
      @media (max-width: $collapse-bp) {
        padding-top: 30px;
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        place-self: center;
        @media (max-width: $collapse-bp) {
          max-width: 100px;
        }
      }
    }
  }
}
</style>