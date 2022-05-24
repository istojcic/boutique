<template>
  <v-app id="inspire">
    <v-tabs class="tabs"
            v-model="tab"
            background-color="primary"
            centered
            dark
            icons-and-text
        >
            <v-tab>
                Zadnje dodani proizvodi
            </v-tab>
        </v-tabs>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pretraži"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="proizvodi"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      search: '',
      headers: [
        {
          text: 'Opis proizvoda',
          align: 'start',
          value: 'opis',
        },
        { text: 'Šifra', value: 'sifra' },
        { text: 'Kategorija', value: 'kategorija' },
        { text: 'Brand', value: 'brand' },
        { text: 'Cijena', value: 'cijena' },
        { text: 'Stanje', value: 'stanje' },
      ],
      proizvodi: [
        {
          opis: '',
          sifra: '',
          kategorija: '',
          brand: '',
          cijena: '',
          stanje: '',
        },
      ],
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>

<style scoped>
.tabs {
  flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>