<template>
  <div class="story-landing-page-images">
    <div class="text-wrapper call-out">
      <h2 v-if="title" class="collapsed-mb">{{ title }}</h2>
      <p v-if="msg" class="small">
        {{ msg }}
      </p>
    </div>
    <div class="image-wrapper flex-row align-center">
      <nuxt-link
        class="image-col"
        v-for="(item, index) in items"
        :key="index"
        :to="`/${sectionIndex}/stories/${index + 1}`"
      >
        <figure class="">
          <div class="img">
            <img class="object-position-top" :src="item.src" :alt="item.alt" />
          </div>
          <figcaption>{{ item.name }}</figcaption>
        </figure>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sectionIndex: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
  mounted() {
    this.setAnimation();
  },
  methods: {
    setAnimation() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;
      const figures = gsap.utils.toArray(".image-col");
      if (!figures) {
        return;
      }
      figures.forEach((figure, i) => {
        const img = figure.querySelector("img");
        const caption = figure.querySelector("figcaption");
        // console.log(img);
        const captionDelay = 0.3;
        const itemDelay = i * 0.5;

        gsap.set(img, {
          autoAlpha: 0,
          y: 50,
          scale: 0.9,
        });
        gsap.set(caption, {
          autoAlpha: 0,
          scale: 0.9,
          // y: -50,
        });

        gsap.to(img, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          delay: itemDelay,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(caption, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          y: 0,
          ease: "power2.out",
          delay: itemDelay + captionDelay,
        });
      });
    },
  },
};
</script>

<style lang='scss'>
// set anim
.story-landing-page-images {
  img,
  figcaption {
    opacity: 0;
  }
}
.story-landing-page-images {
  .flex-row {
    @media (max-width: $mobile-bp) {
      flex-direction: row;
    }
    @media (max-width: $xs-bp) {
      flex-direction: column;
    }
  }
  .call-out {
    margin-bottom: 2rem;
    max-width: 50ch;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    > *:last-child {
      margin-bottom: 0;
    }
  }
  figure:hover,
  a:hover {
    text-decoration: none;
    figure,
    figcaption {
      text-decoration: none;
    }
  }

  .image-wrapper {
    > * {
      margin-right: 2%;
      text-align: center;
    }
    figure {
      display: flex;
      flex-direction: column;
      .img {
        // overflow: hidden;
        // clip-path: circle(50%);
        img {
          position: relative;
          z-index: 10;
          filter: grayscale(1);
          // transform: scale(0.95);
          transition: 3s ease filter;
        }
      }

      figcaption {
        position: relative;
        z-index: 9;
        flex: 0 0 80px;
        margin-top: 0.5rem;
        font-size: 24px;
        line-height: 30px;
      }
      &:hover {
        img {
          // filter: grayscale(0);
          // transform: scale(1);
        }
      }
    }
  }
}
</style>