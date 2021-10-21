<template>
  <div :class="name" class="story">
    <div v-show="activeState === 1" class="intro">
      <div class="text-wrapper">
        <nuxt-content :document="page.start" />
        <button class="flex-row-reverse">
          <nuxt-link to="/4/stories">Back to all stories</nuxt-link
          ><span class="icon icon-arrow icon-arrow-left"><IconArrow /></span>
        </button>
        <button @click="goToNextState">
          <span>Watch the video interview</span
          ><span class="icon icon-arrow"><IconArrow /></span>
        </button>
      </div>
    </div>
    <div v-show="activeState === 2" class="video">
      <video ref="video" controls>
        <source src="/videos/04/placeholder.mp4" type="video/mp4" />
      </video>
      <button @click="goToPrevState" class="flex-row-reverse">
        <span>Go back</span
        ><span class="icon icon-arrow icon-arrow-left"><IconArrow /></span>
      </button>
      <button @click="goToNextState">
        <span>Continue</span><span class="icon icon-arrow"><IconArrow /></span>
      </button>
    </div>
    <div v-show="activeState === 3" class="story-conclusion">
      <div class="text-wrapper">
        <nuxt-content :document="page.end" />
        <button @click="goToPrevState" class="flex-row-reverse">
          <span>Go back to the video</span
          ><span class="icon icon-arrow icon-arrow-left"><IconArrow /></span>
        </button>
      </div>

      <Pagination link="/5" message="Move on to the conclusion" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const validRoutes = ["1", "2", "3"];
    if (!validRoutes.includes(params.id)) {
      return error({ statusCode: 404, message: "oops" });
    } else {
      const page_start = await $content(`04/${params.id}_start`).fetch();
      const page_end = await $content(`04/${params.id}_end`).fetch();
      return {
        page: {
          start: page_start,
          end: page_end,
        },
      };
    }
  },

  data() {
    return {
      name: "occupation-stories-individual",
      states: [1, 2, 3],
      activeState: 1,
    };
  },
  mounted() {
    // console.log();
  },
  methods: {
    goToNextState() {
      if (this.activeState < 3) {
        this.activeState = this.activeState + 1;
        this.pauseVid();
      }
    },
    goToPrevState() {
      this.activeState = this.activeState - 1;
      this.pauseVid();
    },
    pauseVid() {
      if (this.$refs.video) {
        this.$refs.video.pause();
      }
    },
  },
};
</script>


<style lang="scss">
.occupation-stories-individual {
  button {
    span:last-child {
      padding-left: 0;
    }
  }
  .icon img {
    filter: invert(1);
  }
}
</style>