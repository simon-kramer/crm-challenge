// Type Model to stricly type the customer data

export interface Customer {
  id: string // Universally Unique Identifier from Mock API
  first_name: string
  last_name: string
  email: string
  status: boolean
}
