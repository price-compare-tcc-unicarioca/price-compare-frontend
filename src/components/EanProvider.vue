<template>
  <div class="container">
    <h2>Price Compare</h2>
    <in-cart-input label="EAN" v-model="ean" />
    <div class="row">
      <div class="col-sm-4 d-grid mt-2" v-if="canUseCamera">
        <button class="btn btn-outline-secondary btn-lg" type="button" @click="toggleCamera">
          <font-awesome-icon icon="barcode" /> Scan Barcode
        </button>
      </div>
      <div :class="['d-grid', 'mt-2', {'col-sm-8': canUseCamera, 'col': !canUseCamera}]">
        <button class="btn btn-outline-primary btn-lg" type="button" @click="$emit('search-requested', ean)">
          <font-awesome-icon icon="magnifying-glass" /> Search Sale
        </button>
      </div>
    </div>
    <in-cart-modal id="barcode-scanner-modal" v-model="showCamera">
      <template #title>
        <font-awesome-icon icon="barcode" /> Barcode Scanner
      </template>
      <template #default>
        <StreamBarcodeReader @decode="onDecode" />
      </template>
    </in-cart-modal>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { StreamBarcodeReader } from 'vue-barcode-reader'

import InCartInput from '@/components/InCartInput.vue'
import InCartModal from '@/components/InCartModal.vue'

export default {
  components: {
    StreamBarcodeReader,
    InCartInput,
    InCartModal
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
      showCamera.value = false
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
