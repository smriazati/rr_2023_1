<template>
  <div>
    <nav v-show="isExhibitNavVisible" class="exhibit-nav">
      <ul>
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
};
</script>


<style lang="scss">
.exhibit-nav {
  padding: 15px;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #000;
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
      //   text-transform: uppercase;
      letter-spacing: 0.6px;
      a {
        color: rgb(213, 213, 213);
        transform: scale(1);
        transition: 0.3s ease all;
        display: block;
      }
      &:hover {
        a {
          color: rgb(142, 196, 142);
          transform: scale(1.1);
        }
      }

      a.nuxt-link-active {
        color: rgb(142, 196, 142); // sage
        transform: scale(1.1);
      }
    }
  }
}
</style>