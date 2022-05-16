<template>
  <div class="form-floating">
    <input
      :type="type"
      :placeholder="label"
      :class="['form-control', {'is-invalid': validation?.$invalid && validation?.$dirty}]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="validation?.$touch">
    <label>{{ label }}</label>
    <div v-for="error of validation?.$errors" :key="error.$uid" class="invalid-feedback">
      {{ error.$message }}
    </div>
  </div>
</template>
<script>
import { computed } from 'vue-demi'
export default {
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default () {
        return 'text'
      }
    },
    modelValue: String,
    validation: {
      type: Object
    }
  },
  setup (props) {
    const isValid = computed(() => {
      const initial = false

      return props.validations.reduce(
        (previous, current) => previous && current.isValid(),
        initial
      )
    })

    return {
      isValid
    }
  }
}
</script>
