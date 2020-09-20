<template>
    <nb-container>
        <nb-grid>
            <nb-row size="2">
                <nb-col :style="{ justifyContent: 'center', backgroundColor: '#63AAFF' }">
                    <nb-row>
                        <nb-col :style="{ justifyContent: 'center', backgroundColor: '#15FC89' }">
                            <view :style="{ alignItems: 'center' }">
                                <text>CENTER</text>
                            </view>
                        </nb-col>
                        <nb-col :style="{ justifyContent: 'center', backgroundColor: '#13AAC0' }">
                            <view :style="{ alignItems: 'center' }">
                                <text>CENTER</text>
                            </view>
                        </nb-col>
                    </nb-row>
                </nb-col>
                <nb-col :style="{ justifyContent: 'center', backgroundColor: '#635DB7' }">
                    <nb-col :style="{ justifyContent: 'center', backgroundColor: '#ea1233' }">
                        <view :style="{ alignItems: 'center' }">
                            <view>
                                <nb-button
                                        large
                                        :on-press="goToProfileScreen"
                                        danger>
                                    <nb-text>Back</nb-text>
                                </nb-button>
                            </view>
                        </view>
                    </nb-col>
                    <nb-col :style="{ justifyContent: 'center', backgroundColor: '#1EEAC0' }">
                        <view :style="{ alignItems: 'center' }">
                            <text>CENTER</text>
                        </view>
                    </nb-col>
                </nb-col>
            </nb-row>
            <nb-row size="1">
                <nb-col :style="{ justifyContent: 'center', backgroundColor: '#DD5DB7' }">
                    <view :style="{ alignItems: 'center' }">
                        <text>CENTER</text>
                    </view>
                </nb-col>
                <nb-col :style="{ justifyContent: 'center', backgroundColor: '#DD5DB7' }">
                    <view :style="{ alignItems: 'center' }">
                        <text>CENTER</text>
                    </view>
                </nb-col>
            </nb-row>
        </nb-grid>
    </nb-container>
</template>

<script>
export default {
    props: ['navigation'],
    data: function() {
        return {

        }
    },
    methods: {
        goToProfileScreen() {
            this.navigation.navigate("Profile");
        }
    }
}
</script>