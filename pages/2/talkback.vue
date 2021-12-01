<template>
  <div :class="name">
    <!-- <h1 class="visually-hidden">{{ name }}</h1> -->
    <div class="center">
      <h1 class="collapsed-mb">Talkback</h1>
      <p class="instructions">Please take a moment to define these terms:</p>
      <div class="terms-list" :class="areDefsVisible ? 'reveal' : ''">
        <div class="term-wrapper">
          <h2 class="collapsed-mb term">Judenrat</h2>
          <p class="def">
            A council representing the Jewish community under German occupation
            during World War II.
          </p>
        </div>
        <div class="term-wrapper">
          <h2 class="collapsed-mb term">Ghetto</h2>
          <p class="def">
            Segregated space where the Germans forced Jews to live in close
            quarters with limited resources.
          </p>
        </div>
        <div class="term-wrapper">
          <h2 class="collapsed-mb term">Pogrom</h2>
          <p class="def">
            A violent riot aimed at the robbery and killing of Jewish people.
          </p>
        </div>
        <div class="term-wrapper">
          <h2 class="collapsed-mb term">Synagogue</h2>
          <p class="def">
            A sacred place of worship, study, and social life for Jewish people.
          </p>
        </div>
        <div class="term-wrapper">
          <h2 class="collapsed-mb term">Antisemitism</h2>
          <p class="def">Prejudice against or hatred of Jews.</p>
        </div>
        <div class="button-wrapper">
          <button class="bright centered" @click="toggleDefs">
            <span v-if="areDefsVisible"
              >Click here to hide these definitions</span
            >
            <span v-else>Click here to see these definitions</span>
          </button>
        </div>
      </div>
    </div>

    <!-- <Talkback :data="page" /> -->
    <div v-if="isPaginationVisible">
      <Pagination link="/3" message="Video About Resistance" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("02/talkback").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "occupation-talkback",
      areDefsVisible: false,
      isPaginationVisible: false,
    };
  },
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
  methods: {
    toggleDefs() {
      this.areDefsVisible = !this.areDefsVisible;
      if (!this.isPaginationVisible) {
        this.showPagination();
      }
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
  },
};
</script>

<style lang="scss">
.occupation-talkback {
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  // background: #35452b73;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-bottom: 15px;
  }
}
.terms-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @include siteContainerBig();
  margin-top: 30px;
  > * {
    margin: 15px;
    flex: 30%;
  }
  .button-wrapper {
    flex: 100%;
    margin: 15px;
    margin-top: 30px;
    button {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .term-wrapper {
    background: $white;
    color: $gray;
    padding: 3rem;
    text-align: center;
    border-radius: 6px;
    * {
      color: $gray;
      margin: 0;
    }
    h2 {
      font-size: 42px;
      transition: 0.5s ease-out all;
    }
    &:hover {
      h2 {
        font-size: 50px;
      }
    }
  }

  &:not(.reveal) {
    .def {
      display: none;
    }
  }
  &.reveal {
    h2 {
      margin-bottom: 10px;
    }
    &:hover h2 {
      font-size: 42px;
    }
  }
}
</style>