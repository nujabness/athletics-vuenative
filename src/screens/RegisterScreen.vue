<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-grid>
            <nb-col>
                <view :style="styles.alignItemsCenter, styles.mt150">
                    <!-- FORM -->
                    <nb-form :style="styles.width300">
                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Email</nb-label>
                            <nb-input :style="styles.colorWhite" v-model="email"/>
                        </nb-item>

                        <nb-item stackedLabel>
                            <nb-label :style="styles.colorWhite">Password</nb-label>
                            <nb-input secureTextEntry="true"
                                      :style="styles.colorWhite" v-model="password"/>
                        </nb-item>
                    </nb-form>
                    <!-- BUTTON -->
                    <nb-row v-if="!isLogin"
                            :style="styles.mt2, styles.justifyContentEnd, styles.width350">
                        <view :style="styles.width100, styles.alignItemsCenter, styles.mt5">
                            <view>
                                <nb-button
                                        :style="styles.bgColorSecondary"
                                        :on-press="goToLoginScreen">
                                    <nb-text>Login</nb-text>
                                </nb-button>
                            </view>
                        </view>
                        <view :style="styles.width100, styles.alignItemsCenter, styles.mt5">
                            <view>
                                <nb-button
                                        :on-press="register"
                                        :style="styles.bgColorSecondary">
                                    <nb-text>Register</nb-text>
                                </nb-button>
                            </view>
                        </view>
                        <view v-if="isLogin"
                              :style="styles.alignItemsCenter, styles.width300, styles.mt3">
                            <nb-spinner color="red" />
                        </view>
                    </nb-row>
                </view>
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
            isLogin: false
        }
    },
    methods: {
        goToLoginScreen() {
            this.navigation.navigate("Login");
        },
        register(){
            this.isLogin = true
            let body = {
                 email: this.email,
                 password: this.password,
             }
            DataService.register(body).then(response => {
                Store.commit('SET_USER', response.data.user);
                this.navigation.navigate("Login");
                this.isLogin = false
            }).catch(error => {
                 console.log(error)
            })
        }
    }
}
</script>
