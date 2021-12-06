<template>
  <div :class="isExpanded ? 'expanded' : 'collapsed'" class="map-controls">
    <button v-if="!isExpanded" class="menu-toggle" @click="toggleMenu">
      <span class="text">Open Map Menu</span>
    </button>
    <button v-else class="flat menu-toggle" @click="toggleMenu">
      <span class="visually-hidden">Close Map Menu</span>
      <SystemIcon type="close" color="light" :width="30" />
    </button>
    <h2 class="visually-hidden">Map controls</h2>
    <div class="map-box-wrapper">
      <nav class="map-options map-box">
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
      <nav class="map-marker-list map-box">
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

<style lang="scss">
.map-controls {
  .menu-toggle {
    display: none;
  }

  @media (max-width: $mobile-bp) {
    .menu-toggle {
      display: block;
      // top: 0;
      position: fixed;
      bottom: 15px;
      left: 15px;
      background: $gray;
    }

    &.expanded {
      .menu-toggle {
        position: relative;
      }
    }

    &.collapsed {
      background: transparent;
      height: auto;
      position: relative;

      nav {
        display: none;
      }
    }
  }
}

.map-controls {
  .map-box-wrapper {
    @media (min-width: $collapse-bp) {
      position: fixed;
      left: 15px;
      top: 150px;
    }
  }
  .map-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      width: 100%;
      padding: 10px 15px;
      background: $sage;
      color: $white;
      text-align: center;
      margin: 0;
      letter-spacing: 1px;
      @include pStyle();
      text-transform: uppercase;
      font-weight: 400;
    }
    ul {
      width: 100%;
      li {
        // white-space: nowrap;
        display: flex;
        align-items: center;
        background: $forest;
        > * {
          padding: 9px 15px;
        }
        > span:not(.icon) {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        transition: 0.3s ease all;
        > .icon {
          transition: 0.3s ease all;
          margin-right: 5px;
          img {
            height: 25px;
            width: 25px;
          }
        }

        &:hover {
          background: $forest;
          color: $white;
        }
      }
    }
  }
  .map-options {
    // position: fixed;
    // width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .map-marker-list {
    top: 300px;
    margin-top: 30px;
  }
}
.map-controls {
  .hover-cursor {
    transition: 0.3s ease all;
    a,
    span {
      transition: 0.3s ease all;
      color: white;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      color: $white;

      span {
        color: $white;
      }
    }
  }
}

$marker-color-0: #54a131;
$marker-color-1: #70a131;
$marker-color-2: #8ca131;
$marker-color-3: #a19a31;
$marker-color-4: #a17e31;
$marker-color-5: #a16231;
.map-marker-list {
  #marker-0 {
    .icon {
      background-color: $marker-color-0;
    }
  }

  #marker-1 {
    .icon {
      background-color: $marker-color-1;
    }
  }

  #marker-2 {
    .icon {
      background-color: $marker-color-2;
    }
  }

  #marker-3 {
    .icon {
      background-color: $marker-color-3;
    }
  }

  #marker-4 {
    .icon {
      background-color: $marker-color-4;
    }
  }

  #marker-5 {
    .icon {
      background-color: $marker-color-5;
    }
  }

  li > * {
    display: flex;
    // margin-bottom: 15px;

    .icon {
      width: 30px;
      height: 30px;
      transition: 0.3s ease all;
      -webkit-mask-image: url("./assets/icons/pin.svg");
      mask-image: url("./assets/icons/pin.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-size: contain;
    }

    &:not(.viewed-marker):hover {
      .icon {
        background-color: white;
      }
    }

    &.viewed-marker {
      .icon {
        background-color: $gray !important;
      }

      .title {
        text-decoration: line-through;
        color: $gray;
      }
    }
  }
}

@media (max-width: $collapse-bp) {
  .map-controls.expanded {
    background: rgba($gray, 0.9);
    position: fixed;
    z-index: 201;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 50px 0;
    .menu-toggle {
      position: fixed;
      z-index: 202;
      top: 0;
      right: 0;
      left: unset;
      width: 50px;
      height: 50px;
      padding: 11px;
      background: transparent;
      .icon {
        padding: 0;
      }
    }
    .map-box-wrapper {
      width: calc(100% - 50px);
      margin: 0 auto;
    }
  }
}
</style>