<template>
  <div :class="name" class="talkback-with-grid">
    <h1 class="visually-hidden">{{ name }}</h1>
    <Talkback :data="page" />
    <div class="gallery-wrapper">
      <div v-for="item in galleryCount" :key="item">
        <figure>
          <img src="/images/03/symbol.jpg" alt="" />
        </figure>
      </div>
    </div>
    <Pagination link="/4" message="Learn what happened after" />
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
  head() {
    return {
      title: this.name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" "),
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
