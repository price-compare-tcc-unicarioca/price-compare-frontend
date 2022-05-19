<template>
  <div class="scanner">
    <video poster="data:image/gif,AAAA" ref="scanner"></video>
  </div>
</template>

<script>
import { BrowserCodeReader, BrowserMultiFormatReader } from '@zxing/browser'
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue-demi'

export default {
  props: {
    deviceId: String
  },
  setup (props, { emit }) {
    const scanner = ref('')
    const decodeControl = ref(null)
    const reader = new BrowserMultiFormatReader()

    const start = (deviceId) => {
      reader.decodeFromVideoDevice(
        deviceId,
        scanner.value,
        (result, err, control) => {
          if (result) emit('decoded', result.text)
          decodeControl.value = control
        }
      )
    }

    onMounted(() => {
      BrowserCodeReader.listVideoInputDevices().then((devices) => {
        emit('devices-found', devices)
      })

      scanner.value.oncanplay = (event) => {
        emit('loaded')
      }

      start(props.deviceId)
    })

    onBeforeUpdate(() => {
      decodeControl.value?.stop()
      start(props.deviceId)
    })

    onBeforeUnmount(() => {
      decodeControl.value?.stop()
    })

    return {
      scanner
    }
  }
}
</script>

<style lang="scss" scoped>
video {
    max-width: 100%;
    max-height: 100%;
}
</style>
