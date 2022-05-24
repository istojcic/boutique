<template>
    <div id="app">
  <v-app id="inspire">
    <v-card
      class="mx-auto"
      style="max-width: 500px;"
    >
      
      <v-toolbar
        color="primary"
        cards
        dark
        flat
      >
        
        <v-card-title class="text-h6 font-weight-regular">
          Prijava
        </v-card-title>
        <v-spacer></v-spacer>
        
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="form"
        class="pa-4 pt-6"
        
      >
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="E-mail adresa"
          type="email"
        ></v-text-field>
        
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="deep-purple"
          counter="6"
          label="Lozinka"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
        
         
        
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        
        <v-btn
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="primary"
          depressed
          block
        >
          PRIJAVA
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        absolute
        max-width="400"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-3">
            Legal
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              text
              @click="agreement = false, dialog = false"
            >
              No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="deep-purple accent-4"
              @click="agreement = true, dialog = false"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
    name: 'VelicineTable',
    data: () => ({
    dialog: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || 'Unesite valjani e-mail',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Lozinka mora sadržavati veliko slovo, broj, i specijalni znak',
      required: v => !!v || 'Ovo polje je obavezno',
    },
  }),
}
</script>

<style scoped>
.v-text-field{
      width: 350px;
}
</style>