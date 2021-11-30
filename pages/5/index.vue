<template>
  <div ref="page" :class="name" class="dark-pattern-bg transition-bg">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" />
    </div>
    <section class="flex-col-reverse">
      <ScrollHint />
      <div class="bg-image">
        <figure>
          <img
            src="/images/05/conclusion_04.jpg"
            alt="Painting of two whites doves perched next to large gray stones."
          />
          <figcaption>
            Painting of Doves, by Yosef Zilberberg, Courtesy Yosef Zilberberg.
          </figcaption>
        </figure>
      </div>
      <div ref="grid" class="text-wrapper text-grid">
        <div class="grid5 grid-quote">
          <blockquote>
            They tried to bury us, they didn’t know we were seeds.
          </blockquote>
          <p>Dinos Christianopoulos</p>
        </div>
        <p class="grid1 grid-intro-text">
          In 2011, Zeev Portnoy, Yosef Zilberberg, and Miriam Schwartzman
          Koutz’s son Gideon erected a monument on the site of the Tuchyn ghetto
          in honor of the uprising and the lives lost.
        </p>
        <p class="grid2 grid-second-text">
          The places where people died lie unmarked today, No traces remain of
          the massacres that happened there.
        </p>

        <figure class="grid3 full-width grid-first-image">
          <img
            src="/images/05/conclusion_mon_01.jpg"
            alt="Photograph of a four-tiered stone monument with Ukrainian text on the lower tiers and a Star of David on the top tier."
          />
          <figcaption>
            Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride.
          </figcaption>
        </figure>
        <figure class="grid4 full-width grid-second-image">
          <img
            src="/images/05/conclusion_mon_02.jpg"
            alt="Close up Image of the text of the monument. Text reads In memory of three thousand Jews, residents of Tuchin, who raised the banner of revolt in the Tuchin ghetto. Murdered, burned, and buried alive by murderers, in September 1942. In honor of their sacred memory!"
          />
          <figcaption class="visually-hidden">
            Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride.
          </figcaption>
        </figure>

        <figure class="grid6 full-width grid-third-image">
          <img
            src="/images/05/conclusion_03.jpg"
            alt="Photograph of a green field with ruins of a single buidling in the background."
          />
          <figcaption>
            Jewish Cemetery in Tuchyn, 2020, Courtesy Nataliia Ivchyk.
          </figcaption>
        </figure>
        <div
          class="grid7 grid-the-end text-wrapper light flex-row align-center"
        >
          <figure>
            <img
              src="/images/05/conclusion_04.jpg"
              alt="Painting of two whites doves perched next to large gray stones."
            />
            <figcaption>
              Painting of Doves, by Yosef Zilberberg, n.d., Yosef Zilberberg.
            </figcaption>
          </figure>
          <div class="text">
            <p>With this exhibit, we remember what happened.</p>
            <p class="small">
              As you leave the digital exhibit, consider these questions. How
              are people are treated as less-than in your community today? How
              can we as a community prevent intolerance and violence in all of
              its forms?
            </p>
            <nav>
              <button class="align-left">
                <nuxt-link to="/">Start over</nuxt-link>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("05/conclusion").fetch();
    const images = await $content("05/conclusion_images").fetch();
    return {
      page,
      images,
    };
  },
  scrollToTop: true,
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
  data() {
    return {
      name: "conclusion",
      wrapperHeight: null,
    };
  },
  mounted() {
    this.showTitlesAsCaption();
    this.setAnimation();
    this.setWrapperHeight();

    window.addEventListener("resize", () => {
      this.setAnimation();
      this.setWrapperHeight();
    });
  },

  unmounted() {
    window.removeEventListener("resize", this.setAnimation());
  },
  methods: {
    setWrapperHeight() {
      this.wrapperHeight = this.$refs.page.offsetHeight;
    },
    showTitlesAsCaption() {
      const ref = this.$refs.imageWrapper;
      if (!ref) {
        return;
      }
      // console.log("ref", ref);
      const imgs = Array.from(ref.querySelectorAll("img:not(.icon)"));
      if (!imgs) {
        return;
      }
      // console.log("imgs", imgs);
      imgs.forEach((img) => {
        const figure = document.createElement("figure");
        const parent = img.parentElement;
        figure.appendChild(img);
        const title = img.title;
        if (title) {
          const caption = document.createElement("figcaption");
          caption.innerHTML = title;
          figure.appendChild(caption);
        }
        parent.appendChild(figure);
      });
    },

    setAnimation() {
      const grid = this.$refs.grid;
      if (grid) {
        this.setGridAnimation(grid);
      }
    },
    setGridAnimation(grid) {
      const gsap = this.$gsap;
      const children = Array.from(grid.children);
      if (!children) {
        return;
      }

      gsap.set(children[0], {
        autoAlpha: 0,
        scale: 0.9,
      });

      gsap.to(children[0], {
        autoAlpha: 1,
        scale: 1,
        duration: 3,
      });

      // fade in first row
      gsap.set(children[1], {
        autoAlpha: 0,
        x: 300,
      });
      // console.log(children[1]);
      gsap.to(children[1], {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: children[0],
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });
      gsap.set(children[3], {
        autoAlpha: 0,
        x: -300,
        filter: "grayscale(1) brightness(0.3) contrast(3)",
      });
      gsap.to(children[3], {
        autoAlpha: 1,
        x: 0,
        filter: "grayscale(0) brightness(1) contrast(1)",
        scrollTrigger: {
          trigger: children[0],
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });

      gsap.set(children[4], {
        autoAlpha: 0,
        x: 300,
        filter: "grayscale(1) brightness(0.3) contrast(3)",
      });
      gsap.to(children[4], {
        autoAlpha: 1,
        x: 0,
        filter: "grayscale(0) brightness(1) contrast(1)",
        scrollTrigger: {
          trigger: children[0],
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });

      // fade in second row
      gsap.set(children[2], {
        autoAlpha: 0,
        x: -300,
      });
      gsap.to(children[2], {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: children[4],
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 4} top`,
          scrub: 0.8,
          // markers: true,
        },
      });
      gsap.set(children[5], {
        autoAlpha: 0,
        // x: 300,
        filter: "grayscale(1) brightness(0.3) contrast(3)",
      });
      gsap.to(children[5], {
        autoAlpha: 1,
        // x: 0,
        filter: "grayscale(0) brightness(1) contrast(1)",

        scrollTrigger: {
          trigger: children[4],
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });

      gsap.set(children[6], {
        autoAlpha: 0,
      });
      gsap.to(children[6], {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: children[5],
          start: `bottom-=${window.innerHeight / 6} top`,
          end: `bottom+=${window.innerHeight / 12} top`,
          scrub: true,
          // markers: true,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.conclusion {
  p,
  blockquote {
    @include pBigStyle();
  }

  .grid-the-end {
    p,
    figcaption,
    blockquote {
      color: white;
    }

    p.small {
      color: white;
      @include pStyle();
    }

    text-align: left;

    button:before {
      background: darken($forest, 10);
    }
  }
}

.conclusion {
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    figure {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        // min-width: 100%;
        // max-height: 100%;
        object-fit: cover;
        opacity: 0.6;
      }
      figcaption {
        position: absolute;
        top: 30px;
        right: 30px;
      }
    }
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    .text-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      width: 1280px;
      max-width: 1280px;
      margin: 0 auto;
      @media (max-width: 1280px) {
        width: 85%;
        width: 85vw;
        max-width: 85%;
        max-width: 85vw;
      }
      p {
        margin: 0;
      }
      grid-template-rows: auto;
      grid-gap: 15px;
      grid-column-gap: 30px;
      .grid5 {
        // quote
        grid-row: 1 / 2;
        grid-column: 3 / span 4;
        padding: 40% 0;
        padding: 40vh 0;
        @media (max-width: 960px) {
          grid-column: 1 / span 8;
        }
      }

      .grid1 {
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
      .grid3 {
        grid-row: 2 / 6;
        grid-column: 1 / 5;
        @media (max-width: 960px) {
          grid-column: 1 / span 8;
          grid-row: 4 / 5;
        }
      }
      .grid4 {
        grid-row: 5 / 6;
        grid-column: 5 / span 4;
        @media (max-width: 960px) {
          grid-column: 1 / span 8;
        }
      }

      .grid2 {
        grid-row: 6 / 7;
        grid-column: 1 / 4;
        place-self: end;
        @media (max-width: 960px) {
          padding-top: 50vh;
          grid-column: 1 / span 8;
        }
      }
      .grid6 {
        padding-top: 20%;
        padding-top: 20vh;
        grid-row: 6 / 7;
        grid-column: 4 / span 5;
        @media (max-width: 960px) {
          grid-column: 1 / span 8;
          grid-row: 7 / 8;
          padding-top: 0;
        }
      }
      .grid7 {
        grid-row: 7 / 8;
        grid-column: 2 / span 6;
        @media (max-width: 960px) {
          grid-column: 1 / span 8;
        }
        place-self: center;
        padding-top: 400px;
        padding-bottom: 25%;
        padding-bottom: 25vh;

        @media (max-width: 960px) {
          &.flex-row {
            flex-direction: column;
          }
          grid-column: 1 / span 8;
          grid-row: 8 / 9;
          padding-top: 50vh;
          padding-bottom: 60px;

          button.align-left {
            margin: 0 auto;
          }
        }
        figure {
          margin-top: 30px;
          flex: 0 0 50%;
        }
        .text {
          flex: 2;
          @media (min-width: 960px) {
            padding-left: 30px;
          }
        }
        p + p {
          margin: 30px 0;
        }
        // display: flex;
        // flex-direction: column-reverse;
      }
    }
    figure.full-width {
      margin: 0;
      min-width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>

