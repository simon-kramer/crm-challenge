<script lang="ts" setup>
const showAlert = ref(true)
</script>

<template>
  <UContainer>
    <div class="flex-wrap w-full space-y-12">
      <UAlert
        v-if="showAlert"
        icon="i-heroicons-cake"
        title="Welcome to this test CRM Dashboard!"
        description="Here you can change, edit, delete or manipulate data as you need. Please make
         sure to manage all customers correctly and keep your data up to date. 
         If there is any issue with the data, please contact us with a 
          description of the problem."
        color="primary"
        variant="solid"
        :close-button="{
          icon: 'i-heroicons-x-mark-20-solid',
          color: 'white',
          variant: 'link',
          padded: false
        }"
        @close="showAlert = false"
      />
      <UCard>
        <template #header>
          <h2 class="text-lg">Coding in a Nutshell</h2>
        </template>
        <div class="flex flex-col items-center justify-center">
          <img src="/coding.jpg" alt="Coding Humor" class="max-w-full h-auto" />
          <span class="text-xs"
            >Source:
            <NuxtLink
              to="https://workchronicles.com"
              external
              target="_blank"
              class="hover:text-primary"
              >workchronicles.com</NuxtLink
            ></span
          >
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
