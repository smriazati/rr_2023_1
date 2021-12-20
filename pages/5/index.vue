<template>
  <div ref="page" :class="name" class="page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" />
    </div>
    <ScrollHint />
    <main ref="grid">
      <div ref="pin" class="pin">
        <header>
          <div class="bg-image">
            <figure>
              <img
                src="/images/05/conclusion_04.jpg"
                alt="Painting of two whites doves perched next to large gray stones."
              />
              <figcaption>
                Painting of Doves, by Yosef Zilberberg, Courtesy Yosef
                Zilberberg.
              </figcaption>
            </figure>
          </div>
          <div class="text-wrapper center">
            <figure class="full-width">
              <blockquote>
                They tried to bury us, they didn’t know we were seeds.
              </blockquote>
              <figcaption>Dinos Christianopoulos</figcaption>
            </figure>
          </div>
        </header>
        <section class="monuments">
          <div class="row">
            <div class="text-wrapper">
              <p class="grid-intro-text">
                In 2011, Ze&rsquo;ev Portnoy, Yosef Zilberberg, and Miriam
                Schwartzman Koutz’s son Gideon erected a monument on the site of
                the Tuchyn ghetto in honor of the uprising and the lives lost.
              </p>
            </div>
            <div class="left image-wrapper">
              <figure class="full-width">
                <img
                  src="/images/05/conclusion_mon_01.jpg"
                  alt="Photograph of a four-tiered stone monument with Ukrainian text on the lower tiers and a Star of David on the top tier."
                />
                <figcaption>
                  Photograph of Memorial Monument in Tuchyn, 2016, Jared
                  McBride.
                </figcaption>
              </figure>
            </div>

            <div class="under image-wrapper">
              <figure class="full-width">
                <img
                  src="/images/05/conclusion_mon_02.jpg"
                  alt="Close up Image of the text of the monument. Text reads In memory of three thousand Jews, residents of Tuchin, who raised the banner of revolt in the Tuchin ghetto. Murdered, burned, and buried alive by murderers, in September 1942. In honor of their sacred memory!"
                />
                <figcaption class="visually-hidden">
                  Photograph of Memorial Monument in Tuchyn, 2016, Jared
                  McBride.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section class="unmarked">
          <div class="row">
            <div class="text-wrapper">
              <p>
                The places where people died lie unmarked today. No traces
                remain of the massacres that happened there.
              </p>
            </div>
            <div class="image-wrapper">
              <figure class="grid6 full-width grid-third-image">
                <img
                  src="/images/05/conclusion_03.jpg"
                  alt="Photograph of a green field with ruins of a single buidling in the background."
                />
                <figcaption>
                  Jewish Cemetery in Tuchyn, 2020, Courtesy Nataliia Ivchyk.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
      <footer ref="footer"><ConclusionEnd /></footer>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "conclusion",
      wrapperHeight: null,
    };
  },
  mounted() {
    this.setWrapperHeight();
    this.setContentAnimation();
    this.setPinningAnimation();
    window.addEventListener("resize", () => {
      this.setWrapperHeight();
      this.setContentAnimation();
      this.setPinningAnimation();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {
      this.setWrapperHeight();
      this.setContentAnimation();
      this.setPinningAnimation();
    });
  },
  methods: {
    setWrapperHeight() {
      this.wrapperHeight = this.$refs.page.offsetHeight;
    },
    setPinningAnimation() {
      const ScrollTrigger = this.$ScrollTrigger;
      const pin = this.$refs.pin;
      const footer = this.$refs.footer;
      // console.log(pin, footer);
      ScrollTrigger.create({
        trigger: pin,
        pin: pin,
        pinSpacing: false,
        // markers: true,
        start: `bottom bottom`,
        endTrigger: footer,
        end: `bottom bottom`,
      });
    },
    setContentAnimation() {
      const gsap = this.$gsap;
      const grid = this.$refs.grid;
      const header = grid.querySelector("header");
      const monuments = grid.querySelector("section.monuments");
      const unmarked = grid.querySelector("section.unmarked");
      const footer = grid.querySelector("footer");

      // First Row
      const monumentsC1 = monuments.querySelector(".text-wrapper");
      const monumentsC2 = monuments.querySelector(".image-wrapper.left");
      const monumentsC3 = monuments.querySelector(".image-wrapper.under");

      const scrub = 1.1;
      const xDistance = 300;
      const filterStart = "grayscale(1) brightness(0.3) contrast(3)";
      const filterEnd = "grayscale(0) brightness(1) contrast(1)";

      gsap.set(monumentsC1, {
        autoAlpha: 0,
        x: xDistance,
      });

      gsap.to(monumentsC1, {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
        },
      });

      gsap.set(monumentsC2, {
        autoAlpha: 0,
        x: xDistance * -1,
        filter: filterStart,
      });

      gsap.to(monumentsC2, {
        autoAlpha: 1,
        x: 0,
        filter: filterEnd,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
          // markers: true,
        },
      });

      gsap.set(monumentsC3, {
        autoAlpha: 0,
        x: xDistance,
        filter: filterStart,
      });

      gsap.to(monumentsC3, {
        autoAlpha: 1,
        x: 0,
        filter: filterEnd,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
          // markers: true,
        },
      });

      // Second Row

      const unmarkedC1 = unmarked.querySelector(".text-wrapper");
      const unmarkedC2 = unmarked.querySelector(".image-wrapper");
      gsap.set(unmarkedC1, {
        autoAlpha: 0,
        x: -300,
      });
      gsap.to(unmarkedC1, {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: monuments,
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 4} top`,
          scrub: 0.8,
          // markers: true,
        },
      });

      gsap.set(unmarkedC2, {
        autoAlpha: 0,
        // x: 300,
        filter: "grayscale(1) brightness(0.3) contrast(3)",
      });
      gsap.to(unmarkedC2, {
        autoAlpha: 1,
        // x: 0,
        filter: "grayscale(0) brightness(1) contrast(1)",

        scrollTrigger: {
          trigger: monuments,
          start: `bottom-=${window.innerHeight / 3} top`,
          // end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@mixin conclusionGrid() {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 1280px;
  max-width: 1280px;
  margin: 0 auto;
  grid-template-rows: auto;
  grid-gap: 15px;
  grid-column-gap: 30px;
  padding: 0 30px;
  @media (max-width: 1280px) {
    width: 85%;
    width: 85vw;
    max-width: 85%;
    max-width: 85vw;
    padding: 0;
  }
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;

  figure {
    width: 100%;
    height: 100%;
    img {
      min-width: 100%;
      width: 100%;
      max-height: 100%;
      @media (max-width: $collapse-bp) {
        min-height: 100%;
      }
      //   height: 100%;
      object-fit: cover;
      opacity: 0.6;
    }
    figcaption {
      position: absolute;
      top: 0;
      right: 0;
      padding: 30px;
      width: 50%;
      text-align: right;
    }
  }
}
.conclusion.page {
  p,
  blockquote {
    @include pBigStyle();
  }

  header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: $collapse-bp) {
      height: calc(100vh - 54px);
    }
    @media (max-width: $collapse-bp) {
      height: 100vh;
    }
    width: 100%;
    overflow: hidden;
    @media (max-width: $collapse-bp) {
      padding-top: 60px;
    }
  }
  figure.full-width {
    margin: 0;
    min-width: 100%;
    img {
      width: 100%;
    }
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    .row {
      @include conclusionGrid;
    }

    &.monuments {
      .row {
        padding-top: 20vh;
        .text-wrapper {
          grid-row: 3 / 4;
          grid-column: 5 / span 3;
          padding-top: 20%;
          padding-bottom: 100px;
          @media (max-width: 960px) {
            padding-top: 0;
            padding-bottom: 0;
            grid-column: 1 / span 8;
          }
        }

        .image-wrapper.left {
          grid-row: 2 / 6;
          grid-column: 1 / 5;
          @media (max-width: 960px) {
            grid-column: 1 / span 8;
            grid-row: 4 / 5;
          }
        }

        .image-wrapper.under {
          grid-row: 5 / 6;
          grid-column: 5 / span 4;
          @media (max-width: 960px) {
            grid-column: 1 / span 8;
          }
        }
      }
    }
    &.unmarked {
      padding-bottom: 15vh;
      .row {
        .text-wrapper {
          grid-row: 6 / 7;
          grid-column: 1 / 4;
          place-self: end;
          @media (max-width: 960px) {
            grid-column: 1 / span 8;
          }
        }
        .image-wrapper {
          grid-row: 6 / 7;
          grid-column: 4 / span 5;
          @media (max-width: 960px) {
            grid-column: 1 / span 8;
            grid-row: 7 / 8;
          }
        }
      }
    }
  }
  footer {
    position: relative;
    z-index: 900;
    padding-top: 25vh;
  }
}
</style>