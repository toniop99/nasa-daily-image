<template>

  <Loading v-if="nasaState.loading" />
  <div
    v-if="!nasaState.loading"
    class="nasa-container"
  >
    <div
      v-if="isVideo"
      class="nasa-video"
    >
      <iframe :src="videoURLToDisplay">
      </iframe>
    </div>

    <div v-if="!isVideo">
      <a
        :href="nasaState.data.hdurl"
        target="_blank"
        rel="noopener noreferrer"
        download="image.jpg"
        class="download-image"
      >
        <img src="assets/download.webp" />
      </a>
      <img
        class="nasa-image"
        :src="nasaState.data.hdurl"
      />
    </div>
    <a
      href="#"
      class="arrow"
      @click.prevent="scrollDown"
    >
      <img
        class="arrow-image"
        src="assets/arrow-down.svg"
      />
    </a>
    <div class="text">
      <p class="title">{{ nasaState.data.title }}</p>
      <p class="explanation">{{ nasaState.data.explanation }}</p>
      <p
      v-if="nasaState.data.copyright"
        class="copyright"
        id="scroll"
      >@Copyright {{ nasaState.data.copyright }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, computed } from 'vue'
import { useNasa } from '../hooks/useNasa.js'
import Loading from './Loading.vue'

export default {
  name: 'Nasa',
  components: {
    Loading
  },

  setup () {
    const nasaState = useNasa()

    const isVideo = computed(() => {
      return nasaState.data.media_type === 'video'
    })

    const videoURLToDisplay = computed(() => {
      if (isVideo.value) {
        const searchParams = new URLSearchParams()
        searchParams.append('mute', '1')
        searchParams.append('autoplay', '1')
        return nasaState.data.url + '&' + searchParams.toString()
      }

      return null
    })

    watch(nasaState, () => {
      window.document.title = nasaState.data ? nasaState.data.title : 'Nasa Daily Image'
    })

    onMounted(async () => {
      console.log(nasaState)
    })

    return {
      videoURLToDisplay,
      isVideo,
      nasaState,
      scrollDown
    }
  }
}

function scrollDown () {
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<style scoped lang="scss">
.nasa-container {
  width: 100vw;

  .nasa-video {
    height: 100vh;
    margin: 0;
    padding: 0;

    iframe {
      border-width: 0px;
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;
    }
  }

  .download-image {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    animation: shake 20s infinite;

    :hover {
      animation: shake 20s linear;
    }

    img {
      position: relative;
      width: 3rem;
      height: auto;
    }
  }

  .nasa-image {
    position: relative;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  .arrow {
    color: white;
    text-decoration: none;
    position: absolute;
    bottom: 15px;
    right: 0;
    left: 0;
    animation: MoveUpDown 5s ease-in infinite;

    img {
      width: 3rem;
      height: 3rem;
      color: white;
    }
  }

  @keyframes shake {
    0.5%,
    4.5% {
      transform: translate(-1px);
    }
    1%,
    4% {
      transform: translate(2px);
    }

    1.5%,
    2.5%,
    3.5% {
      transform: translate(-4px);
    }
    2%,
    3% {
      transform: translate(4px);
    }
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      bottom: 15px;
    }
    50% {
      bottom: 30px;
    }
  }

  .text {
    padding: 0 15px;

    p {
      margin: 1rem;
      justify-content: center;
    }

    .title {
      font-size: 1.3rem;
    }

    .explanation {
      text-align: left;
      font-size: 1.1rem;
    }

    .copyright {
      font-weight: bold;
    }
  }
}
</style>
