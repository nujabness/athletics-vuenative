<template>
  <app-navigator></app-navigator>
</template>

<script>
  import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
  } from "vue-native-router";
  import React from "react";
  import { Icon } from "native-base";
  import LoginScreen from "./screens/LoginScreen";
  import RegisterScreen from "./screens/RegisterScreen";
  import ProfileScreen from "./screens/ProfileScreen.vue";
  import EditProfileScreen from "./screens/EditProfileScreen.vue";
  import TestScreen from "./screens/TestScreen";
  import EventsScreen from "./screens/EventsScreen";
  import EditEventScreen from "./screens/EditEventScreen";
  import ParticipationScreen from "./screens/ParticipationScreen";
  import EditParticipationScreen from "./screens/EditParticipationScreen";

  const DrawerNavigator = createDrawerNavigator(
          {
            Login: {
              screen: LoginScreen,
              navigationOptions:{
                drawerLabel: () => null
              },
            },
            Register: {
              screen: RegisterScreen,
              navigationOptions:{
                drawerLabel: () => null
              },
            },
            Profile: ProfileScreen,
            EditProfile: {
              screen: EditProfileScreen,
              navigationOptions:{
                drawerLabel: () => null
              },
            },
            Events: EventsScreen,
            EditEvent: {
              screen: EditEventScreen,
              navigationOptions:{
                drawerLabel: () => null
              },
            },
            Participations: ParticipationScreen,
            EditParticipation: {
              screen: EditParticipationScreen,
              navigationOptions:{
                drawerLabel: () => null
              },
            },
            Test: TestScreen
          },
          {
            unmountInactiveRoutes: true,
            initialRouteName: 'Login',
            navigationOptions:{
              headerShown: false
            }
          },
  );

  const StackNavigator = createStackNavigator(
          {
            Drawer: DrawerNavigator,
            Login: LoginScreen,
            Register: RegisterScreen,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Events: EventsScreen,
            EditEvent: EditEventScreen,
            Participations: ParticipationScreen,
            EditParticipation: EditParticipationScreen,
            Test: TestScreen
          },
  )

  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator },
  }
</script>