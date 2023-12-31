<template>
  <div class="text-scroller" ref="textScroller">
    <div
      class="panel text-wrapper light centered flex-col"
      v-for="(item, index) in panels"
      :key="index"
    >
      <p v-html="item"></p>
      <button
        class="flat up"
        v-if="index !== 0"
        @click="goToSection(index - 1)"
      >
        <SystemIcon
          type="arrow"
          :width="40"
          color="light"
          class="icon icon-arrow-up"
        />
      </button>
      <button
        class="flat down"
        v-if="index < panelNum - 1"
        @click="goToSection(index + 1)"
      >
        <SystemIcon
          type="arrow"
          :width="40"
          color="light"
          class="icon icon-arrow-down"
        />
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
      // console.log("triggered set active section", i);
    },
    setTextScrollerAnim() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      let panels = gsap.utils.toArray(".panel");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: `top-=${window.innerWidth / 4} top`,
          end: `bottom top`,
          // markers: true,
          onToggle: (self) => {
            self.isActive && this.setActiveSection(i);
          },
          toggleClass: { targets: panel, className: "is-active" },
        });
      });
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
  padding: 0 25px;
  button {
    span {
      display: flex;
    }
  }
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
      @media (max-width: $collapse-bp) {
        font-size: 18px;
        line-height: 24px;
      }
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
    button.up {
      order: 1;
      margin-bottom: 30px;
    }
    p {
      order: 2;
    }
    button.down {
      order: 3;
    }
  }
}
</style>