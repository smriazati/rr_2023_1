<template>
  <div :class="name">
    <div class="grid">
      <header>
        <h1>Symbols of Oppression<br />and Resistance</h1>
      </header>
      <section class="text">
        <div class="text-wrapper">
          <p>
            During the Holocaust, symbols were used to oppress people. German
            officials forced Jewish residents in Tuchyn to wear a yellow Star of
            David to identify themselves as different and inferior. The Nazis
            also used symbols in concentration and death camps. Criminals wore
            green triangles, Jehovah's Witnesses wore purple ones, and LGBTQ+
            people wore pink ones.
          </p>
          <h2>Symbols of Resistance</h2>
          <p>
            But symbols also mean resistance, such as a raised fist or a peace
            symbol. Many LGBTQ+ advocacy groups use the upside-down pink
            triangle, making a symbol of oppression into one of resistance.
          </p>
        </div>
      </section>
      <section class="call-out-wrapper">
        <div class="call-out text-wrapper">
          <h2 class="collapsed-mb subheadline">Question to Consider</h2>
          <p class="big">
            When you think of resistance, what symbol comes to your mind?
          </p>
          <h3 class="subheadline">What Comes Next?</h3>
          <p>
            Later in the exhibition, you will create your own resistance symbol.
            Your symbol can be whatever you want, just try to be original,
            uplifting, and inclusive. No one should feel judged, excluded, or
            unsafe looking at your symbol.
          </p>
        </div>
      </section>
    </div>
    <Pagination link="/4" message="Learn What Happened After" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" "),
    };
  },
  data() {
    return {
      name: "resistance-talkback",
      galleryCount: 12,
    };
  },
};
</script>

<style lang="scss">
.resistance-talkback {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  @media (min-width: $collapse-bp) {
    min-width: 100vw;
  }
  h1 {
    margin-bottom: 15px;
  }
  .text-wrapper h2:not(.collapsed-mb),
  .text-wrapper h3:not(.collapsed-mb) {
    margin-bottom: 15px;
  }
  .flex-col {
    margin-bottom: 30px;
  }
  .grid {
    display: grid;
    height: 100%;
    @media (min-width: $collapse-bp) {
      min-height: 100vh;
    }

    width: 100%;
    min-width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "h q" "t q";
    > * {
      padding: 30px;
      > * {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    @media (max-width: $collapse-bp) {
      display: flex;
      flex-direction: column;
      padding-top: 60px;
      > * {
        width: 100%;
      }
    }
  }
  header {
    grid-area: h;
    align-self: end;
    h1 {
      margin: 0;
    }
  }
  section.text {
    padding-top: 0;
    grid-area: t;

    .text-wrapper {
      @media (max-width: $collapse-bp) {
        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  section.call-out-wrapper {
    grid-area: q;
    place-self: center;
    background: rgba($forest, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p.big {
      @include pBigStyle();
    }
  }

  .pagination {
    @media (max-width: $collapse-bp) {
      margin-top: 30px;
    }
  }
}
</style>