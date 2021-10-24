<template>
  <div :class="isExpanded ? 'expanded' : 'collapsed'" class="map-controls">
    <button class="menu-toggle" @click="toggleMenu">
      <span v-if="isExpanded" class="text">Close Map Menu</span>
      <span v-else class="text">Open Map Menu</span>
    </button>
    <h2 class="visually-hidden">Map controls</h2>
    <nav class="map-options">
      <h3>Map options</h3>
      <ul>
        <li class="hover-cursor" @click="showIntro">
          <span class="icon">
            <img
              class="icon icon-instructions icon-light"
              src="/icons/instructions.svg"
              alt="view instructions icon" /></span
          >Show instructions
        </li>
        <!-- <li class="hover-cursor" @click="showTimeline">
          <span class="icon">
            <img
              class="icon icon-timeline icon-light"
              src="/icons/timeline.svg"
              alt="view timeline icon" /></span
          >View timeline
        </li> -->
        <li class="hover-cursor" id="recenterMap">
          <span class="icon">
            <img
              class="icon icon-recenter icon-light"
              src="/icons/recenter.svg"
              alt="recenter the map icon" /></span
          >Recenter map
        </li>
      </ul>
    </nav>
    <nav class="map-marker-list">
      <h3>Map markers</h3>
      <ul>
        <MapControlsMarkerListItem
          v-for="item in markers"
          :key="item.id"
          :item="item"
        />
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    showIntro() {
      this.$emit("show-intro");
    },
    showTimeline() {
      this.$emit("show-timeline");
    },
  },
};
</script>
