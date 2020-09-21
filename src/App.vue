<template>
  <app-navigator></app-navigator>
</template>

<script>
  import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
  } from "vue-native-router";
  import LoginScreen from "./screens/LoginScreen";
  import RegisterScreen from "./screens/RegisterScreen";
  import ProfileScreen from "./screens/ProfileScreen.vue";
  import EditProfileScreen from "./screens/EditProfileScreen.vue";
  import TestScreen from "./screens/TestScreen";
  import EventsScreen from "./screens/EventsScreen";

  const DrawerNavigator = createDrawerNavigator(
          {
            Login: LoginScreen,
            Register: RegisterScreen,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Events: EventsScreen,
            Test: TestScreen
          },
          {
            initialRouteName: 'Login'
          }
  );

  const StackNavigator = createStackNavigator(
          {
            Drawer: DrawerNavigator,
            Login: LoginScreen,
            Register: RegisterScreen,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Events: EventsScreen,
            Test: TestScreen
          }
  )

  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator },
  }
</script>