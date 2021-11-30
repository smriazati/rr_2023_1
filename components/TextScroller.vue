<template>
  <div class="text-scroller" ref="textScroller">
    <div
      class="panel text-wrapper light centered flex-col"
      v-for="(item, index) in panels"
      :key="index"
    >
      <p>{{ item }}</p>
      <button
        class="flat icon icon-light icon-arrow-up"
        v-if="index !== 0"
        @click="goToPrevSection"
      >
        <span><IconArrow /></span>
      </button>
      <button
        class="flat icon icon-light icon-arrow-down"
        v-if="index < panelNum - 1"
        @click="goToNextSection"
      >
        <span><IconArrow /></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    panels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scrollTween: null,
      activeSection: 0,
    };
  },
  mounted() {
    this.setTextScrollerAnim();
  },
  watch: {
    activeSection() {
      if (this.activeSection === this.panelNum - 1) {
        this.$emit("scrolled-to-end");
      }
    },
  },
  computed: {
    panelNum() {
      return this.panels.length;
    },
  },
  methods: {
    // boxRotation() {
    //   const gsap = this.$gsap;
    //   gsap.to(".box", { rotation: 27, x: 100, duration: 1 });
    // },
    goToPrevSection() {
      this.goToSection(this.activeSection - 1);
    },
    goToNextSection() {
      this.goToSection(this.activeSection);
    },
    goToSection(i) {
      const gsap = this.$gsap;
      this.setActiveSection(i);
      this.scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 0.8,
        ease: "ease-in-out",
        onComplete: () => (this.scrollTween = null),
        overwrite: true,
      });
    },
    setActiveSection(i) {
      // console.log("activating section", i);
      this.activeSection = i;
    },
    setTextScrollerAnim() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      let panels = gsap.utils.toArray(".panel");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: `top bottom+=${window.innerHeight / 4}`,
          end: "+=200%",
          //   markers: true,
          // onToggle: (self) =>
          //   self.isActive && !this.scrollTween && this.goToSection(i),
          onToggle: (self) => {
            self.isActive && this.setActiveSection(i);
          },
          toggleClass: { targets: panel, className: "is-active" },
        });
      });

      // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
      // ScrollTrigger.create({
      //   start: 0,
      //   end: "max",
      //   snap: 1 / (panels.length - 1),
      // });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: auto;
}

.text-scroller-wrapper {
  position: relative;
  z-index: 20;
}
.text-scroller {
  width: 100%;
  background: rgba(10, 10, 10, 0.4);
  .panel {
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      @include pBigStyle();
      font-size: 28px;
      line-height: 32px;
    }
    transition: 0.3s ease all;
    filter: blur(30px);
    opacity: 0;
    &.is-active {
      opacity: 1;
      filter: blur(0px);
    }
  }
  .flex-col {
    .icon-arrow-up {
      order: 1;
      margin-bottom: 30px;
    }
    p {
      order: 2;
    }
    .icon-arrow-down {
      order: 3;
    }
  }
}
</style>