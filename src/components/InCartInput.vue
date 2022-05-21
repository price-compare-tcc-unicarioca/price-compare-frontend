<template>
  <div class="form-floating">
    <input
      :type="type"
      :placeholder="label"
      :class="['form-control', {'is-invalid': validation?.$invalid && validation?.$dirty}]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="validation?.$touch"
      :readonly="readonly"
      :disabled="disabled">
    <label>{{ label }}</label>
    <div v-for="error of validation?.$errors" :key="error.$uid" class="invalid-feedback">
      {{ error.$message }}
    </div>
  </div>
</template>
<script>
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
    readonly: Boolean,
    disabled: Boolean,
    modelValue: String,
    validation: Object
  }
}
</script>
