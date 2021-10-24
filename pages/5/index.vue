<template>
  <div ref="page" :class="name" class="dark-pattern-bg transition-bg">
    <h1 class="visually-hidden">{{ name }}</h1>
    <section class="flex-col-reverse">
      <ScrollHint />
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
            src="/images/05/conclusion_01.jpg"
            alt="Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride."
          />
          <figcaption>
            Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride.
          </figcaption>
        </figure>
        <figure class="grid4 full-width grid-second-image">
          <img
            src="/images/05/conclusion_02.jpg"
            alt="Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride."
          />
          <figcaption>
            Photograph of Memorial Monument in Tuchyn, 2016, Jared McBride.
          </figcaption>
        </figure>

        <figure class="grid6 full-width grid-third-image">
          <img
            src="/images/05/conclusion_03.jpg"
            alt="Photograph of Jewish Cemetery in Tuchyn, 2020, Nataliia Ivchyk."
          />
          <figcaption>
            Photograph of Jewish Cemetery in Tuchyn, 2020, Nataliia Ivchyk.
          </figcaption>
        </figure>
        <div
          class="grid7 grid-the-end text-wrapper light flex-row align-center"
        >
          <figure>
            <img
              src="/images/05/conclusion_04.jpg"
              alt="Painting of Doves, by Yosef Zilberberg, n.d., Yosef Zilberberg."
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
                <nuxt-link to="/1">Start over</nuxt-link>
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

  data() {
    return {
      name: "conclusion",
    };
  },
  mounted() {
    this.showTitlesAsCaption();
    this.$nextTick(this.setAnimation());

    window.addEventListener("resize", this.setAnimation());
  },

  unmounted() {
    window.removeEventListener("resize", this.setAnimation());
  },
  methods: {
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
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    setAnimation() {
      this.registerPlugins();
      //   console.log(gsap);

      if (!gsap || !ScrollTrigger) {
        console.log("Cancelling animation, no GSAP or ST exists.");
        return;
      }

      const grid = this.$refs.grid;
      if (grid) {
        this.setGridAnimation(grid);
      }
    },
    setGridAnimation(grid) {
      const children = Array.from(grid.children);
      if (!children) {
        return;
      }
      // const children = grid.childElements
      // console.log(children);

      // children.forEach((child, i) => {
      //   // console.log(child);
      //   gsap.set(child, {
      //     autoAlpha: 0,
      //   });
      // });

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

      // fade in "the end "
      // console.log(children);
      const page = this.$refs.page;
      // gsap.set(page, {
      //   background: "#131313",
      // });
      gsap.to(page, {
        // background: "#eaeaea",
        scrollTrigger: {
          trigger: children[5],
          start: `bottom-=${window.innerHeight / 6} top`,
          scrub: true,
          // markers: true,

          onToggle: (self) => {
            console.log(self.direction, self.isActive);
            if (self.direction === 1 && self.isActive) {
              page.classList.add("green-pattern-bg");
              if (page.classList.contains("dark-pattern-bg")) {
                page.classList.remove("dark-pattern-bg");
              }
            }
            if (self.direction === -1 && !self.isActive) {
              page.classList.add("dark-pattern-bg");
              if (page.classList.contains("green-pattern-bg")) {
                page.classList.remove("green-pattern-bg");
              }
            }
          },
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
        width: 90%;
        width: 90vw;
        max-width: 90%;
        max-width: 90vw;
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
      }

      .grid1 {
        grid-row: 3 / 4;
        grid-column: 5 / span 3;
        padding-top: 20%;
        padding-bottom: 100px;
      }
      .grid3 {
        grid-row: 2 / 6;
        grid-column: 1 / 5;
      }
      .grid4 {
        grid-row: 5 / 6;
        grid-column: 5 / span 4;
      }

      .grid2 {
        grid-row: 6 / 7;
        grid-column: 1 / 4;
        place-self: end;
      }
      .grid6 {
        padding-top: 20%;
        padding-top: 20vh;
        grid-row: 6 / 7;
        grid-column: 4 / span 5;
      }
      .grid7 {
        grid-row: 7 / 8;
        grid-column: 2 / span 6;
        place-self: center;
        padding-top: 400px;
        padding-bottom: 25%;
        padding-bottom: 25vh;
        figure {
          margin-top: 30px;
          flex: 0 0 50%;
        }
        .text {
          flex: 2;
          padding-left: 30px;
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

