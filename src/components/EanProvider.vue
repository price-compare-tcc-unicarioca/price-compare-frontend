<template>
  <div class="container">
    <h2>Price Compare</h2>
    <in-cart-input label="EAN" v-model="ean" />
    <div class="row mt-2">
      <div class="col-sm-4 d-grid" v-if="canUseCamera">
        <button class="btn btn-outline-secondary btn-lg" type="button" @click="toggleCamera">
          <font-awesome-icon icon="barcode" /> Scan Barcode
        </button>
      </div>
      <div :class="['d-grid', {'col-sm-8': canUseCamera, 'col': !canUseCamera}]">
        <button class="btn btn-outline-primary btn-lg" type="button" @click="$emit('search-request', ean)">
          <font-awesome-icon icon="magnifying-glass" /> Search Sale
        </button>
      </div>
    </div>
    <div class="camera-box mt-4" v-if="showCamera">
      <StreamBarcodeReader @decode="onDecode" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { StreamBarcodeReader } from 'vue-barcode-reader'

import InCartInput from '@/components/InCartInput.vue'

export default {
  components: {
    StreamBarcodeReader,
    InCartInput
  },
  setup (props) {
    const ean = ref(null)
    const canUseCamera = ref(navigator && navigator.mediaDevices && 'enumerateDevices' in navigator.mediaDevices)
    const showCamera = ref(false)

    const toggleCamera = () => {
      showCamera.value = !showCamera.value
    }

    const onDecode = (decodedEan) => {
      ean.value = decodedEan
    }

    return {
      ean,
      canUseCamera,
      toggleCamera,
      showCamera,
      onDecode
    }
  }
}
</script>

<style lang="scss" scoped>
.camera-box {
  max-width: 640px;
}
</style>
