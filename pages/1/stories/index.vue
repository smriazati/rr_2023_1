<template>
  <div :class="name" class="stories-landing-page">
    <div class="text-wrapper">
      <nuxt-content :document="page" />
    </div>
    <div class="image-wrapper">
      <nuxt-link to="/1/stories/1" class="flat">
        <figure>
          <img src="/images/01/stories_01.jpg" alt="" />
          <figcaption>Luba Chomut</figcaption>
        </figure>
      </nuxt-link>
      <nuxt-link to="/1/stories/2" class="flat">
        <figure>
          <img src="/images/01/stories_02.jpg" alt="" />
          <figcaption>Yosef Zilberberg</figcaption>
        </figure>
      </nuxt-link>
      <nuxt-link to="/1/stories/3" class="flat">
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
    const page = await $content("01/stories").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      name: "introduction-stories",
    };
  },
};
</script>

