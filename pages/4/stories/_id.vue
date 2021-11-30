<template>
  <div :class="name" class="story stories-individual">
    <div v-if="this.$route.params.id === '1'">
      <StoriesAftermath1 />
    </div>
    <div v-if="this.$route.params.id === '2'">
      <StoriesAftermath2 />
    </div>
    <div v-if="this.$route.params.id === '3'">
      <StoriesAftermath3 />
    </div>
    <div v-if="isPaginationVisible">
      <Pagination
        link="/4/stories"
        message="Back to All Stories"
        :back="true"
      />
      <Pagination link="/5" message="Move on to the Conclusion" />
    </div>
  </div>
</template>

<script>
import animation from "~/mixins/storyAnimations.js";

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
      name: "aftermath-stories-individual",
      isPaginationVisible: false,
      pageNames: {
        1: "Aftermath: Luba Chomut",
        2: "Aftermath: Yosef Zilberberg",
        3: "Aftermath: Mania Schwartzman",
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
    this.showPaginationAtBodyEnd();
  },
  mixins: [animation],
};
</script>


