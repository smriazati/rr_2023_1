<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <Pagination
      v-if="isPaginationVisible"
      link="/2/talkback"
      message="Reflect on the occupation"
    />
    <Storymap
      :animActive="true"
      :markers="markers"
      :visitedOnce="visitedOnce"
    />
    <div v-if="isIntroVisible" class="modal-container">
      <div class="close-overlay" @click="closeIntro"></div>
      <InstructionModal :content="intro" @close-modal="closeIntro" />
    </div>

    <div v-if="isTimelineVisible" class="modal-container">
      <div class="close-overlay" @click="closeTimeline"></div>
      <InstructionModal :content="timeline" @close-modal="closeTimeline" />
    </div>
    <div v-show="showMapControls">
      <MapControls
        :markers="markers"
        @show-intro="showIntro()"
        @show-timeline="showTimeline()"
      />
    </div>

    <div v-if="isModalVisible" class="modal-container">
      <div class="close-overlay" @click="closeModal"></div>
      <StoryModal :content="activeStoryContent" @close-modal="closeModal" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ $content }) {
    const intro = await $content("02/introduction").fetch();
    const timeline = await $content("02/timeline").fetch();

    const chumot_house = await $content("02/chumot_house").fetch();
    const german_hq = await $content("02/german_hq").fetch();
    const ghetto = await $content("02/ghetto").fetch();
    const horyn_river = await $content("02/horyn_river").fetch();
    const synagogue = await $content("02/synagogue").fetch();
    const zaltsman_house = await $content("02/zaltsman_house").fetch();

    const chumot_house_images = await $content(
      "02/chumot_house_images"
    ).fetch();
    const german_hq_images = await $content("02/german_hq_images").fetch();
    const ghetto_images = await $content("02/ghetto_images").fetch();
    const horyn_river_images = await $content("02/horyn_river_images").fetch();
    const synagogue_images = await $content("02/synagogue_images").fetch();
    const zaltsman_house_images = await $content(
      "02/zaltsman_house_images"
    ).fetch();

    const markerContent = {
      chumot_house: {
        text: chumot_house,
        images: chumot_house_images,
      },
      german_hq: {
        text: german_hq,
        images: german_hq_images,
      },
      ghetto: {
        text: ghetto,
        images: ghetto_images,
      },
      horyn_river: {
        text: horyn_river,
        images: horyn_river_images,
      },
      synagogue: {
        text: synagogue,
        images: synagogue_images,
      },
      zaltsman_house: {
        text: zaltsman_house,
        images: zaltsman_house_images,
      },
    };
    return {
      intro,
      timeline,
      markerContent,
    };
  },
  data() {
    return {
      name: "occupation",
      isPaginationVisible: false,
      isIntroVisible: false,
      isModalVisible: false,
      isIntroActive: false,
      viewedAllStories: false,
      showMapControls: false,
      isTimelineVisible: false,
      markers: [
        {
          id: 0,
          name: "zaltsman_house",
          title: "Zaltsman House",
          lat: 50.7003356,
          lng: 26.5719255,
        },
        {
          id: 1,
          name: "chumot_house",
          title: "Chumot House",
          lat: 50.6988032,
          lng: 26.570062,
        },
        {
          id: 2,
          name: "synagogue",
          title: "Synagogue",

          lat: 50.7082228,
          lng: 26.57203,
        },
        {
          id: 3,
          name: "german_hq",
          title: "German Headquarters",
          lat: 50.698633,
          lng: 26.5661871,
        },
        {
          id: 4,
          name: "ghetto",
          title: "Ghetto",
          lat: 50.7002303,
          lng: 26.5713738,
        },
        {
          id: 5,
          name: "horyn_river",
          title: "Horyn River",
          lat: 50.710556,
          lng: 26.557222, //
        },
      ],
    };
  },
  watch: {
    activeStoryId() {
      if (this.activeStoryId !== null) {
        this.isModalVisible = true;
      }
    },
    viewedStories() {
      if (this.viewedStories.length === this.markers.length) {
        this.viewedAllStories = true;
        this.$store.commit("occupation/setFirstVisit");
      }
    },
    isModalVisible() {
      if (!this.isModalVisible && this.viewedAllStories) {
        this.showPagination();
      }
    },
    panAnimComplete() {
      if (this.panAnimComplete) {
        this.$store.commit(`occupation/setFlyoverComplete`);
        setTimeout(this.activateIntro, 1500);
      }
    },
  },
  mounted() {
    if (this.visitedOnce) {
      this.showMapControls = true;
    }
  },
  methods: {
    showPagination() {
      this.isPaginationVisible = true;
    },
    activateIntro() {
      this.isIntroActive = true;
      this.showIntro();
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetActiveStory();
    },
    resetActiveStory() {
      this.$store.commit("occupation/resetActiveStory");
    },
    closeIntro() {
      this.isIntroVisible = false;
      this.showMapControls = true;
    },
    showIntro() {
      this.isIntroVisible = true;
      this.showMapControls = false;
    },
    showTimeline() {
      this.isTimelineVisible = true;
      this.showMapControls = false;
    },
    closeTimeline() {
      this.isTimelineVisible = false;
      this.showMapControls = true;
    },
  },
  computed: {
    ...mapState("occupation", {
      activeStoryId: (state) => state.activeStory,
      viewedStories: (state) => state.viewedStories,
      panAnimComplete: (state) => state.panAnimComplete,
      visitedOnce: (state) => state.visitedOnce,
    }),
    activeStoryContent() {
      if (this.activeStoryId === null) {
        return null;
      }
      return this.markerContent[this.markers[this.activeStoryId].name];
    },
  },
};
</script>

<style lang="scss">
.occupation {
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}
</style>