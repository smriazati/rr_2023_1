<template>
  <div ref="wrapper" :class="name" class="stories-individual">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div v-if="this.$route.params.id === '1'">
      <StoriesIntro1 />
    </div>
    <div v-if="this.$route.params.id === '2'">
      <StoriesIntro2 />
    </div>
    <div v-if="this.$route.params.id === '3'">
      <StoriesIntro3 />
    </div>

    <div v-show="isPaginationVisible">
      <Pagination
        link="/1/stories"
        message="Back to All Stories"
        :back="true"
      />
      <Pagination link="/2" message="Explore Map of Tuchyn" />
    </div>
  </div>
</template>

<script>
import animation from "~/mixins/storyAnimations.js";

export default {
  data() {
    return {
      name: "intro-stories-individual",
      isPaginationVisible: false,
      pageNames: {
        1: "Meet Luba Chomut",
        2: "Meet Yosef Zilberberg",
        3: "Meet Mania Schwartzman",
      },
    };
  },
  head() {
    return {
      title: this.pageNames[this.$route.params.id],
    };
  },
  mounted() {
    this.setAnim();
    this.$nextTick(() => {
      this.showPaginationAtBodyEnd();
    });
  },
  mixins: [animation],
};
</script>
