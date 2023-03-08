<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
                <ion-row class="ion-justify-content-center ion-align-items-center">
                    <ion-col size="11" class="header">
                        <ion-item lines="none" class="header-title-wrapper no-bg">
                            <ion-img slot="start" src="assets/img/feedback-icon.png" class="ion-no-margin icon"/>
                            <p>
                                Feedback
                            </p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-margin-top ion-margin-start ion-margin-end">
                    <ion-list>
                        <ion-item lines="none">
                            <ion-label position="stacked" text-wrap>What do you think about the App?</ion-label>
                            <ion-input type="text" class="ion-margin-top" v-model="input.about_app"></ion-input>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label position="stacked" text-wrap>Any Suggestion you would like to share?</ion-label>
                            <ion-input type="text" class="ion-margin-top" v-model="input.suggestion"></ion-input>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label position="stacked" text-wrap>What do you rate about this app?</ion-label>
                            <ion-radio-group v-model="input.rate" style="width: 100%;">
                                <ion-item lines="none">
                                    <ion-label>Execellent</ion-label>
                                    <ion-radio slot="start" value="1"></ion-radio>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Good</ion-label>
                                    <ion-radio slot="start" value="2"></ion-radio>
                                </ion-item>

                                <ion-item lines="none">
                                    <ion-label>Neutral</ion-label>
                                    <ion-radio slot="start" value="3"></ion-radio>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Bad</ion-label>
                                    <ion-radio slot="start" value="4"></ion-radio>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Very Bad</ion-label>
                                    <ion-radio slot="start" value="5"></ion-radio>
                                </ion-item>
                            </ion-radio-group>
                        </ion-item>
                        <div class="btn_wrapper">
                            <ion-button @click="sendFeedback(input)">Submit</ion-button>
                        </div>
                    </ion-list>
                </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import BaseLayout from '../components/BaseLayout.vue'
import {IonImg, IonItem, IonCol, IonButton, IonRow, IonLabel, IonInput, IonList, IonGrid, IonRadioGroup, IonRadio, } from '@ionic/vue'
export default {
  components: { IonImg, IonItem, IonCol, IonButton, IonRow, IonLabel, IonInput, IonList, IonGrid, IonRadioGroup, IonRadio, BaseLayout },
  data:() => ({
    input: {},
  }),
  methods: {
    sendFeedback(feedback){
        this.$axios.post('/api/feedback', feedback).then(() => {
            this.successNotify('Feedback Sent');
            this.input = {};
        })
    },
  },
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
ion-radio-group ion-label,
ion-list ion-label {
    font-family: 'AbhayaLibre-ExtraBold' !important;
    font-size: 24px !important;
    color: #000 !important;
    font-weight: 900 !important;
    width: -webkit-fill-available !important;
    max-width: 100% !important;
    line-height: 1 !important;
    transform: none !important;
    transition: none !important;
    margin: 15px 0 !important;
}
ion-radio-group ion-item ion-label {
    font-size: 24px !important;
}
ion-list ion-input {
    border-bottom: 1px solid #000;
    --color: #000;
    --padding-bottom: 0 !important;
}
.btn_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
ion-button {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 16px;
    --background: #1C2546;
    --border-radius: 20px;
    height: 45px;
    width: 45%;
}
</style>