<template>
  <div class="ean-reader-container">
    <ean-reader :deviceId="selectedDevice" @devices-found="onDevicesFound" @decoded="onDecoded" />
    <div class="form-floating" v-if="devices.length > 1">
      <select id="device-selector" class="form-select mt-3" v-model="selectedDevice">
        <option value="">Default</option>
        <option v-for="({ deviceId, label }) in devices" :key="deviceId" :value="deviceId">
          {{ label }}
        </option>
      </select>
      <label for="device-selector">Camera</label>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import EanReader from '@/components/EanReader.vue'

export default {
  components: {
    EanReader
  },
  setup (props, { emit }) {
    const devices = ref([])
    const selectedDevice = ref('')
    const onDevicesFound = (devicesFound) => {
      devices.value = devicesFound
    }
    const onDecoded = (ean) => {
      emit('ean-decoded', ean)
    }

    return {
      devices,
      selectedDevice,
      onDevicesFound,
      onDecoded
    }
  }
}
</script>
