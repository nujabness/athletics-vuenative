<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-header :style="styles.bgColorPrimary">
            <nb-left>
                <nb-button transparent>
                    <nb-icon :style="{ color: '#FFF' }" name="menu" :on-press="() => drawerOpen()"/>
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title :style="styles.colorWhite">Participations</nb-title>
            </nb-body>
            <nb-right></nb-right>
        </nb-header>
        <nb-grid>
            <nb-col :style="styles.mt50">
                <view>
                    <nb-list-item>
                        <nb-text :style="styles.textColorWhite">Participations</nb-text>
                    </nb-list-item>
                    <nb-list-item v-for="participation in participations" :on-press="() => goToEditParticipation(participation)">
                        <nb-left>
                            <nb-text :style="styles.textColorWhite">{{participation.epreuve.nom_epreuve}} {{participation.medaille}} {{participation.resultat}}</nb-text>
                        </nb-left>
                        <nb-right>
                            <nb-icon name="arrow-forward" :style="{ color: 'white' }"/>
                        </nb-right>
                    </nb-list-item>
                </view>
            </nb-col>
        </nb-grid>
    </nb-container>
</template>

<script>
import { MainStyleSheet } from '../shared/stylesheet';
import DataService from '../services/http.service';
import Store from "../store/store"
export default {
    props: ['navigation'],
    data() {
        return {
            styles: MainStyleSheet,
            participations: []
        }
    },
    mounted(){
        this.getAllParticipations()
    },
    computed:{
        user() {
            return Store.state.user
        },
    },
    methods: {
        getAllParticipations(){
            let body = {
                id: this.user._id
            }
            DataService.getParticipations(body).then(response => {
                this.participations = response.data.participations
            }).catch(error => {
                console.log(error)
            })
        },
        goToEditParticipation(participation){
            this.navigation.navigate("EditParticipation", {participation: participation});
        },
        drawerOpen(){
            this.navigation.openDrawer();
        }
    }
}
</script>
