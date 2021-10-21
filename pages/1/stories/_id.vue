<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div></div>
    <nuxt-content :document="page" />
    <Pagination link="/2" message="Next" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const validRoutes = ["1", "2", "3"];
    if (!validRoutes.includes(params.id)) {
      return error({ statusCode: 404, message: "oops" });
    } else {
      const page = await $content(`01/stories_0${params.id}`).fetch();
      return {
        page,
      };
    }
  },

  data() {
    return {
      name: "occupation-stories",
    };
  },
  mounted() {
    // console.log();
  },
};
</script>

<style lang="scss">
.occupation-stories {
  background: #000;
  color: #fff;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  .nuxt-content {
    display: flex;
    align-items: center;
    width: 100%;
    h1 {
      flex: 2;
      padding: 15px;
    }
    img {
      padding-left: 50px;
      max-height: 800px;
    }
  }
}
</style>