<template>
  <div
    ref="wrapper"
    class="instruction-modal"
    tabindex="0"
    @keydown.esc="closeModal"
  >
    <main class="story-map-intro">
      <header>
        <div>
          <h1>The Takeover of Tuchyn 1941-1942</h1>
          <h2>A StoryMap</h2>
        </div>
      </header>
      <section ref="text" class="text">
        <div class="text-wrapper">
          <p>
            This map takes you back in time to 1941 when German forces took over
            the town of Tuchyn in what is now Ukraine. Tuchyn was a small
            shtetl, a town home to many Jews, some of whom you have already met.
          </p>
          <p>
            This map takes you to several sites where Tuchyn’s Jewish residents
            experienced discrimination and violence under German occupation.
            After the war, Tuchyn no longer existed for the Jewish population as
            Germans and Ukrainian forces killed almost all its Jewish residents.
          </p>

          <p>
            Click on the map’s locations and learn about this history. Think of
            places in your own childhood where you played, laughed, or cried.
            Remember that it was home for the Jewish community and filled with
            just as many memories as your places.
          </p>
        </div>
      </section>
      <section class="featured-quote">
        <figure>
          <blockquote>
            It was precious to us, we were born there, studied, and spent our
            childhood days there…<br />Sometimes you stand and ask yourself: Is
            it true? Did all of this happen in the progressive world of the
            twentieth century?
            <figcaption>
              Yitzchak Gilberg, a Jewish resident of Tuchyn
            </figcaption>
          </blockquote>
        </figure>
      </section>
      <div class="button-wrapper">
        <button class="bright flex-col" @click="closeModal()">
          <span>Explore the map</span>
        </button>
      </div>

      <footer class="credits">
        <div>
          <p>
            This map contains approximate locations, based on a map Tuchyn
            survivors created and the research of Jared McBride, Stanislav
            Demianchuk, and Sarah Maske.
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>


<script>
export default {
  mounted() {
    const wrapper = this.$refs.wrapper;

    if (wrapper) {
      wrapper.focus();
      // console.log("focusing");
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss">
@media (max-width: $collapse-bp) {
  .modal-container {
    // height: unset;
    // position: absolute;
    overflow-y: scroll;
  }
}
.instruction-modal {
  outline: 0;
  &:focus {
    outline: 0;
  }
}
.story-map-intro {
  display: grid;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  grid-template-columns: repeat(2, 50vw);
  grid-template-rows: 1fr min-content 1fr;
  grid-template-areas:
    "h q"
    "t q"
    "b q"
    "f q";

  @media (max-width: $collapse-bp) {
    display: flex;
    flex-direction: column;
  }
  header,
  section.text,
  footer,
  .button-wrapper {
    background: $gray;
    @media (min-width: $collapse-bp) {
      padding-left: 30px;
    }
    @media (max-width: $collapse-bp) {
      padding: 30px;
    }
    width: 100%;
  }
  header,
  section,
  footer,
  .button-wrapper {
    > * {
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
      @media (max-width: 1280px) {
        max-width: 100%;
      }
    }
  }
  header {
    padding-top: 10vh;

    grid-area: h;
    > * {
      display: flex;
      flex-direction: column-reverse;
    }
    h1,
    h2 {
      text-align: left;
    }
    h1 {
      margin-top: 10px;
    }
    h2 {
      text-transform: uppercase;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
  .button-wrapper {
    grid-area: b;
  }
  section.featured-quote {
    grid-area: q;
    place-self: center;
    background: rgba(darken($sage, 30), 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  section.text {
    grid-area: t;
    padding-top: 60px;
    @media (max-width: $collapse-bp) {
      padding-top: 30px;
    }
  }
  footer {
    @media (min-width: $collapse-bp) {
      padding-bottom: 30px;
      text-align: center;
    }
    grid-area: f;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    p {
      font-size: 14px;
      line-height: 18px;
      color: lighten($gray, 80);
    }
  }
  blockquote {
    @include pBigStyle;
    figcaption {
      margin-top: 30px;
    }
  }
}
</style>