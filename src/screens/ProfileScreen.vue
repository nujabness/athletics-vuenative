<template>
    <view class="container">
        <nb-content>
            <text>Profile</text>
            <nb-button
                    :on-press="goToEditProfileScreen"
                    danger>
                <nb-text>Edit</nb-text>
            </nb-button>
        </nb-content>
    </view>
</template>

<script>
export default {
    props: ['navigation'],
    data: function() {
        return {

        }
    },
    methods: {
        goToEditProfileScreen() {
            this.navigation.navigate("EditProfile");
        }
    }
}
</script>

<style scoped>
    .container {
        background-color: white;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
</style>