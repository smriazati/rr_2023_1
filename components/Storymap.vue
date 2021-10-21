<template>
  <div>
    <button ref="panToButton" id="panToButton" class="visually-hidden">
      Pan to
    </button>
    <button ref="onReturnButton" id="onReturnButton" class="visually-hidden">
      Show markers
    </button>
    <div class="storymap-map">
      <div ref="map" class="map"></div>
    </div>
  </div>
</template>
<script>
// TUCHYN: 50.711008, 26.573502
export default {
  props: {
    animActive: {
      type: Boolean,
    },
    markers: {
      type: Array,
    },
    visitedOnce: {
      type: Boolean,
    },
  },
  methods: {
    showIntro() {
      this.isIntroVisible = !this.isIntroVisible;
    },
  },
  mounted() {
    if (!this.visitedOnce) {
      this.$maps.showMap(
        this.$refs.map,
        this.nc.lat,
        this.nc.lng,
        this.markers,
        "tuchyn"
      );
      if (this.animActive) {
        setTimeout(() => {
          this.$refs.panToButton.click();
        }, 2500);
      }
    } else {
      this.$maps.showMap(
        this.$refs.map,
        this.tuchyn.lat,
        this.tuchyn.lng,
        this.markers,
        "tuchyn"
      );
      this.$refs.onReturnButton.click();
    }
  },
  data() {
    return {
      tuchyn: {
        lat: "50.711008",
        lng: "26.573502",
      },
      nc: {
        lat: "35.7596",
        lng: "-79.0193",
      },
    };
  },
};
</script>
