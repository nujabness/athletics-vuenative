import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        token: ""
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        }
    },
    actions: {
        set_user(context) {
            context.commit("SET_USER");
        },
        set_token(context) {
            context.commit("SET_TOKEN");
        }
    }
});
export default store;