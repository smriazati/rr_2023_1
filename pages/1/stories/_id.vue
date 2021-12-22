<template>
  <div ref="wrapper" :class="name" class="stories-individual">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div ref="storyWrapper" v-if="this.$route.params.id === '1'">
      <StoriesIntro1 />
    </div>
    <div ref="storyWrapper" v-if="this.$route.params.id === '2'">
      <StoriesIntro2 />
    </div>
    <div ref="storyWrapper" v-if="this.$route.params.id === '3'">
      <StoriesIntro3 />
    </div>

    <div class="pagination-row flex-row" v-show="isPaginationVisible">
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
export default {
  data() {
    return {
      name: "intro-stories-individual",
      isPaginationVisible: true,
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
  methods: {
    showPagination() {
      this.isPaginationVisible = true;
    },
  },
};
</script>

<style lang="scss">
// static pagination
.stories-individual.intro-stories-individual {
  .pagination-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    nav.pagination {
      position: relative;
    }
  }
}
</style>