<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Supermarkets</li>
      </ol>
    </nav>
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead>
          <tr class="text-center">
            <th scope="col">Name</th>
            <th scope="col">CNPJ</th>
            <th scope="col">Address</th>
            <th scope="col">Coords</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(company, idx) in companies" :key="company.id" class="text-center">
            <td>{{ company.name }}</td>
            <td>{{ company.document }}</td>
            <td>
              <p class="m-0">{{ company.address.streetAddress }} {{ company.address.complement }}</p>
              <p class="m-0">{{ company.address.city }}, {{ company.address.state }}</p>
              <p class="m-0">{{ company.address.postalCode }}</p>
            </td>
            <td>{{ company.point.x }}, {{ company.point.y }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" title="Delete" @click="onDelete(idx)">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-end">
      <router-link :to="{name: 'add-company'}" class="btn btn-primary" role="button">
        <font-awesome-icon icon="plus" />
        New
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue-demi'
import client from '@/clients/backend-api'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const companies = ref([])

    onMounted(() => {
      client.listCompany().then((companiesFound) => {
        companies.value = companiesFound
      })
    })

    const onDelete = async (idx) => {
      const { id, name } = companies.value[idx]

      await client.deleteCompany({ id })

      companies.value.splice(idx, 1)
      store.commit('toast/addToast', {
        title: 'Successfully removed',
        payload: `Supermarket ${name} successfully removed`
      }, {
        root: true
      })
    }

    return {
      companies,
      onDelete
    }
  }
}
</script>
