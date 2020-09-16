<template>
    <nb-view :style="styles.container">
        <nb-form :style="styles.marginForm">
            <nb-item stackedLabel>
                <nb-label>Email</nb-label>
                <nb-input v-model="email"/>
            </nb-item>

            <nb-item stackedLabel last>
                <nb-label>Password</nb-label>
                <nb-input v-model="password"/>
            </nb-item>

            <nb-item stackedLabel last>
                <nb-label>Nom Athlète</nb-label>
                <nb-input v-model="nomAthlete"/>
            </nb-item>

            <nb-item stackedLabel last>
                <nb-label>Prénom Athlète</nb-label>
                <nb-input v-model="prenomAthlete"/>
            </nb-item>

            <nb-item stackedLabel last>
                <nb-label>Sexe Athlète</nb-label>
                <nb-input v-model="sexeAthlete"/>
            </nb-item>

            <nb-item stackedLabel last>
                <nb-label>Nationalité Athlète</nb-label>
                <nb-input v-model="nationaliteAthlete" />
            </nb-item>
            <nb-view :style="styles.viewButton">
                <nb-view>
                    <nb-button
                            large
                            :on-press="goToProfileScreen"
                            danger>
                        <nb-text>Back</nb-text>
                    </nb-button>
                </nb-view>
                <nb-view>
                    <nb-button
                            large
                            :on-press="save"
                            danger>
                        <nb-text>Save</nb-text>
                    </nb-button>
                </nb-view>
            </nb-view>
        </nb-form>
    </nb-view>
</template>

<script>
import { EditProfileStyleSheet } from '../shared/stylesheet'
export default {

    props: ['navigation'],
    data: function() {
        return {
            styles: EditProfileStyleSheet,
            email: "",
            password: "",
            nomAthlete: "",
            prenomAthlete: "",
            sexeAthlete: "",
            nationaliteAthlete: ""
        }
    },
    methods: {
        goToProfileScreen() {
            this.navigation.navigate("Profile");
        },
        save(){
          console.log(this.email + this.password)
        }

    }
}
</script>
