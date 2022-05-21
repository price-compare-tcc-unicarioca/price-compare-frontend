<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link :to="{name: 'list-companies'}" role="button">
            Supermarkets
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Import Sheet</li>
      </ol>
    </nav>
    <form @submit="onSubmit">
      <fieldset class="mb-lg-3">
        <label for="sheet-file" class="form-label">Sheet file</label>
        <input id="sheet-file" type="file" class="form-control" @change="onFileSelected" />
      </fieldset>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mt-md-0">
        <a href="./downloadable/SaleImport.xlsx" class="btn btn-secondary">
          <font-awesome-icon icon="download" />
          Download Model
        </a>
        <button type="submit" class="btn btn-primary">
          <font-awesome-icon icon="upload" />
          Upload Sales
        </button>
      </div>
    </form>
    <div v-if="importedSales.length > 0">
      <h3>Imported items</h3>
      <table class="table table-striped align-middle">
        <thead>
          <tr class="text-center">
            <th>EAN</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr class="text-center" v-for="(sale) in importedSales" :key="sale.ean">
            <td>{{sale.ean}}</td>
            <td>{{sale.name}}</td>
            <td>{{sale.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import client from '@/clients/backend-api'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const file = ref(null)
    const importedSales = ref([])
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const onFileSelected = (e) => {
      file.value = null
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        const { name, type } = e.target.files[0]

        file.value = {
          name,
          contentType: type,
          base64: reader.result.substr(reader.result.indexOf(',') + 1)
        }
      }
      reader.onerror = (error) => {
        console.error(`Failed to convert file to base64: ${error}`)
      }
    }

    const onSubmit = (e) => {
      e.preventDefault()
      if (file.value) {
        const { name, contentType, base64 } = file.value

        client.importSheet({
          name,
          contentType,
          base64
        }).then((sales) => {
          importedSales.value = sales.map((sale) => {
            return {
              ean: sale.product.ean,
              name: sale.product.name,
              price: formatter.format(sale.price)
            }
          })

          store.commit('toast/addToast', {
            title: 'Sheet imported',
            payload: `Imported all items present in the sheet '${name}' with success`
          })
        }).catch((error) => {
          store.commit('toast/addToast', {
            title: 'Error when trying to create supermarket',
            payload: error.message
          })
        })
      }
    }

    return {
      file,
      importedSales,
      onFileSelected,
      onSubmit
    }
  }
}
</script>
