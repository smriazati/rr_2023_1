<template>
  <main ref="content" class="content">
    <StoryTitle
      title="Luba Chomut"
      sectionTitle="Introduction"
      img="/images/01/intro_01.png"
      imgAlt="Young girl in a dark dress"
    />
    <div class="row">
      <div class="row">
        <figure>
          <img
            src="/images/01/intro_stories_lc_01.jpg"
            alt="Older woman in dark clothing standing with two young girls."
          />
          <figcaption>
            Chana, Dvora, and Luba Chomut, c. 1937, Courtesy Michael Emmett.
          </figcaption>
        </figure>
        <div class="col">
          <p>
            Luba Chomut was born in Tuchyn in 1934. Her parents Itzak and Perla
            named her Luba, which means “love.” She had a sister who was three
            years older than her named Chana.
          </p>
          <p>
            Luba’s favorite day of the week was Shabbat, a holiday and day of
            rest that happened every Saturday. On Shabbat, she wore her blue
            coat and leather boots that she laced up to her knees. While many
            adults went to synagogue, the Jewish place of worship, Luba loved
            walking around town with Chana looking at the shops.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row">
        <figure>
          <img
            src="/images/01/intro_stories_lc_02.jpg "
            alt="Painting of an older man in all black walking down a cobbled street under a stone archway."
          />
          <figcaption>
            Walking Home from Synagogue [in Tuchyn], by Yosef Zilberberg,
            Courtesy Yosef Zilberberg.
          </figcaption>
        </figure>
        <div class="col">
          <p>
            Luba’s favorite day of the week was Shabbat, a holiday and day of
            rest that happened every Saturday. On Shabbat, she wore her blue
            coat and leather boots that she laced up to her knees. While many
            adults went to synagogue, the Jewish place of worship, Luba loved
            walking around town with Chana looking at the shops.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row row-reverse">
        <figure>
          <img
            src="/images/01/intro_stories_lc_03.jpeg"
            alt="Photograph of a large family with several men, women, and children all in darker clothing in 1930s-era clothing."
          />
          <figcaption>
            Chomut Family, c. 1930s, Courtesy Michael Emmett.
          </figcaption>
        </figure>
        <div class="col">
          <p>
            Luba had a large family, with many aunts and uncles and cousins. Her
            father and Uncle Fridal were well-respected members of their
            community.
          </p>
          <p>
            While Luba had some good memories of Tuchyn, it was a hard place for
            the Jewish residents to live. Some Ukrainians called Jews names and
            threw stones at them.
          </p>
          <p>
            In 1939, when Luba was five, war broke out and Russians took over
            the town. In those years, her family moved into a new house. But,
            they also lived in fear that the Soviets might send them away to
            Siberia.
          </p>
          <p>
            In the summer of 1941, the Germans invaded the Soviet Union and took
            over Tuchyn. In this exhibition, you will learn what happened under
            the Germans by hearing more about the Chomuts and other Jewish
            families in Tuchyn.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    onScrollEnd() {
      this.$emit("on-scroll-end");
    },
  },
};
</script>