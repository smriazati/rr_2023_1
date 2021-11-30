<template>
  <div :class="name">
    <div class="wrapper">
      <div ref="bg" class="image-wrapper">
        <img
          src="/images/01/bgimg.jpg"
          alt="Painting of figure walking into a forest"
        />
      </div>
      <!-- <div ref="logo" class="logo-wrapper">
        <ExhibitLogo />
      </div> -->
      <div class="text-wrapper-container flex-col site-container">
        <div ref="text" class="home-page-text flex-col align-center">
          <div class="text-wrapper light">
            <h2 ref="title" class="h1 collapsed-mb home-page-title">
              <span class="small-text">The</span>Tuchyn Story
            </h2>
          </div>
          <button ref="button" class="bright circle-btn home-page-button">
            <nuxt-link to="/1/">Enter Here</nuxt-link>
          </button>
        </div>
      </div>
      <div ref="warning" class="content-warning home-page-button">
        <p class="small muted">
          Some material in this exhibit is sensitive and deals with violence,
          antisemitism, racism, and death. Please take breaks and reach out to
          your teacher or counselor for support as needed.
        </p>
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
    this.$nextTick(() => {
      this.setAnimation();
    });
  },
  methods: {
    setAnimation() {
      const gsap = this.$gsap;

      const bg = this.$refs.bg;
      const text = this.$refs.text;

      const title = this.$refs.title;
      const button = this.$refs.button;

      const warning = this.$refs.warning;
      const tl = gsap.timeline({});
      const logoEnterDuration =
        this.$store.state.animations.exhibitLogoScaleDown;
      const backgroundEnterDuration =
        this.$store.state.animations.homeBackgroundEnter;

      gsap.set(bg, {
        autoAlpha: 0,
        background: "#699455",
      });
      gsap.set(title, {
        autoAlpha: 0,
        y: `${(text.offsetHeight - button.offsetHeight) / 2}px`,
      });
      gsap.set(button, {
        autoAlpha: 0,
        scale: 0.1,
      });
      gsap.set(warning, {
        autoAlpha: 0,
      });

      tl.to(
        bg,
        {
          autoAlpha: 1,
          duration: backgroundEnterDuration,
          background: "#131313",
          ease: "ease-in-out",
        },
        logoEnterDuration - 0.1
      );
      tl.to(
        text,
        {
          duration: backgroundEnterDuration,
          scale: 1,
        },
        logoEnterDuration +
          (backgroundEnterDuration - backgroundEnterDuration / 4)
      );
      tl.to(
        button,
        {
          duration: 0.5,
          autoAlpha: 1,
          // y: 0,
          scale: 1,
          ease: "power4.out",
        },
        logoEnterDuration + backgroundEnterDuration / 2 - 0.5
      );
      tl.to(
        title,
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power4.out",
        },
        logoEnterDuration + backgroundEnterDuration / 2
      );
      tl.to(
        warning,
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        logoEnterDuration + backgroundEnterDuration / 2 + 0.2
      );
    },
  },
};
</script>

<style lang="scss">
// set anim
// .home-page-text,
.home-page-title,
.home-page-button {
  opacity: 0;
}
.home {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .wrapper {
    background: #699455;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    .image-wrapper {
      width: 100%;
      height: 100vh;
      max-height: 100vh;
      max-width: 100vw;
      position: fixed;
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
      // opacity: 0;
      flex: 1;
      position: relative;
      width: 100%;
      height: 100%;
      height: 100vh;

      .text-wrapper {
        flex: 2;
        display: flex;
        width: 100%;
        h2 {
          margin: 0 auto;
          background: $gray;
          padding: 45px;
          border-radius: 6px;
        }
      }
      button {
        opacity: 0;
        margin: 0 !important;
        margin-top: -30px !important;
        // background: $sage;
      }

      // .logo-wrapper {
      //   flex: 0 0 200px;
      //   height: 200px;
      //   display: flex;
      //   justify-content: center;
      // }
    }
    p {
      padding: 15px 0;
      max-width: 80ch;
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
    }
  }

  .content-warning {
    // opacity: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: $gray;
    p {
      color: $white;
    }
  }

  h2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 6rem;
    line-height: 6rem;
    @media (max-width: $mobile-bp) {
      font-size: 3rem;
      line-height: 3rem;
    }
    // text-transform: uppercase;
    font-weight: bold;
    .small-text {
      text-align: center;
      display: block;
      font-size: 26px;
      line-height: 26px;
      font-weight: regular;
      text-transform: uppercase;
    }
  }
}
</style>

