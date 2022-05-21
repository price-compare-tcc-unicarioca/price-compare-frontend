<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
        <li class="breadcrumb-item active" aria-current="page">Price Compare</li>
      </ol>
    </nav>
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
    <table class="table table-striped mt-3" v-if="nearSales">
      <thead>
        <tr class="text-center">
          <th scope="col">Product</th>
          <th scope="col">EAN</th>
          <th scope="col">Supermarket</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr class="text-center" v-for="({ company, price }) in nearSales?.sales" :key="company.id">
          <td >{{ nearSales.product?.name }}</td>
          <td >{{ nearSales.product?.ean }}</td>
          <td >
            <a @click="showCompanyDetail(company)" class="table-link">
              {{ company.name }}
            </a>
          </td>
          <td >{{ price }}</td>
        </tr>
      </tbody>
    </table>
    <in-cart-modal id="barcode-scanner-modal" ref="barcodeScannerModal">
      <template #title>
        <font-awesome-icon icon="barcode" /> Barcode Scanner
      </template>
      <template #default>
        <ean-reader-container @ean-decoded="onEanFound" />
      </template>
    </in-cart-modal>
    <in-cart-modal id="company-detail-modal" class="modal-lg" ref="companyDetailModal">
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
import client from '@/clients/backend-api'
import { onBeforeUnmount, ref } from 'vue-demi'
import { GoogleMap, Marker } from 'vue3-google-map'

import InCartInput from '@/components/InCartInput.vue'
import InCartModal from '@/components/InCartModal.vue'
import EanReaderContainer from '@/components/EanReaderContainer.vue'

export default {
  components: {
    GoogleMap,
    Marker,
    EanReaderContainer,
    InCartInput,
    InCartModal
  },
  setup () {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const ean = ref(null)
    const canUseCamera = ref(navigator && navigator.mediaDevices)
    const barcodeScannerModal = ref(null)
    const currentPosition = ref(null)
    const nearSales = ref(null)

    const toggleCamera = () => {
      barcodeScannerModal?.value?.toggle()
    }

    const onEanFound = (decodedEan) => {
      ean.value = decodedEan
      barcodeScannerModal?.value?.toggle()
      onSearchRequest()
    }

    const selectedCompany = ref(null)
    const companyDetailModal = ref(null)
    const showCompanyDetail = (company) => {
      selectedCompany.value = company
      companyDetailModal.value?.toggle()
    }

    const onSearchRequest = async () => {
      const { longitude, latitude } = currentPosition.value?.coords

      const nearSalesFound = await client.searchSales({
        ean: ean.value,
        longitude,
        latitude
      })

      const { product, sales } = nearSalesFound
      nearSales.value = {
        product,
        sales: sales?.map((sale) => {
          const { company, price } = sale

          return {
            company: {
              ...company,
              maps: {
                position: {
                  lat: company.point.y,
                  lng: company.point.x
                },
                title: company.name,
                animation: 2,
                optimized: true
              }
            },
            price: formatter.format(price)
          }
        })
      }
    }

    const positionWatcher = navigator.geolocation.watchPosition((position) => {
      currentPosition.value = position
    })

    onBeforeUnmount(() => {
      navigator.geolocation.clearWatch(positionWatcher)
    })

    return {
      ean,
      nearSales,
      canUseCamera,
      selectedCompany,
      toggleCamera,
      barcodeScannerModal,
      onEanFound,
      onSearchRequest,
      showCompanyDetail,
      companyDetailModal
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
