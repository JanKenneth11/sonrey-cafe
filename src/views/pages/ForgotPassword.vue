<template>
    <ion-page>
        <ion-content class="primary-bg" force-overscroll="false">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="margin-bottom: 100px;">
                    <ion-col size="11" class="ion-text-center">
                        <h1 style="color: #1C2546;"><strong><ion-label style="font-size: 32px !important;">Forgot Password</ion-label></strong></h1>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-align-items-center">
                    <ion-col size="11">
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Enter registered email</ion-label>
                            <ion-input v-model="input.email" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="11" class="ion-text-center">
                        <ion-button @click="sendVerificationCode(input)">Send code</ion-button>
                    </ion-col>
                    <ion-col size="11" class="ion-text-center">
                        <p @click="logIn">Check here! , to Login</p>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>
import {IonPage, IonContent, IonGrid, IonRow, IonLabel, IonInput, IonItem, IonButton, IonCol} from '@ionic/vue'
export default {
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonLabel, IonInput, IonItem, IonButton, IonCol
    },
    data:() => ({
        input: {},
    }),
    methods: {
        sendVerificationCode(email){
            this.$axios.post('/api/client/porgot_pass', email).then((data)=> {
                if(data.data.message == "Password Reset Code Succesufly Sent!") {
                    this.successNotify(data.data.message)
                    this.$router.push('new-password')
                } else {
                    this.errorNotify(data.data.message)
                }
            })
        },
        logIn(){
            this.$router.push('login')
        }
    },
}
</script>
<style scoped>
ion-item.item-has-focus ion-label {
    color: #5D5D5D !important;
}
ion-input {
    --background: white;
    --highlight-background: #000;
    color: #000;
    border-radius: 12px;
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 30px;
    text-shadow: -1.5px 4px 4px;
    box-shadow: 2px 4px 1px 0px rgb(0 0 0 / 10%);
    margin: 5px 0;
    --padding-start: 15px !important;
    caret-color: #000;
}
ion-label {
    font-family: 'AbhayaLibre-ExtraBold' !important;
    font-size: 24px !important;
    --color: #5D5D5D !important;
    transform: none !important;
    transition: none !important;
}
ion-button {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 18px;
    --background: #1C2546;
    --border-radius: 20px;
    height: 55px;
    width: 75%;
    font-size: 26px;
}
p {
    margin: 0;
    text-align: center;
    font-family: 'AbhayaLibre-ExtraBold';
    color: #000;
    font-size: 26px;
    letter-spacing: 0;
}
</style>