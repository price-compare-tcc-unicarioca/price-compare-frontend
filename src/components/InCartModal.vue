<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button type="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot v-if="modelValue"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue-demi'
import { Modal } from 'bootstrap'

export default {
  props: {
    id: String,
    modelValue: Boolean
  },
  setup (props, { emit }) {
    const modal = ref(null)

    onMounted(() => {
      const bsModal = new Modal(modal.value, {
        keyboard: false
      })

      watch(() => props.modelValue, (value) => {
        value
          ? bsModal.show()
          : bsModal.hide()
      })

      modal.value.addEventListener('hidden.bs.modal', () => {
        emit('update:modelValue', false)
      })
    })

    return {
      modal
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
