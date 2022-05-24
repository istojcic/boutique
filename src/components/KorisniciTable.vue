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
                Korisnici
            </v-tab>
        </v-tabs>
    <v-data-table
      :headers="headers"
      :items="korisnici"
      sort-by="name"
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
                Novi korisnik
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
                        v-model="editedItem.name"
                        label="Ime korisnika"
                      ></v-text-field>
                    </v-col>
<v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail korisnika"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.pass"
                        label="Lozinka korisnika"
                      ></v-text-field>
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
              <v-card-title class="text-h5">Želite li izbrisati korisnika?</v-card-title>
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
  name: 'KorisniciTable',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Ime korisnika',
        align: 'start',
        value: 'name',
      },
      { text: 'E-mail', value: 'email' },
      { text: 'Lozinka', value: 'pass' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    korisnici: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      pass: '',
    },
    defaultItem: {
      name: '',
      email: '',
      pass: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novi korisnik' : 'Uredi korisnika'
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
      this.korisnici = [
        {
          name: 'Iva',
          email: 'iva@gmail.com',
          pass: '123',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.korisnici.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.korisnici.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.korisnici.splice(this.editedIndex, 1)
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
        Object.assign(this.korisnici[this.editedIndex], this.editedItem)
      } else {
        this.korisnici.push(this.editedItem)
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