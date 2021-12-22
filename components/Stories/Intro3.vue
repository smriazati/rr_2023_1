<template>
  <main class="content">
    <StoryTitle
      title="Mania Schwartzman"
      sectionTitle="Introduction"
      img="/images/01/intro_03.png"
      imgAlt="Young woman in 1940s era clothing"
    />
    <div class="row">
      <div class="row">
        <!-- <figure>
          <img
            src="/images/01/intro_stories_ms_01.jpg"
            alt="Photo of dark-haired woman in 1940s clothes."
          />
          <figcaption>
            Mania Schwartzman, c. 1940s, Courtesy Gideon Kouts.
          </figcaption>
        </figure> -->
        <figure>
          <img
            src="/images/01/intro_stories_ms_03.png"
            alt="Photograph of large, leafy green tree."
          />
          <figcaption>
            Tree near house of Schwartzman Family, c. 2012, Courtesy Gideon
            Kouts.
          </figcaption>
        </figure>
        <div class="col">
          <p>
            Mania Schwartzman was born in Tuchyn in 1924. She had a younger
            sister Basia and three brothers David, Leib, and Lova. They lived
            with their parents Getzl and Rivka in a house in the “Zamd” (Sands).
          </p>
          <p>
            The Zamd sat in an area of town with beautiful buildings, a garden
            of fruit trees, and the Horyn River. Mania’s family had a large tree
            that stood near the house along the path to the river. It still
            stands there today.
          </p>
        </div>
      </div>
    </div>
    <div class="row dark">
      <figure class="banner">
        <img
          src="/images/01/intro_stories_ms_02.jpg"
          alt="Photo of cream colored house with bright blue shutters surrounded by
      trees."
        />
        <figcaption>
          The Schwartzman family house, c. 2012, Courtesy Gideon Kouts.
        </figcaption>
      </figure>
    </div>
    <div class="row">
      <div class="row row-reverse">
        <figure>
          <img
            src="/images/01/intro_stories_ms_04.jpg"
            alt="Photograph of man in 1930s clothes with a small moustache."
          />
          <figcaption>
            Getzl Schwartzman, c. 1930s, Tuchin Kripe: In Memory of the Jewish
            Community.
          </figcaption>
        </figure>
        <div class="col">
          <p>
            Mania’s father Getzl ran the town’s transportation company and
            garage. Getzl was a &ldquo;soltis,&rdquo; a leader in the town
            council and a respected member of the Jewish community. He later
            became the head of the Judenrat, Jewish Council, during the German
            occupation.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          In 1939, when Mania was fifteen, war broke out and the Russians took
          over Tuchyn. The Russians added classes to the Jewish school drafted
          young Jews including Mania's brother Leib into the army. In the summer
          of 1941, the Germans invaded the Soviet Union and drove the Russians
          out of the area. Many Jews ultimately fought with the Russians against
          the Nazis during World War II.
        </p>
        <p>
          In this exhibition, you will learn what happened under the Germans by
          hearing more about the Schwartzmans and other Jewish families in
          Tuchyn.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.checkScrollToBottom();
    });
  },
  methods: {
    checkScrollToBottom() {
      const ScrollTrigger = this.$ScrollTrigger;
      const trigger = this.$refs.content;
      if (trigger) {
        ScrollTrigger.create({
          trigger: trigger,
          // markers: true,
          start: "top-=100px top",
          end: `bottom-=${window.innerHeight / 2} bottom`,
          onToggle: (self) => {
            // console.log(self.isActive);
            if (!self.isActive) {
              this.onScrollEnd();
            }
          },
        });
      }
    },
    onScrollEnd() {
      this.$emit("on-scroll-end");
    },
  },
};
</script>