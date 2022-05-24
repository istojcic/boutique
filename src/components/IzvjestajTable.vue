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
                Izvještaj
            </v-tab>
        </v-tabs>
    <v-data-table
      :headers="headers"
      :items="izvjestaj"
      sort-by="date"
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
                Novi izvještaj
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
                    
                      <v-menu
    v-model="showPicker"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
>
    <template v-slot:activator="{ on }">
        <v-text-field
            v-model="editedItem.date"
            label="Odaberi datum"
            persistent-hint
            readonly
            v-on="on"
        ></v-text-field>
    </template>
    <v-date-picker
        v-model="editedItem.date"
        no-title
        @input="showPicker = false"
    ></v-date-picker>
</v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.sifra"
                        label="Šifra proizvoda"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
            v-model="editedItem.donos"
            label="Donos"
            outlined
          ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-text-field
            v-model="editedItem.prodano"
            label="Prodano"
            outlined
          ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    
                      
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      
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
              <v-card-title class="text-h5">Želite li izbrisati izvještaj?</v-card-title>
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
  name: 'IzvjestajTable',
  data: () => ({
    showPicker: false,
    date: null,
    headers: [
      {
        text: 'Datum',
        align: 'start',
        value: 'date',
      },
      { text: 'Šifra proizvoda', value: 'sifra' },
      { text: 'Stanje', value: 'stanje' },
      { text: 'Donos', value: 'donos' },
      { text: 'Prodano', value: 'prodano' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    izvjestaj: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      sifra: '',
      stanje: '',
      donos: '',
      prodano: '',
    },
    defaultItem: {
      date: '',
      sifra: '',
      stanje: '',
      donos: '',
      prodano: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novi izvještaj' : 'Uredi izvještaj'
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
      this.izvjestaj = [
        {
          date: '24.4.2018 ',
          sifra: '123',
          stanje: '320',
          donos: '10',
          prodano: '35',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.izvjestaj.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.izvjestaj.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.izvjestaj.splice(this.editedIndex, 1)
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
        Object.assign(this.izvjestaj[this.editedIndex], this.editedItem)
      } else {
        this.izvjestaj.push(this.editedItem)
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