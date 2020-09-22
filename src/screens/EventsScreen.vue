<template>
    <nb-container>
        <nb-header :style="styles.bgColorPrimary">
            <nb-left>
                <nb-button transparent>
                    <nb-icon :style="{ color: '#FFF' }" name="menu" :on-press="drawerOpen"/>
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title :style="styles.colorWhite">Events</nb-title>
            </nb-body>
            <nb-right>
                <nb-button transparent>
                    <nb-icon :style="{ color: '#FFF' }" name="ios-add-circle" :on-press="createEvent"/>
                </nb-button>
            </nb-right>
        </nb-header>
        <scroll-view :style="styles.bgColorPrimary">
            <nb-grid>
                <nb-col :style="styles.alignItemsCenter, styles.mt30">
                    <view v-for="event in events">
                        <nb-card :style="styles.width350">
                            <nb-card-item bordered>
                                <nb-left>
                                    <nb-thumbnail :source="imgEvent(event.type_epreuve)"/>
                                    <nb-body>
                                        <nb-text>{{event.nom_epreuve}} {{event.type_epreuve}} {{event.phase_epreuve}}</nb-text>
                                        <nb-text note>{{event.date_epreuve}}</nb-text>
                                    </nb-body>
                                </nb-left>
                            </nb-card-item>
                            <nb-card-item :style="styles.justifyContentCenter">
                                <nb-col :style="styles.alignItemsCenter">
                                    <view>
                                        <nb-button
                                                :on-press="() => edit(event)">
                                            <nb-text>Edit</nb-text>
                                        </nb-button>
                                    </view>
                                </nb-col>
                                <nb-col :style="styles.alignItemsCenter">
                                    <view>
                                        <nb-button
                                                :on-press="() => supprimer(event)">
                                            <nb-text>Supprimer</nb-text>
                                        </nb-button>
                                    </view>
                                </nb-col>
                                <nb-col :style="styles.alignItemsCenter">
                                    <view v-if="!participeDeja(event.participants)">
                                        <nb-button
                                                :on-press="() => participer(event)">
                                            <nb-text>Participer</nb-text>
                                        </nb-button>
                                    </view>
                                    <view v-if="participeDeja(event.participants)">
                                        <nb-button
                                                :on-press="() => annulerParticiper(event)">
                                            <nb-text>Annuler</nb-text>
                                        </nb-button>
                                    </view>
                                </nb-col>
                            </nb-card-item>
                        </nb-card>
                    </view>
                </nb-col>
            </nb-grid>
        </scroll-view>
    </nb-container>
</template>

<script>
import { Dimensions } from "react-native";
import { MainStyleSheet, ProfileStyleSheet } from '../shared/stylesheet'
import logo from '../assets/sportsman.png'
import DataService from '../services/http.service'
import ImgService from '../services/img.service'
import Store from "../store/store"
const deviceWidth = Dimensions.get("window").width;
export default {
    props: ['navigation'],
    data() {
        return {
            events: [],
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
    mounted() {
        this.getAllEvents()
    },
    computed: {
        user() {
            return Store.state.user
        },
    },
    methods: {
        getAllEvents() {
            DataService.getAllEvents().then(response => {
                this.events = response.data.epreuves
            }).catch(error => {
                console.log(error)
            })
        },
        participeDeja(participants) {
            let participant = participants.filter((participant) => participant.athlete._id === this.user._id)
            if(participant.length){
                return true
            }
            return false
        },
        imgEvent(typeEvent) {
            return ImgService.getEvent(typeEvent)
        },
        participer(event) {
            let body = {
                user: this.user,
                epreuve: event
            }
            DataService.participeEvents(body).then(response => {
                this.getAllEvents()
            }).catch(error => {
                console.log(error)
            })
        },
        annulerParticiper(event) {
            let body = {
                id: this.user._id,
                epreuve: event
            }
            DataService.annulerParticipation(body).then(response => {
                this.getAllEvents()
            }).catch(error => {
                console.log(error)
            })
        },
        supprimer(event) {
            let body = {
                id: event._id,
            }
            DataService.supprimerEvent(body).then(response => {
                this.getAllEvents()
            }).catch(error => {
                console.log(error)
            })
        },
        edit(event){
            this.navigation.navigate("EditEvent", {event: event});
        },
        drawerOpen(){
            this.navigation.openDrawer();
        },
        createEvent() {
            this.navigation.navigate("EditEvent");
        }
    }
}
</script>
