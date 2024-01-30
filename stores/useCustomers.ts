import { type Customer } from '@/models/customers'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [] as Customer[],
    customersLoading: false,
    error: null
  }),
  actions: {
    async fetchCustomers() {
      this.customersLoading = true
      this.error = null
      try {
        const response = await useAxios().get<Customer[]>('/customers')
        this.customers = response
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    },

    async addCustomer(newCustomerData: Customer) {
      this.customersLoading = true
      this.error = null
      try {
        const response = await useAxios().post('/customers', newCustomerData)
        this.customers.push(response)
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    },

    async updateCustomer(customerId: string, updates: Partial<Customer>) {
      this.customersLoading = true
      this.error = null
      try {
        await useAxios().patch(`/customers/${customerId}`, updates)
        const index = this.customers.findIndex((c) => c.id === customerId)
        if (index !== -1) {
          Object.assign(this.customers[index], updates)
        }
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    },

    async updateCustomersStatus(selectedIds: string[], newStatus: boolean) {
      this.customersLoading = true
      this.error = null
      try {
        const updatePromises = selectedIds.map((id) =>
          useAxios().patch(`/customers/${id}`, { status: newStatus })
        )
        await Promise.all(updatePromises)

        this.customers.forEach((customer) => {
          if (selectedIds.includes(customer.id)) {
            customer.status = newStatus
          }
        })
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    }
  }
})
