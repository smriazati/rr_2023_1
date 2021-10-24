<template>
  <div :class="name">
    <div class="wrapper">
      <div ref="bg" class="image-wrapper">
        <img
          src="/images/01/bgimg.jpg"
          alt="Painting of figure walking into a forest"
        />
      </div>
      <div class="text-wrapper-container flex-col">
        <div ref="logo" class="animate-in">
          <ExhibitLogo />
        </div>
        <div class="text-wrapper center light flex-col">
          <h1 class="visually-hidden h3 collapsed-mb">
            Remembering Resistance
          </h1>
          <h2 ref="title" class="animate-in h1 collapsed-mb">
            The Tuchyn Uprising
          </h2>
          <button ref="button" class="animate-in">
            <nuxt-link to="/1/">Enter Here</nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "home",
    };
  },
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
  mounted() {
    this.$nextTick(this.setAnimation);
  },
  methods: {
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    setAnimation() {
      this.registerPlugins();

      if (!gsap || !ScrollTrigger) {
        console.log("Cancelling animation, no GSAP or ST exists.");
        return;
      }
      const title = this.$refs.title;
      const logo = this.$refs.logo;
      const button = this.$refs.button;
      const bg = this.$refs.bg;
      gsap.set(title, {
        autoAlpha: 0,
        scale: 1.3,
        "-webkit-filter": "blur(10px)",
        filter: "blur(10px)",
      });
      gsap.set(logo, {
        autoAlpha: 0,
        scale: 1.4,
        "-webkit-filter": "blur(10px)",
        filter: "blur(10px)",
      });
      gsap.set(button, {
        autoAlpha: 0,
      });

      const bgLoop = gsap.timeline({ repeat: -1 });
      bgLoop
        .to(bg, {
          duration: 5,
          scale: 1.3,
          ease: "sine.out",
        })
        .to(bg, {
          duration: 6,
          scale: 1,
          ease: "sine.out",
        });

      gsap.to(logo, {
        duration: 1.3,
        autoAlpha: 1,
        scale: 1,
        "-webkit-filter": "blur(0px)",
        filter: "blur(0px)",
      });
      gsap.to(title, {
        duration: 1.3,
        autoAlpha: 1,
        scale: 1,
        "-webkit-filter": "blur(0px)",
        filter: "blur(0px)",
      });
      gsap.to(button, {
        duration: 0.3,
        autoAlpha: 1,
        delay: 0.9,
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .exhibit-logo {
    margin-bottom: 30px;
  }
  .wrapper {
    background: #000;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .image-wrapper {
      width: 100%;
      height: 100vh;
      max-height: 100vh;
      max-width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      * {
        width: 100%;
        height: 100%;
      }
      img {
        object-fit: cover;
        transform: scale(3);
        opacity: 0.4;
        filter: blur(5px);
      }
    }
    .text-wrapper-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

