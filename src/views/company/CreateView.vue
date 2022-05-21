<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link :to="{name: 'list-companies'}" role="button">
            Supermarkets
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">New</li>
      </ol>
    </nav>
    <form class="vertical-middle" @submit="onSubmit">
      <fieldset class="mb-3">
        <legend>Basic data</legend>
        <div class="row">
          <div class="col-sm-6">
            <in-cart-input
              id="name"
              type="text"
              label="Name"
              v-model="form.name"
              :validation="v$.name" />
          </div>
          <div class="col-sm-6">
            <in-cart-input
              id="document"
              type="text"
              label="Document"
              v-model="form.document"
              :validation="v$.document" />
          </div>
        </div>
      </fieldset>
      <fieldset class="mb-3">
        <legend>Address</legend>
        <div class="row mb-lg-3">
          <div class="col-lg-3">
            <in-cart-input
              id="postal-code"
              type="text"
              label="Postal code"
              v-model="form.address.postalCode"
              :validation="v$.address.postalCode" />
          </div>
          <div class="col-lg-9">
            <in-cart-input
              id="street-address"
              type="text"
              label="Street address"
              v-model="form.address.streetAddress"
              :validation="v$.address.streetAddress" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <in-cart-input
              id="city"
              type="text"
              label="City"
              v-model="form.address.city"
              :validation="v$.address.city" />
          </div>
          <div class="col-sm-6">
            <in-cart-input
              id="state"
              type="text"
              label="State"
              v-model="form.address.state"
              :validation="v$.address.state" />
          </div>
        </div>
      </fieldset>
      <fieldset class="mb-3">
        <legend>Map location</legend>
        <div class="row">
          <div class="col-sm-6">
            <in-cart-input
              id="longitude"
              type="text"
              label="Logitude"
              v-model="form.point.longitude"
              :validation="v$.point.longitude" />
          </div>
          <div class="col-sm-6">
            <in-cart-input
              id="latitude"
              type="text"
              label="Latitude"
              v-model="form.point.latitude"
              :validation="v$.point.latitude" />
          </div>
        </div>
      </fieldset>
      <div class="text-end">
        <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">
          <font-awesome-icon icon="check" />
          Create Supermarket
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue-demi'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import client from '@/clients/backend-api'
import InCartInput from '@/components/InCartInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  components: {
    InCartInput
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const form = reactive({
      name: ref(null),
      document: ref(null),
      address: reactive({
        streetAddress: ref(null),
        postalCode: ref(null),
        city: ref(null),
        state: ref(null)
      }),
      point: reactive({
        longitude: ref(null),
        latitude: ref(null)
      })
    })

    watch(() => form.address.postalCode, (postalCode) => {
      if (postalCode.length === 9) {
        axios.get(`https://viacep.com.br/ws/${postalCode.replace('-', '')}/json/`).then(({ data }) => {
          const { logradouro, bairro, localidade, uf } = data
          form.address.streetAddress = `${logradouro} - ${bairro}`
          form.address.city = localidade
          form.address.state = uf
        })
      }
    })

    const validationRules = computed(() => ({
      name: {
        required
      },
      document: {
        required
      },
      address: {
        streetAddress: {
          required
        },
        postalCode: {
          required
        },
        city: {
          required
        },
        state: {
          required
        }
      },
      point: {
        longitude: {
          required
        },
        latitude: {
          required
        }
      }
    }))

    const onSubmit = (e) => {
      e.preventDefault()
      const data = Object.assign({}, form)

      client.createCompany(data).then(() => {
        store.commit('toast/addToast', {
          title: 'Supermarket created',
          payload: `Supermarket ${data.name} successfully created`
        })

        router.push({
          name: 'list-companies'
        })
      }).catch((error) => {
        store.commit('toast/addToast', {
          title: 'Error when trying to create supermarket',
          payload: error.message
        })
      })
    }

    return {
      v$: useVuelidate(validationRules, form),
      form,
      onSubmit
    }
  }
}
</script>
