<template>
  <div :class="name" class="talkback-with-grid">
    <h1 class="visually-hidden">{{ name }}</h1>
    <Talkback :data="page" />
    <Pagination link="/4" message="Learn what happened after" />
    <div class="gallery-wrapper">
      <div v-for="item in galleryCount" :key="item">
        <figure>
          <img src="/images/03/symbol.jpg" alt="" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("03/talkback").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "resistance-talkback",
      galleryCount: 12,
    };
  },
};
</script>

<style lang="scss">
.resistance-talkback {
  .pagination {
    bottom: 100px;
  }
}
</style>
