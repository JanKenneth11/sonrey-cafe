<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
                <ion-row class="ion-justify-content-center ion-align-items-center">
                    <ion-col size="9" class="header">
                        <ion-item lines="none" class="header-title-wrapper no-bg">
                            <ion-img slot="start" src="assets/img/feedback-icon.png" class="ion-no-margin icon"/>
                            <p>
                                Feedback
                            </p>
                        </ion-item>
                    </ion-col>
                    <ion-col size="2">
                        <ion-button expand="block" class="no-ripple back-btn">
                            <ion-img src="assets/img/back-arrow.png"></ion-img>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-margin-top ion-margin-start ion-margin-end">
                    <ion-list>
                        <ion-item lines="none">
                            <ion-label position="stacked" text-wrap>What do you think about the App?</ion-label>
                            <ion-input type="text"></ion-input>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label position="stacked" text-wrap>Any Suggestion you would like to share?</ion-label>
                            <ion-input type="text"></ion-input>
                        </ion-item>
                        <!-- <ion-item lines="none">
                            <ion-label position="stacked">Any Suggestion you would like to share?</ion-label>
                            <ion-item lines="none">
                                <ion-checkbox slot="start">Test</ion-checkbox>
                                <ion-label>Excellent</ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-checkbox slot="start">Test</ion-checkbox>
                                <ion-label>Good</ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-checkbox slot="start">Test</ion-checkbox>
                                <ion-label>Neutral</ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-checkbox slot="start">Test</ion-checkbox>
                                <ion-label>Bad</ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-checkbox slot="start">Test</ion-checkbox>
                                <ion-label>VeryBad</ion-label>
                            </ion-item>
                        </ion-item> -->
                    </ion-list>
                </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import BaseLayout from '../components/BaseLayout.vue'
export default {
  components: { BaseLayout },
}
</script>
<style scoped>
ion-list {
    background: #FFE27B;
    width: 100%;
}
ion-list ion-item {
    --background: transparent;
}
ion-list ion-label {
    font-family: 'AbhayaLibre-ExtraBold' !important;
    font-size: 32px !important;
    color: #000 !important;
    font-weight: 900 !important;
    width: -webkit-fill-available !important;
    max-width: 100% !important;
    line-height: 1 !important;
}
ion-list ion-input {
    border-bottom: 1px solid #000;
    --color: #000;
}
</style>