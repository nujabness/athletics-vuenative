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
  import TestScreen from "./screens/TestScreen";
  import LoginScreen from "./screens/LoginScreen";
  import RegisterScreen from "./screens/RegisterScreen";

  const DrawerNavigator = createDrawerNavigator(
          {
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Login: LoginScreen,
            Register: RegisterScreen,
            Test: TestScreen
          },
          {
            initialRouteName: 'Login'
          }
  );

  const StackNavigator = createStackNavigator(
          {
            Drawer: DrawerNavigator,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Login: LoginScreen,
            Register: RegisterScreen,
            Test: TestScreen
          }
  )

  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator },
  }
</script>