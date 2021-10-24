<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <Talkback :data="page" />
    <Pagination link="/3" message="Learn about Resistance" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("02/talkback").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "occupation-talkback",
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
};
</script>
