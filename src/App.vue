<template>
  <app-navigator></app-navigator>
</template>

<script>
  import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
  } from "vue-native-router";
  import ProfileScreen from "./screens/ProfileScreen.vue";
  import EditProfileScreen from "./screens/EditProfileScreen.vue";

  const DrawerNavigator = createDrawerNavigator(
          {
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen
          },
          {
            initialRouteName: 'Profile'
          }
  );

  const StackNavigator = createStackNavigator(
          {
            Drawer: DrawerNavigator,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen
          }
  )

  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator },
  }
</script>

