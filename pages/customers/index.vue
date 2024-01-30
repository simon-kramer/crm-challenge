<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid' // needs to get typed
import type { Customer } from '@/models/customers'
const customerStore = useCustomerStore()

// Reactive state for selected customers and the current customer being edited or added
const selected = ref<Customer[]>([])
const currentRow = ref<Customer | null>(null)
const isModalOpen = ref(false)

// Computed properties for customers
const customers = computed(() => customerStore.customers)
const customersLoading = computed(() => customerStore.customersLoading)

// Computed property for pagination of customers
const page = ref(1)
const pageCount = 10
const totalCustomers = computed(() => customers.value.length)
const customersPaginated = computed(() => {
  const startIndex = (page.value - 1) * pageCount
  const endIndex = startIndex + pageCount
  return customers.value.slice(startIndex, endIndex)
})

// Column definitions for the customer table
const columns = [
  { key: 'first_name', label: 'First Name', sortable: true },
  { key: 'last_name', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
]

// Computed property for selected count text
const selectedCountText = computed(() => {
  const total = customersPaginated.value.length
  const selectedCount = selected.value.length
  return selectedCount === 0
    ? ''
    : selectedCount === total
      ? 'All Selected'
      : `${selectedCount} selected`
})

// Function to handle editing a customer
const handleEditModal = (row: Customer) => {
  currentRow.value = row
  isModalOpen.value = true
}

// Determine the modal headline based on the currentRow context
const modalHeadline = computed(() => {
  return currentRow.value?.id ? 'Edit Customer' : 'Add New Customer'
})

// Function to open the modal for either editing an existing customer or adding a new one
const openModal = (customer: Customer | null = null) => {
  currentRow.value = customer ?? {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    status: true
  }
  isModalOpen.value = true
}

// Function to handle saving changes or adding a new customer
const saveChanges = () => {
  if (currentRow.value) {
    if (!currentRow.value.id) {
      currentRow.value.id = uuidv4()
      customerStore.addCustomer(currentRow.value)
    } else {
      customerStore.updateCustomer(currentRow.value.id, currentRow.value)
    }
    isModalOpen.value = false
  }
}

// Function to set the status of selected customers
const setCustomersStatus = (newStatus: boolean) => {
  const selectedIds = selected.value.map((customer) => customer.id)
  customerStore.updateCustomersStatus(selectedIds, newStatus)
}

// Fetch customers on component mount
onMounted(() => {
  customerStore.fetchCustomers()
})
</script>

<template>
  <div class="flex-wrap space-y-12">
    <!-- Alert/InfoBanner -->
    <UAlert
      icon="i-heroicons-light-bulb"
      color="primary"
      variant="subtle"
      title="Good to know!"
      description="If you're clicking on a row inside the table, it will open the edit modal to customize the details of the customer selected."
    />

    <!-- Customer Datatable -->
    <div class="flex justify-between -mb-4 items-center">
      <div class="text-sm">Customers Overall: {{ totalCustomers }}</div>
      <UButton variant="solid" color="primary" @click="() => openModal()"
        >Add New Customer</UButton
      >
    </div>
    <UCard>
      <UTable
        v-model="selected"
        :rows="customersPaginated"
        :columns="columns"
        :loading="customersLoading"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No customers found.'
        }"
        @select="handleEditModal"
      >
        <template #name-data="{ row }">
          <span
            :class="[
              selected.find((person: any) => person.id === row.id) &&
                'text-primary-500 dark:text-primary-400'
            ]"
            >{{ row.name }}</span
          >
        </template>
        <template #status-data="{ row }">
          <UBadge :color="row.status ? 'primary' : 'red'" variant="subtle">{{
            row.status ? 'Active' : 'Locked'
          }}</UBadge>
        </template>
      </UTable>
      <div
        v-if="selectedCountText"
        class="flex justify-between border-t pt-6 border-gray-200 dark:border-gray-700"
      >
        <div class="flex gap-x-6">
          <UBadge color="primary" variant="subtle">{{
            selectedCountText
          }}</UBadge>
          <div class="flex gap-x-2">
            <UButton
              variant="soft"
              color="primary"
              size="xs"
              @click="() => setCustomersStatus(true)"
              >Set selected to Active</UButton
            >
            <UButton
              variant="soft"
              color="red"
              size="xs"
              @click="() => setCustomersStatus(false)"
              >Set selected to Locked</UButton
            >
          </div>
        </div>
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="totalCustomers"
        />
      </div>
      <div
        v-else
        class="flex justify-end border-t pt-6 border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="totalCustomers"
        />
      </div>
    </UCard>

    <!-- Edit Modal -->
    <UModal v-model="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="font-medium text-md">{{ modalHeadline }}</h2>
            <UButton
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isModalOpen = false"
            />
          </div>
        </template>

        <div v-if="currentRow" class="space-y-6">
          <div class="flex justify-between">
            <div>
              <label for="first_name" class="text-sm font-medium"
                >First Name</label
              >
              <UInput
                v-model="currentRow.first_name"
                label="First Name"
                :disabled="!currentRow.status"
              />
            </div>
            <div>
              <label for="last_name" class="text-sm font-medium"
                >Last Name</label
              >
              <UInput
                v-model="currentRow.last_name"
                label="Last Name"
                :disabled="!currentRow.status"
              />
            </div>
          </div>
          <div>
            <label for="email" class="text-sm font-medium"
              >E-Mail Address</label
            >
            <UInput
              v-model="currentRow.email"
              label="Email"
              :disabled="!currentRow.status"
            />
          </div>
          <div class="flex justify-between items-center">
            <div>
              <label for="status" class="text-sm font-medium">Status</label>
              <p class="text-xs font-light">(active or locked)</p>
            </div>
            <div class="flex items-center gap-x-4">
              <UBadge
                :color="currentRow.status ? 'primary' : 'red'"
                variant="subtle"
                >{{ currentRow.status ? 'Active' : 'Locked' }}</UBadge
              >
              <UToggle v-model="currentRow.status" label="Status" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton variant="solid" color="primary" @click="saveChanges"
              >Save</UButton
            >
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
