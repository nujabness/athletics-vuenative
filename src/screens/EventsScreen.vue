<template>
    <<scroll-view :style="styles.bgColorPrimary">
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
                                            :on-press="details">
                                        <nb-text>Détails</nb-text>
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
                                        <nb-text>Annuler participation</nb-text>
                                    </nb-button>
                                </view>
                            </nb-col>
                        </nb-card-item>
                    </nb-card>
                </view>
            </nb-col>
        </nb-grid>
    </scroll-view>
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
        details() {

        }
    }
}
</script>
