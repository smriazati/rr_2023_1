<template>
  <li :id="`marker-${item.id}`">
    <span
      class="hover-cursor"
      :class="isViewed ? 'viewed-marker' : ''"
      @click="setActiveStory"
    >
      <span class="icon"></span>
      <span class="title">{{ item.title }}</span>
    </span>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    ...mapState("occupation", {
      viewedStories: (state) => state.viewedStories,
    }),
    isViewed() {
      if (!this.viewedStories) {
        return null;
      }
      if (this.viewedStories.includes(this.item.id)) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setActiveStory() {
      this.$store.commit("occupation/setActiveStory", this.item.id);
    },
  },
};
</script>
