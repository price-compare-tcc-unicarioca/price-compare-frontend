<template>
  <div class="alert alert-warning alert-dismissible fade show m-0" role="alert" v-if="prompt">
    Get our free app. It won't take up space on your phone.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    <hr>
    <div class="text-end">
      <div class="btn-group" role="group">
        <button class="btn btn-outline-danger" type="button" @click="onDismiss">
          Dismiss
        </button>
        <button class="btn btn-danger" type="button" @click="onInstall">
          Install
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
export default {
  setup () {
    const prompt = ref(null)
    window.addEventListener('beforeinstallprompt', e => {
      prompt.value = e
      e.preventDefault()
    })

    window.addEventListener('appinstalled', () => {
      prompt.value = null
    })

    const onDismiss = () => {
      prompt.value = null
    }

    const onInstall = () => {
      prompt.value.prompt()
    }

    return {
      prompt,
      onDismiss,
      onInstall
    }
  }
}
</script>
