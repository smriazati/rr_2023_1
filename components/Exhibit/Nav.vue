<template>
  <div class="exhibit-nav">
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
    <nav
      :class="isExpanded ? 'expanded' : 'collapsed'"
      v-show="isExhibitNavVisible"
      class="exhibit-nav-wrapper"
      ref="navWrapper"
    >
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
    ...mapState("exhibitNav", {
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
      if (this.isExpanded) {
        this.openMenuAnimation();
      } else {
        this.closeMenuAnimation();
      }
    },
    setMenuAnimation() {
      const gsap = this.$gsap;
      const ref = this.$refs.navWrapper;
      // console.log(ref, "set");

      gsap.set(ref, {
        x: "-100vw",
      });
    },
    openMenuAnimation() {
      const gsap = this.$gsap;
      const ref = this.$refs.navWrapper;
      // console.log(ref, "open");

      gsap.to(ref, {
        x: "0vw",
        duration: 0.3,
      });
    },
    closeMenuAnimation() {
      const gsap = this.$gsap;
      const ref = this.$refs.navWrapper;
      // console.log(ref, "close");
      gsap.to(ref, {
        x: "-100vw",
        duration: 0.3,
      });
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
    if (window.innerWidth < 768) {
      this.setMenuAnimation();
    }
  },
};
</script>

<style lang="scss">
.route-null {
  .exhibit-nav {
    display: none;
  }
}
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
  -webkit-transform: rotate(-45deg) translateY(6px) translateX(2px);
  -moz-transform: rotate(-45deg) translateY(6px) translateX(2px);
  -o-transform: rotate(-45deg) translateY(6px) translateX(2px);
  transform: rotate(-45deg) translateY(6px) translateX(2px);
  top: 39px;
  left: 8px;
}

.exhibit-nav {
  position: fixed;
  z-index: 400;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #404a3b;

  //   color: #fff;
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
    width: 100%;

    li {
      flex: 1;
      text-align: center;
      font-size: 14px;
      letter-spacing: 0.6px;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        color: rgb(213, 213, 213);
        transform: scale(1);
        transition: 0.3s ease all;
        display: block;
        height: 100%;
        width: 100%;
        padding: 15px;
      }

      &:hover {
        a {
          background: $gray;
          color: $white;
        }
      }

      a.nuxt-link-active {
        background: $forest;
        color: $white;
        &:hover {
          cursor: default;
        }
        // transform: scale(1.1);
      }
    }
  }

  .menu-toggle {
    display: none;
  }

  @media (max-width: $collapse-bp) {
    .menu-toggle {
      display: block;
      &:focus {
        outline: 0;
      }
      // top: 0;
      position: fixed;
      top: 15px;
      left: 15px;
      width: 45px;
      height: 45px;
      z-index: 301;
      rect {
        transition: 0.3s ease all;
        fill: #fff;
      }

      &:hover {
        cursor: pointer;

        rect {
          fill: $sage;
        }
      }
    }

    width: auto;
    display: flex;
    background: transparent;
    flex-direction: column;
    justify-content: center;
    height: 0;
    ul {
      height: 100vh;
      background: rgba($forest, 1);
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: 15px;
      padding-right: 30px;
      background: rgba($forest, 1);

      li {
        background: rgba($forest, 1);
        flex: 0;
        text-transform: uppercase;
        font-size: 22px;
        text-align: left;
        line-height: 24px;
        letter-spacing: 2px;
        width: auto;
        a {
          background: rgba($forest, 1);
        }
        a.nuxt-link-active {
          color: $gray;
          &:hover {
            cursor: default;
          }
        }
      }
    }
    .exhibit-nav-wrapper.collapsed {
      transform: translateX(-100vw);
    }
  }
}
</style>
