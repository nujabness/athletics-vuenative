<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-grid>
            <nb-col :style="styles.justifyContentCenter">
                <view :style="styles.alignItemsCenter">
                    <!-- FORM -->
                    <nb-form :style="styles.width300, styles.mt50">
                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Email</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="email"/>
                        </nb-item>

                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Password</nb-label>
                            <nb-input secureTextEntry="true"
                                      :style="styles.colorWhite" v-model="password"/>
                        </nb-item>

                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Nom Athlète</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="nomAthlete"/>
                        </nb-item>

                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Prénom Athlète</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="prenomAthlete"/>
                        </nb-item>

                        <nb-item>
                            <nb-label :style="styles.colorWhite">Sexe Athlète</nb-label>
                            <nb-picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    :iosIcon="getIosIcon()"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :itemTextStyle="{ color: '#F08080' }"
                                    :selectedValue="selectedSexe"
                                    :onValueChange="onValueChangeSexe">
                                <item label="HOMME" value="HOMME" />
                                <item label="FEMME" value="FEMME" />
                            </nb-picker>                        </nb-item>
                        <nb-item>
                            <nb-label :style="styles.colorWhite">Nationalité Athlète</nb-label>
                            <nb-picker
                                    danger
                                    mode="dropdown"
                                    :iosIcon="getIosIcon()"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :itemTextStyle="{ color: '#F08080' }"
                                    placeholder="Nationalité Athlète"
                                    :selectedValue="selectedNationalite"
                                    :onValueChange="onValueChangeNationalite">
                                <item v-for="nationalite in nationalites"
                                      :label="nationalite.nom_nationalite"
                                      :value="nationalite.nom_nationalite" />
                            </nb-picker>
                        </nb-item>
                    </nb-form>
                </view>
                <!-- BUTTON -->
                <nb-row :style="styles.mt2, styles.justifyContentEnd">
                    <view :style="styles.width100, styles.alignItemsCenter, styles.mt5">
                        <view>
                            <nb-button
                                    :style="styles.bgColorSecondary"
                                    :on-press="goToProfileScreen">
                                <nb-text>Back</nb-text>
                            </nb-button>
                        </view>
                    </view>
                    <view :style="styles.width100, styles.alignItemsCenter, styles.mt5">
                        <view>
                            <nb-button
                                    :on-press="save"
                                    :style="styles.bgColorSecondary">
                                <nb-text>Save</nb-text>
                            </nb-button>
                        </view>
                    </view>
                </nb-row>
            </nb-col>
        </nb-grid>
    </nb-container>
</template>

<script>
import { MainStyleSheet } from '../shared/stylesheet'
import DataService from '../services/http.service'
import Store from '../store/store'
import React from "react";
import { Picker, Icon } from "native-base";

export default {
    components: { Item: Picker.Item, Icon },
    props: ['navigation'],
    data() {
        return {
            styles: MainStyleSheet,
            email: "",
            password: "",
            nomAthlete: "",
            prenomAthlete: "",
            selectedNationalite: "",
            selectedSexe: "",
            nationalites: []
        }
    },
    mounted() {
      this.setFormData()
      this.getAllNationalites()
    },
    computed:{
      user(){
          return Store.state.user
      }
    },
    methods: {
        getAllNationalites(){
            DataService.getAllNationalites().then(response => {
                this.nationalites = response.data.nationalites
            }).catch(error => {
                console.log(error)
            })
        },
        getIosIcon() {
            return <Icon style={{ color: "#FFFFFF"}} name="ios-arrow-down" />;
        },
        onValueChangeNationalite(value) {
            this.selectedNationalite = value;
        },
        onValueChangeSexe(value){
            this.selectedSexe = value;
        },
        setFormData(){
            this.email = this.user.email
            this.password = this.user.password
            this.nomAthlete = this.user.nom_athlete
            this.prenomAthlete = this.user.prenom_athlete
            this.selectedNationalite = this.user.nationalite_athlete.nom_nationalite
            this.selectedSexe = this.user.sexe_athlete
        },
        goToProfileScreen() {
            this.navigation.navigate("Profile");
        },
        save(){
             let body = {
                 id: this.user._id,
                 email: this.email,
                 password: this.password,
                 nom_athlete: this.nomAthlete,
                 prenom_athlete: this.prenomAthlete,
                 sexe_athlete: this.selectedSexe,
                 nationalite_athlete: this.selectedNationalite
             }
            DataService.userUpdate(body).then(response => {
                Store.commit('SET_USER', response.data.user);
                this.navigation.navigate("Profile");
            }).catch(error => {
                 console.log(error)
            })
        }
    }
}
</script>
