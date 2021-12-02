<template>
  <div :class="name" class="stories-landing-page">
    <div class="story-lp-images-wrapper">
      <StoryLandingPageImages
        :items="stories"
        :sectionIndex="4"
        title="Aftermath and Rebirth"
        msg="Click below to hear what happened to the people and families from Tuchyn in the aftermath of the Holocaust and war. "
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "aftermath-stories",
      stories: [
        {
          src: "/images/01/intro_01.png",
          name: "Luba Chomut",
          alt: "Young girl in a dark dress.",
        },
        {
          src: "/images/01/intro_02.png",
          name: "Yosef Zilberberg",
          alt: "Adolescent boy in a shirt and jacket",
        },
        {
          src: "/images/01/intro_03.png",
          name: "Mania Schwartzman",
          alt: "Young woman in 1940s era clothing",
        },
      ],
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


<style lang="scss">
.aftermath-stories {
  @media (max-width: $collapse-bp) {
    padding-top: 60px;
  }
}
</style>
