<template>
  <div class="default-layout">
    <ExhibitNav />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: this.$route.name,
    };
  },
  mounted() {
    this.hideNavInIntroduction();
  },
  watch: {
    $route: function (value) {
      this.page = value.name;
      this.hideNavInIntroduction();
    },
  },
  computed: {
    ...mapState("site", {
      isExhibitNavVisible: (state) => state.isExhibitNavVisible,
    }),
  },
  methods: {
    hideNavInIntroduction() {
      if (this.page === "1" || this.page === "index") {
        this.$store.commit("site/hideExhibitNav");
      } else {
        if (!this.isExhibitNavVisible) {
          this.$store.commit("site/showExhibitNav");
        }
      }
    },
  },
};
</script>


<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>