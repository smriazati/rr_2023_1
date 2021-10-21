<template>
  <div :class="name" class="stories-landing-page">
    <div class="text-wrapper">
      <nuxt-content :document="page" />
    </div>
    <div class="image-wrapper">
      <nuxt-link to="/4/stories/1" class="flat">
        <figure>
          <img src="/images/01/stories_01.jpg" alt="" />
          <figcaption>Laura Oberlender</figcaption>
        </figure>
      </nuxt-link>
      <nuxt-link to="/4/stories/2" class="flat">
        <figure>
          <img src="/images/01/stories_02.jpg" alt="" />
          <figcaption>Yosef Zilberberg</figcaption>
        </figure>
      </nuxt-link>
      <nuxt-link to="/4/stories/3" class="flat">
        <figure>
          <img src="/images/01/stories_03.jpg" alt="" />
          <figcaption>Miriam Schwartzman</figcaption>
        </figure>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("04/stories").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "aftermath-stories",
    };
  },
};
</script>

<style lang="scss">
</style>