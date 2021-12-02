<template>
  <div :class="name" class="stories-landing-page">
    <div class="main-row flex-row">
      <div class="text-wrapper call-out green-bg">
        <h1 class="center">Tuchyn Before<br />World War II</h1>
        <p>
          In the 1930s, Tuchyn was a shtetl, a predominantly Jewish town, in
          Poland. About two-thirds of the people in Tuchyn were Jewish. They
          lived and worked alongside Ukrainians and Poles. Rich farmland
          surrounded the town and people came from the rural areas to the market
          there.
        </p>
        <p>
          In 1933, thousands of miles away in Germany, Adolf Hitler and the Nazi
          Party came to power. They persecuted Jews and made them second-class
          citizens. In 1939, Germany launched World War II. When it invaded
          other countries, it imposed its antisemitic, or anti-Jewish, policies
          on the countries it occupied. The Germans did not come to Tuchyn
          initially. Instead, in 1939, the Soviets occupied this area of Poland.
        </p>
      </div>
      <div class="story-lp-images-wrapper">
        <StoryLandingPageImages
          :items="stories"
          :sectionIndex="1"
          title="Meet the people"
          msg="Click below to meet some of the people in Tuchyn and learn about their life before the war. "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "introduction-stories",
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

