<template>
  <div id="app">
  <v-app id="inspire">
    <v-tabs class="tabs"
            v-model="tab"
            background-color="primary"
            centered
            dark
            icons-and-text
        >
            <v-tab>
                Proizvodi
            </v-tab>
        </v-tabs>
    <v-data-table
      :headers="headers"
      :items="proizvodi"
      sort-by="sifra"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Novi proizvod
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.opis"
                        label="Opis proizvoda"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.sifra"
                        label="Šifra"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.kategorija"
                        label="Kategorija"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.brand"
                        label="Brand"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cijena"
                        suffix="KM"
                        label="Cijena"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.stanje"
                        label="Stanje"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Odustani
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Spremi
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Želite li izbrisati proizvod?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Odustani</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'ProizvodiTable',
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    proizvodi: [],
    textFields: [],
    editedIndex: -1,
    editedItem: {
      opis: '',
      sifra: '',
      kategorija: '',
      brand: '',
      cijena: '',
      stanje: '',
    },
    defaultItem: {
      opis: '',
      sifra: '',
      kategorija: '',
      brand: '',
      cijena: '',
      stanje: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novi proizvod' : 'Uredi proizvod'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    
    initialize () {
      this.proizvodi = [
        {
            opis: 'Žuta majica',
            sifra: '123',
            kategorija: 'majica',
            brand: 'Zara',
            cijena: '23.30',
            stanje: '320',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.proizvodi.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.proizvodi.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.proizvodi.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.proizvodi[this.editedIndex], this.editedItem)
      } else {
        this.proizvodi.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>
.tabs {
  flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>