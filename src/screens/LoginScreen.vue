<template>
    <nb-container :style="styles.bgColorPrimary">
        <nb-grid>
            <nb-col :style="styles.alignItemsCenter, styles.mt100">
                <view>
                    <image :source="cardImage" class="card-item-image" :style="stylesObj.cardItemImage"/>
                </view>
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
                <view v-if="!isLogin"
                      :style="styles.alignItemsEnd, styles.width300, styles.mt3">
                    <nb-button :on-press="login"
                                :style="styles.mt5" full danger>
                        <nb-text>Login</nb-text>
                    </nb-button>
                    <text :on-press="goToRegisterScreen"
                          :style="styles.colorWhite, styles.fontSize18">Register</text>
                </view>
                <view v-if="isLogin"
                        :style="styles.alignItemsCenter, styles.width300, styles.mt3">
                    <nb-spinner color="red" />
                </view>
            </nb-col>
        </nb-grid>
    </nb-container>
</template>

<script>
import { Dimensions } from "react-native";
import { MainStyleSheet } from '../shared/stylesheet'
import cardImage from "../assets/athletics.png";
import DataService from "../services/http.service";
import Store from "../store/store"
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default {
    props: ['navigation'],
    data() {
        return {
            email: "",
            password: "",
            isLogin: false,
            cardImage: cardImage,
            styles: MainStyleSheet,
            stylesObj: {
                cardItemImage: {
                    resizeMode: "cover",
                    height: deviceHeight / 5,
                    width: deviceWidth / 2
                }
            }
        }
    },
    methods:{
        login(){
            this.isLogin = true
            let body = {
                email: this.email,
                password: this.password,
            }
            DataService.login(body).then(response => {
                Store.commit('SET_USER', response.data.user);
                Store.commit('SET_TOKEN', response.data.token);
                this.navigation.navigate("Profile");
                this.isLogin = false
            }).catch(error => {
                console.log(error);
            });
        },
        goToRegisterScreen() {
            this.navigation.navigate("Register");
        },
    }
}
</script>