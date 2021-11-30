<template>
  <figure ref="logo" class="exhibit-logo">
    <nuxt-link to="/">
      <img
        src="/images/logo.png"
        alt="A logo that says Roots of Resistance, with the symbol of a tree. The tree  shows both its branches and roots. "
      />
    </nuxt-link>
  </figure>
</template>
<script>
export default {
  props: {
    animate: {
      type: Boolean,
    },
  },
  mounted() {
    if (this.animate || this.$route.path === "/") {
      this.setAnimation();
    } else {
      this.setFixedPos();
    }
  },
  watch: {
    $route() {
      if (this.$route.path === "/") {
        this.setAnimation();
      }
    },
  },
  methods: {
    setFixedPos() {
      const logo = this.$refs.logo;

      if (logo) {
        logo.style.width = "80px";
        logo.style.height = "80px";
        logo.style.left = "15px";
        logo.style.top = "15px";
      }
    },
    setAnimation() {
      const gsap = this.$gsap;
      const logo = this.$refs.logo;

      const windowW = window.innerWidth;
      const halfWindowW = windowW / 2;
      const logoTimeline = gsap.timeline({});
      const logoEnterDuration =
        this.$store.state.animations.exhibitLogoScaleDown;
      const backgroundEnterDuration =
        this.$store.state.animations.homeBackgroundEnter;

      gsap.set(logo, {
        autoAlpha: 0,
        width: `${halfWindowW}px`,
        height: `${halfWindowW}px`,
        scale: 1.1,
        left: `${(window.innerWidth - halfWindowW) / 2}px`,
        top: `${(window.innerHeight - halfWindowW) / 2}px`,
      });

      logoTimeline.to(logo, {
        autoAlpha: 1,
        duration: 1,
      });
      logoTimeline.to(
        logo,
        {
          scale: 1,
          duration: logoEnterDuration,
        },
        0
      );
      logoTimeline.to(
        logo,
        {
          width: `80px`,
          height: `80px`,
          left: `15px`,
          top: `15px`,
          duration: backgroundEnterDuration,
          ease: "sine.out",
        },
        logoEnterDuration
      );
    },
  },
};
</script>


<style lang="scss">
.exhibit-logo {
  position: fixed;
  z-index: 999;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.default-layout:not(.route-index) .exhibit-logo {
  width: 80px;
  height: 80px;
  left: 15px;
  top: 15px;
}
.exhibit-logo + div {
  position: relative;
}
</style>