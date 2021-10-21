<template>
  <div ref="wrapper" :class="name" class="text-scroller-page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <ScrollHint />
    <div class="wrapper">
      <!-- <div ref="imageZoomer" class="image-wrapper">
        <div class="image-zoom-wrapper">
          <img
            src="/images/04/intro_01.jpg"
            alt="Painting of figure walking into a forest"
          />
        </div>
      </div> -->
      <div ref="textScroller" class="text-scroller">
        <div class="text-wrapper light centered">
          <nuxt-content :document="page" />
        </div>
      </div>
      <div v-show="isPaginationVisible">
        <Pagination link="/4/stories" message="Learn what happened after" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("04/intro").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "aftermath",
      isPaginationVisible: false,
    };
  },
  mounted() {
    this.$nextTick(this.setAnimation);
  },
  methods: {
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
    setAnimation() {
      this.registerPlugins();
      //   console.log(gsap);

      if (!gsap || !ScrollTrigger) {
        console.log("Cancelling animation, no GSAP or ST exists.");
        return;
      }

      // console.log("Start animation.");

      const textScroller = this.$refs.textScroller;
      if (textScroller) {
        this.addClassToInlineImgs(textScroller);
        this.setTextScrollingAnimation(textScroller);
        this.togglePaginationOnTextScroller(textScroller);
      } else {
        this.togglePaginationOnWrapper();
      }
    },
    togglePaginationOnWrapper() {
      const wrapper = this.$refs.wrapper;
      // console.log(wrapper);
      ScrollTrigger.create({
        trigger: wrapper,
        start: `bottom-=${window.innerHeight / 2}px bottom`,
        onToggle: (self) => {
          if (self.isActive) {
            this.showPagination();
          }
        },
      });
    },
    addClassToInlineImgs(textScroller) {
      const inlineImgs = Array.from(textScroller.querySelectorAll("img"));
      if (inlineImgs) {
        inlineImgs.forEach((img) => {
          img.parentElement.classList.add("img-container");
          this.setImgAnimation(img);
        });
      }
    },
    setImgAnimation(img) {
      gsap.set(img, {
        autoAlpha: 0.2,
        filter: "blur(30px)",
      });
      gsap.to(img, {
        autoAlpha: 1,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: img.parentElement,
          start: `top-=${window.innerHeight / 4} top`,
          end: "bottom bottom",
          scrub: 1,
          // markers: true,
        },
      });
    },
    togglePaginationOnTextScroller(textScroller) {
      const lastPar = Array.from(textScroller.querySelectorAll("p")).pop();
      if (lastPar) {
        // console.log(lastPar);
        ScrollTrigger.create({
          trigger: lastPar,
          start: `top-=${window.innerHeight / 2}px top`,
          end: "bottom",
          // markers: true,
          onToggle: (self) => {
            console.log(self.isActive);
            if (self.isActive) {
              this.showPagination();
            }
          },
        });
      } else {
        this.togglePaginationOnWrapper();
      }
    },
    setTextScrollingAnimation(ref) {
      if (!ref) {
        return;
      }
      const paragraphs = Array.from(
        ref.querySelectorAll("p:not(.img-container)")
      );
      if (!paragraphs) {
        return;
      }
      paragraphs.forEach((p, i) => {
        if (i > 0) {
          gsap.set(p, {
            autoAlpha: 0,
            scale: 0.7,
          });
          gsap.to(p, {
            autoAlpha: 1,
            scale: 1,
            scrollTrigger: {
              trigger: p,
              start: "top-=100% top",
              end: "bottom+=30% bottom",
              scrub: 1,
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.aftermath {
  &.text-scroller-page {
    .text-wrapper {
      width: 100%;
      max-width: 100%;
    }
  }
}
p.img-container {
  width: 100%;
  width: 100vw;
  margin: 0 !important;
  max-width: 100% !important;
  max-width: 100vw !important;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>