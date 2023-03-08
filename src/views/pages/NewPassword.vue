<template>
    <ion-page>
        <ion-content class="primary-bg" force-overscroll="false">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="margin-bottom: 100px;">
                    <ion-col size="11" class="ion-text-center">
                        <h1 style="color: #1C2546;"><strong><ion-label style="font-size: 32px !important;">Enter New Password</ion-label></strong></h1>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-align-items-center">
                    <ion-col size="11">
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Enter new password</ion-label>
                            <ion-input v-model="input.new_password" type="password"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="11">
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Confirm password</ion-label>
                            <ion-input v-model="input.confirm_password" type="password"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="11">
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Enter verification code</ion-label>
                            <ion-input v-model="input.code" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="11" class="ion-text-center">
                        <ion-button @click="updateUserPassword(input)">Send code</ion-button>
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
        updateUserPassword(user){
            if (user.new_password == user.confirm_password) {
                var data = {
                    new_password: user.new_password,
                    code: user.code
                }
                this.$axios.post('/api/client/resetpassword', data).then((data) => {
                    console.log(data)
                    if(data.data.message == 'Error'){
                        this.errorNotify(data.data.message)
                    } else {
                        this.successNotify(data.data.message)
                        this.$router.push('/login')
                    }
                })
            }
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