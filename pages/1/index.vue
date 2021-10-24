<template>
  <div ref="wrapper" :class="name" class="text-scroller-page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="nav-tracker-bar" ref="navList"></div>
    <ScrollHint />
    <div class="wrapper">
      <div ref="imageZoomer" class="image-wrapper">
        <div class="image-zoom-wrapper">
          <img
            src="/images/01/bgimg.jpg"
            alt="Painting of figure walking into a forest"
          />
        </div>
      </div>
      <div ref="textScroller" class="text-scroller">
        <div class="text-wrapper light centered">
          <nuxt-content :document="page" />
        </div>
      </div>
      <div v-show="isPaginationVisible">
        <Pagination link="/1/stories" message="Meet the characters" />
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
    togglePaginationOnWrapper() {
      const wrapper = this.$refs.wrapper;
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
    togglePaginationOnTextScroller(textScroller) {
      const lastPar = Array.from(textScroller.querySelectorAll("p")).pop();
      if (lastPar) {
        ScrollTrigger.create({
          trigger: lastPar,
          start: `top-=${window.innerHeight / 2}px top`,
          end: "bottom",
          onToggle: (self) => {
            if (self.isActive) {
              this.showPagination();
            }
          },
        });
      } else {
        this.togglePaginationOnWrapper();
      }
    },
    setAnimation() {
      this.registerPlugins();

      if (!gsap || !ScrollTrigger) {
        console.log("Cancelling animation, no GSAP or ST exists.");
        return;
      }

      const textScroller = this.$refs.textScroller;
      if (textScroller) {
        this.setTextScrollingAnimation(textScroller);
        this.togglePaginationOnTextScroller(textScroller);
        this.setScrollNavBarAnimation();
      } else {
        this.togglePaginationOnWrapper();
      }

      const imageZoomer = this.$refs.imageZoomer;
      if (imageZoomer) {
        this.setImageZoomingAnimation(imageZoomer);
      }
    },
    setTextScrollingAnimation(ref) {
      if (!ref) {
        return;
      }
      const paragraphs = gsap.utils.toArray(ref.querySelectorAll("p"));
      if (!paragraphs) {
        return;
      }

      paragraphs.forEach((panel, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: `top-=${panel.offsetHeight / 2}px top`,
            end: `top+=${panel.offsetHeight / 2}px top`,
            // markers: true,
            scrub: true,
          },
        });
        gsap.set(panel, {
          autoAlpha: 0,
          scale: 0.9,
          "-webkit-filter": "blur(30px)",
          filter: "blur(30px)",
        });
        tl.to(panel, {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          "-webkit-filter": "blur(0px)",
          filter: "blur(0px)",
        })
          .to(panel, {
            autoAlpha: 1,
            duration: 3,
            "-webkit-filter": "blur(0px)",
            filter: "blur(0px)",
          })
          .to(panel, {
            scale: 0.9,
            autoAlpha: 0,
            duration: 2,
            "-webkit-filter": "blur(30px)",
            filter: "blur(30px)",
          });
      });
    },
    setScrollNavBarAnimation() {
      const ref = this.$refs.navList;
      const wrapper = this.$refs.wrapper;
      if (!ref || !wrapper) {
        return;
      }
      gsap.to(ref, {
        height: "100vh",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    setImageZoomingAnimation(ref) {
      if (!ref) {
        return;
      }
      const imgWrapper = ref.querySelector(".image-zoom-wrapper");
      const pageWrapper = ref.parentElement;
      if (!imgWrapper || !pageWrapper) {
        return;
      }
      gsap.set(imgWrapper, {
        scale: 3,
        autoAlpha: 0.2,
      });
      gsap.to(imgWrapper, {
        scale: 1,
        autoAlpha: 0.5,
        scrollTrigger: {
          trigger: pageWrapper,
          start: "0",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
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