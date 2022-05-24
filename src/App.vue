<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        

        <v-btn
          v-for="link in links"
          :key="link.naslov"
          :to="link.putanja"
          text
        >
          {{ link.naslov }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2" align="center">
            <v-sheet rounded="lg">
              
              <v-list color="transparent">
                  <v-avatar color="#C4DBFA" size="60">
                    <span class="white--text text-h5">IS</span>
                  </v-avatar>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-btn
      depressed
      color="#C4DBFA"
      
          class="white--text"
    >
      BOUTIQUE
    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              style="padding: 20px;"
            >

            <router-view></router-view>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          naslov: 'Naslovnica',
          putanja: '/'
        },
        {
          naslov: 'Korisnici',
          putanja: '/korisnici'
        },
        {
          naslov: 'Kategorije',
          putanja: '/kategorije'
        },
        {
          naslov: 'Brandovi',
          putanja: '/brandovi'
        },
        {
          naslov: 'Proizvodi',
          putanja: '/proizvodi'
        },
        {
          naslov: 'Izvještaj',
          putanja: '/izvjestaj'
        },
        {
          naslov: 'Odjava',
          putanja: '/login'
        },
      ],
      menuItems: [
        '',
      ]
    }),
  }
</script>