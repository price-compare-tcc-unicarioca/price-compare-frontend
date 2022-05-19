<template>
  <div class="container">
    <h2>Price compare</h2>
    <in-cart-input label="EAN" v-model="ean" />
    <div class="row">
      <div class="col-sm-4 d-grid mt-2" v-if="canUseCamera">
        <button class="btn btn-outline-secondary btn-lg" type="button" @click="toggleCamera">
          <font-awesome-icon icon="barcode" /> Scan Barcode
        </button>
      </div>
      <div :class="['d-grid', 'mt-2', {'col-sm-8': canUseCamera, 'col': !canUseCamera}]">
        <button class="btn btn-outline-primary btn-lg" type="button" @click="onSearchRequest">
          <font-awesome-icon icon="magnifying-glass" /> Search Sale
        </button>
      </div>
    </div>
    <table class="table table-striped mt-3" v-if="salesNear">
      <thead>
        <tr class="text-center">
          <th scope="col">Product</th>
          <th scope="col">EAN</th>
          <th scope="col">Supermarket</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr class="text-center" v-for="({ company, price }) in salesNear?.sales" :key="company.id">
          <td >{{ salesNear.product?.name }}</td>
          <td >{{ salesNear.product?.ean }}</td>
          <td >
            <a @click="showCompanyDetail(company)" class="table-link">
              {{ company.name }}
            </a>
          </td>
          <td >{{ price }}</td>
        </tr>
      </tbody>
    </table>
    <in-cart-modal id="barcode-scanner-modal" v-model="showCamera">
      <template #title>
        <font-awesome-icon icon="barcode" /> Barcode Scanner
      </template>
      <template #default>
        <ean-reader-container @ean-decoded="onEanFound" />
      </template>
    </in-cart-modal>
    <in-cart-modal id="company-detail-modal" class="modal-lg" v-model="showCompanyModal">
      <template #title>
        <font-awesome-icon icon="map-location-dot" /> Supermarket Location
      </template>
      <template #default>
        <div class="row">
          <div class="col-xs-12 col-lg">
            <GoogleMap api-key="AIzaSyCDQ8NombGMIDcF3zKxN3UORClYrbpypuE" class="map" :center="selectedCompany?.maps.position" :zoom="14.9">
              <Marker :options="selectedCompany?.maps" />
            </GoogleMap>
          </div>
          <div class="col-xs-12 col-lg mt-2 mt-lg-0">
            <h3>{{ selectedCompany?.name }}</h3>
            <p>{{ selectedCompany?.address.streetAddress }}</p>
            <p>{{ selectedCompany?.address.complement }}</p>
            <p>{{ selectedCompany?.address.postalCode }}</p>
            <p class="m-0">{{ selectedCompany?.address.city }} - {{ selectedCompany?.address.state }}</p>
          </div>
        </div>
      </template>
    </in-cart-modal>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, ref } from 'vue-demi'
import { GoogleMap, Marker } from 'vue3-google-map'

import InCartInput from '@/components/InCartInput.vue'
import InCartModal from '@/components/InCartModal.vue'
import EanReaderContainer from '@/components/EanReaderContainer.vue'
import { useStore } from 'vuex'

export default {
  components: {
    GoogleMap,
    Marker,
    EanReaderContainer,
    InCartInput,
    InCartModal
  },
  setup () {
    const store = useStore()

    const ean = ref(null)
    const canUseCamera = ref(navigator && navigator.mediaDevices)
    const showCamera = ref(false)
    const currentPosition = ref(null)

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const toggleCamera = () => {
      showCamera.value = !showCamera.value
    }

    const onEanFound = (decodedEan) => {
      ean.value = decodedEan
      showCamera.value = false
      onSearchRequest()
    }

    const selectedCompany = ref(null)
    const showCompanyModal = ref(false)
    const showCompanyDetail = (company) => {
      selectedCompany.value = company
      showCompanyModal.value = true
    }

    const onSearchRequest = () => {
      const { longitude, latitude } = currentPosition.value?.coords

      store.dispatch('sale/searchNear', {
        ean: ean.value,
        longitude,
        latitude
      })
    }

    const positionWatcher = navigator.geolocation.watchPosition((position) => {
      console.log(position)
      currentPosition.value = position
    })

    onBeforeUnmount(() => {
      navigator.geolocation.clearWatch(positionWatcher)
    })

    return {
      ean,
      salesNear: computed(() => {
        if (!store.state.sale?.salesNear) {
          return null
        }

        const { product, sales } = store.state.sale.salesNear

        return {
          product,
          sales: sales?.map((sale) => {
            const { company, price } = sale
            if (company) {
              company.maps = {
                position: {
                  lat: company.point.y,
                  lng: company.point.x
                },
                title: company.name,
                animation: 2,
                optimized: true
              }
            }

            return {
              company,
              price: formatter.format(price)
            }
          })
        }
      }),
      canUseCamera,
      selectedCompany,
      toggleCamera,
      showCamera,
      onEanFound,
      onSearchRequest,
      showCompanyDetail,
      showCompanyModal
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 400px
}

.table-link {
  cursor: pointer;
  text-decoration: none;
}
</style>
