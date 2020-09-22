<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-header :style="styles.bgColorPrimary">
            <nb-left>
                <nb-button transparent>
                    <nb-icon :style="{ color: '#FFF' }" name="menu" :on-press="() => drawerOpen()"/>
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title :style="styles.colorWhite">Profile</nb-title>
            </nb-body>
            <nb-right></nb-right>
        </nb-header>
        <nb-grid>
            <nb-col :style="styles.alignItemsCenter, styles.mt50">
                <view>
                    <nb-card :style="styles.width350, styles.mt50">
                        <nb-card-item bordered>
                            <nb-left>
                                <nb-thumbnail :source="logo"/>
                                <nb-body>
                                    <nb-text>{{user.prenom_athlete}} {{user.nom_athlete}}</nb-text>
                                    <nb-text note>September 20, 2020</nb-text>
                                </nb-body>
                                <image :source="imgNationalite"></image>
                            </nb-left>
                        </nb-card-item>
                        <nb-card-item>
                            <nb-body>
                                <nb-text>Athlète <text :style="styles.colorPrimary">{{user.sexe_athlete}}</text>,
                                    Je mesure 1,75m. Mon domaine de prédilection est la COURSE. Je pèse 75kg.
                                    Je suis d'origine <text :style="styles.colorPrimary">{{user.nationalite_athlete.nom_nationalite}}</text>.</nb-text>
                            </nb-body>
                        </nb-card-item>
                        <nb-card-item :style="styles.justifyContentEnd">
                            <view>
                                <nb-button
                                        bordered
                                        :on-press="goToEditProfileScreen">
                                    <nb-text>Edit</nb-text>
                                </nb-button>
                            </view>
                        </nb-card-item>
                    </nb-card>
                </view>
            </nb-col>
        </nb-grid>
    </nb-container>
</template>

<script>
import { Dimensions } from "react-native";
import { MainStyleSheet, ProfileStyleSheet } from '../shared/stylesheet'
import logo from '../assets/sportsman.png'
import ImgService from '../services/img.service'
import Store from "../store/store"
const deviceWidth = Dimensions.get("window").width;
export default {
        props: ['navigation'],
        data() {
            return {
                email: "",
                password: "",
                nomAthlete: "nomAthlete",
                prenomAthlete: "prenomAthlete",
                sexeAthlete: "sexeAthlete",
                nationaliteAthlete: "nationaliteAthlete",
                logo: logo,
                styles: MainStyleSheet,
                stylesProfile: ProfileStyleSheet,
                stylesObj: {
                    cardItemImage: {
                        resizeMode: "cover",
                        width: deviceWidth / 1.18
                    }
                }
            }
        },
    computed:{
        user() {
            return Store.state.user
        },
        imgNationalite() {
           return ImgService.getNationalite(this.user.nationalite_athlete.nom_nationalite)
        }
    },
    methods: {
        goToEditProfileScreen() {
            this.navigation.navigate("EditProfile");
        },
        drawerOpen(){
            this.navigation.openDrawer();
        }
    }
}
</script>
