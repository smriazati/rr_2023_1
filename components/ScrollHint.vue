<template>
  <div class="scroll-hint">
    <div v-if="!hasScrolled && showScrollHint" ref="arrow" class="icon-wrapper">
      <p class="visually-hidden">Scroll down</p>
      <IconArrow class="icon-arrow-down icon-light" />
    </div>
  </div>
</template>

<script>
export default {
  destroyed() {
    this.hasScrolled = false;
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      hasScrolled: false,
      showScrollHint: false,
      delay: 1, // seconds
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    setTimeout(this.startTimer, this.delay * 1000);
  },
  methods: {
    startTimer() {
      this.showScrollHint = true;
    },
    handleScroll(event) {
      this.hasScrolled = true;
    },
  },
};
</script>

<style lang="scss">
@keyframes bounceIn {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(100px);
  }
}
.scroll-hint {
  text-align: center;
  display: flex;
  justify-content: center;
  .icon-wrapper {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  position: absolute;
  bottom: 25%;
  left: 0;
  width: 100%;
  z-index: 100;
  .icon-wrapper {
    animation: bounceIn 1s ease-in alternate infinite;
  }
}
</style>