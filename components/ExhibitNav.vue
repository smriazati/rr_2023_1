<template>
  <div>
    <nav
      :class="isExpanded ? 'expanded' : 'collapsed'"
      v-show="isExhibitNavVisible"
      class="exhibit-nav"
    >
      <button
        :class="isExpanded ? 'expanded' : 'collapsed'"
        class="menu-toggle flat"
        @click="toggleMenu"
      >
        <span class="text visually-hidden">View Menu</span>
        <span class="menu-button"
          ><svg viewBox="0 0 100 80" width="36" height="36">
            <rect class="line-1" width="64" height="10"></rect>
            <rect class="line-2" y="30" width="80" height="10"></rect>
            <rect class="line-3" y="60" width="64" height="10"></rect></svg
        ></span>
      </button>
      <ul ref="navLinks">
        <li><nuxt-link to="/1">Introduction</nuxt-link></li>
        <li><nuxt-link to="/2">Occupation</nuxt-link></li>
        <li><nuxt-link to="/3">Resistance</nuxt-link></li>
        <li><nuxt-link to="/4">Aftermath</nuxt-link></li>
        <li><nuxt-link to="/5">Conclusion</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("site", {
      isExhibitNavVisible: (state) => state.isExhibitNavVisible,
    }),
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
  },
  mounted() {
    const nav = this.$refs.navLinks;
    if (nav) {
      const links = nav.querySelectorAll("li");
      if (links) {
        links.forEach((link) => {
          // console.log(link);
          link.addEventListener("click", () => {
            this.isExpanded = false;
          });
        });
      }
    }
  },
};
</script>

<style scoped>
.menu-toggle .line-1 {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.menu-toggle .line-2 {
  top: 18px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.menu-toggle .line-3 {
  top: 36px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.menu-toggle.expanded .line-1 {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -3px;
  left: 8px;
}

.menu-toggle.expanded .line-2 {
  width: 0%;
  opacity: 0;
}

.menu-toggle.expanded .line-3 {
  -webkit-transform: rotate(-45deg) translateY(4px) translateX(1px);
  -moz-transform: rotate(-45deg) translateY(4px) translateX(1px);
  -o-transform: rotate(-45deg) translateY(4px) translateX(1px);
  transform: rotate(-45deg) translateY(4px) translateX(1px);
  top: 39px;
  left: 8px;
}
</style>
