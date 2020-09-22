<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-grid>
            <nb-col :style="styles.justifyContentCenter">
                <view :style="styles.alignItemsCenter">
                    <!-- FORM -->
                    <nb-form :style="styles.width300, styles.mt100">
                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Résultat Épreuve</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="resultatEpreuve"/>
                        </nb-item>
                        <nb-item>
                            <nb-label :style="styles.colorWhite">Médaille Épreuve</nb-label>
                            <nb-picker
                                    mode="dropdown"
                                    :iosIcon="getIosIcon()"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :itemTextStyle="{ color: '#F08080' }"
                                    :selectedValue="selectedMedaille"
                                    :onValueChange="onValueChangeMedaille">
                                <item label="OR" value="OR" />
                                <item label="ARGENT" value="ARGENT" />
                                <item label="BRONZE" value="BRONZE" />
                                <item label="PAS DE MEDAILLE" value="PAS DE MEDAILLE" />
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
                                    :on-press="goToParticipationScreen">
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
            resultatEpreuve: "",
            selectedMedaille: "",
            participation: {}
        }
    },
    mounted() {
        this.participation = this.navigation.getParam("participation");
        this.resultatEpreuve = this.participation.resultat
        this.selectedMedaille = this.participation.medaille
    },
    computed:{
        user(){
            return Store.state.user
        }
    },
    methods: {
        getIosIcon() {
            return <Icon style={{ color: "#FFFFFF"}} name="ios-arrow-down" />;
        },
        onValueChangeMedaille(value) {
            this.selectedMedaille = value;
        },
        goToParticipationScreen() {
            this.navigation.navigate("Participations");
        },
        save() {
            let body = {
                userId: this.user._id,
                epreuveId: this.participation.epreuve._id,
                medaille: this.selectedMedaille,
                resultat: this.resultatEpreuve,
            }
            DataService.participationUpdate(body).then(response => {
                this.navigation.navigate("Participations");
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
