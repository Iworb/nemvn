<template>
    <v-app>
        <v-navigation-drawer
                clipped
                fixed
                :value="$store.state.drawer"
                app
        >
            <v-list dense>
                <v-list-tile router v-for="(item, i) in items" :key="i" :to="item.to">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click.stop="logoutDialog = true">
                    <v-list-tile-action>
                        <v-icon>all_out</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sign Out</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left color="primary" dark>
            <v-toolbar-side-icon @click.prevent="$store.commit('TOGGLE_DRAWER')"/>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <nuxt />
            </v-container>
        </v-content>
        <v-dialog
                v-model="logoutDialog"
                max-width="500px"
        >
            <v-card tile>
                <v-toolbar card dark color="error">
                    <v-toolbar-title>Sign Out</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    Do you really want to logout?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.stop="logoutDialog = false">No</v-btn>
                    <v-btn color="error" @click.stop="logout">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
  import {resetFormErrors, catchFormErrors} from '../mixins'

  export default {
    data() {
      return {
        logoutDialog: false,
        items: [
          { icon: "home", title: "Home", to: "/" },
          { icon: "face", title: "Demo", to: "/demo" },
          { icon: "view_list", title: "Posts", to: "/posts" }
        ]
      };
    },
    methods: {
      async logout () {
        try {
          await this.$store.dispatch('auth/logout')
        } catch (e) {
          console.log(e.message)
        }
      }
    }
  };
</script>