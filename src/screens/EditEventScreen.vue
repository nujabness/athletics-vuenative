<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-grid>
            <nb-col :style="styles.justifyContentCenter">
                <view :style="styles.alignItemsCenter">
                    <!-- FORM -->
                    <nb-form :style="styles.width300, styles.mt100">
                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Nom Épreuve</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="nomEpreuve"/>
                        </nb-item>
                        <nb-item>
                            <nb-label :style="styles.colorWhite">Type Épreuve</nb-label>
                            <nb-picker
                                    mode="dropdown"
                                    :iosIcon="getIosIcon()"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :itemTextStyle="{ color: '#F08080' }"
                                    :selectedValue="selectedType"
                                    :onValueChange="onValueChangeType">
                                <item label="SPRINT" value="SPRINT" />
                                <item label="COURSE" value="COURSE" />
                            </nb-picker>
                        </nb-item>
                        <nb-item>
                            <nb-label :style="styles.colorWhite">Phase Épreuve</nb-label>
                            <nb-picker
                                    mode="dropdown"
                                    :iosIcon="getIosIcon()"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :itemTextStyle="{ color: '#F08080' }"
                                    :selectedValue="selectedPhase"
                                    :onValueChange="onValueChangePhase">
                                <item label="FINAL" value="FINALE" />
                                <item label="DEMI-FINAL" value="DEMI-FINAL" />
                            </nb-picker>
                        </nb-item>
                        <nb-item>
                            <nb-label :style="styles.colorWhite">Date Épreuve</nb-label>
                            <nb-date-picker
                                    :defaultDate="defaultDate"
                                    :minimumDate="minimumDate"
                                    :maximumDate="maximumDate"
                                    :modalTransparent="false"
                                    animationType="fade"
                                    androidMode="default"
                                    placeHolderText="Select date"
                                    :textStyle="{ color: '#FFFFFF' }"
                                    :placeHolderTextStyle="{ color: '#FFFFFF' }"
                                    :onDateChange="setDate"/>
                        </nb-item>
                    </nb-form>
                </view>
                <!-- BUTTON -->
                <nb-row :style="styles.mt2, styles.justifyContentEnd">
                    <view :style="styles.width100, styles.alignItemsCenter, styles.mt5">
                        <view>
                            <nb-button
                                    :style="styles.bgColorSecondary"
                                    :on-press="goToEventScreen">
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
            event: {},
            nomEpreuve: "",
            selectedPhase: "",
            selectedType: "",
            defaultDate: new Date(),
            minimumDate: new Date(),
            maximumDate: new Date('2050-12-31'),
            chosenDate:  new Date()
        }
    },
    mounted(){
        this.event = this.navigation.getParam("event");
        if(this.event){
            this.nomEpreuve = this.event.nom_epreuve
            this.selectedPhase = this.event.phase_epreuve
            this.selectedType = this.event.type_epreuve
            this.chosenDate = new Date(this.event.date_epreuve)
            this.defaultDate = new Date(this.event.date_epreuve)
        }
    },
    methods: {
        setDate(newDate) {
            this.chosenDate = newDate;
        },
        getIosIcon() {
            return <Icon style={{ color: "#FFFFFF"}} name="ios-arrow-down" />;
        },
        onValueChangePhase(value) {
            this.selectedPhase = value;
        },
        onValueChangeType(value){
            this.selectedType = value;
        },
        goToEventScreen() {
            this.navigation.navigate("Events");
        },
        save() {
            let body = {
                nom_epreuve: this.nomEpreuve,
                phase_epreuve: this.selectedPhase,
                type_epreuve: this.selectedType,
                date_epreuve: this.chosenDate.toISOString().substr(0, 10)
            }
            if(this.event){
                    body.id = this.event._id,
                    DataService.eventUpdate(body).then(response => {
                    this.navigation.navigate("Events");
                }).catch(error => {
                    console.log(error)
                })
            } else {
                DataService.eventCreate(body).then(response => {
                    this.navigation.navigate("Events");
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>
