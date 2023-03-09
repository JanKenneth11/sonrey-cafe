<template>
    <ion-page>
        <ion-content class="primary-bg">
            <ion-grid class="secondary-bg">
                <ion-row>
                    <ion-col size="12">
                        <ion-img src="assets/img/logo.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-item lines="none" class="ion-margin-bottom">
                            <ion-input v-model="input.email" type="text" placeholder="Email" class="ion-no-padding"></ion-input>
                        </ion-item>
                        <ion-item lines="none" class="ion-margin-bottom">
                            <ion-input v-model="input.password" :type="passwordStatus ? 'text' : 'password'"  placeholder="Password" class="ion-no-padding"></ion-input>
                            <ion-icon  :icon="passwordStatus ? eyeOutline : eyeOffOutline" slot="end" @click="passwordStatus = !passwordStatus" class="ion-no-padding"></ion-icon>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12" class="ion-text-center">
                        <ion-button @click="Login(input)">Log In</ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <p @click="Register"><b style="color:blue">Click here!</b> to Register</p>
                        <p @click="ForgotPass">Forgot password ?  <b style="color:blue">Click here!</b></p>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>

import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonItem, IonInput, IonIcon, IonButton} from '@ionic/vue';
import { eyeOutline, eyeOffOutline, } from "ionicons/icons";

export default {
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
        IonItem,
        IonInput,
        IonIcon,
        IonButton
    },
    data:() =>  ({
        eyeOutline, 
        eyeOffOutline,
        passwordStatus: false,
        input: {
            email: '',
            password: '',
            fcm_token: 'logIn_user',
        },
    }),
    methods: {
        validateEmail(email) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email)
        },
        Login(params) {
            if (params.email != '' && params.password != '') {
                if(this.validateEmail(params.email)){
                    this.$axios.post('/api/client/login', params).then((data) => {
                        console.log(data)
                            this.input.email = ''
                            this.input.password = ''
                            localStorage.setItem("token", data.data.access_token);
                            this.successNotify('Login Successfully!')
                            this.$router.push("/order");
                    }).catch(err => {
                        this.errorNotify(err.response.data.message)
                    });
                } else {
                    this.errorNotify('Email is invalid');
                }
            } else {
                this.errorNotify('Email or password is empty');
            }
        },
        Register() {
            this.$router.push("/register")
        },
        ForgotPass() {
            this.$router.push("/forgot-password")
        },
    },
}
</script>

<style scoped>
ion-grid {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 80%;
}
ion-row {
    justify-content: center;
}
ion-img {
    height: 75%;
}
ion-item {
    --background: white;
    --highlight-background: #000;
    color: #000;
    border-radius: 25px;
    border: 4px solid #000;
}
ion-input {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 30px;
    text-shadow: -1.5px 4px 4px;
}
p {
    margin: 0;
    text-align: center;
    font-family: 'AbhayaLibre-ExtraBold';
    color: #000;
    font-size: 26px;
    letter-spacing: 0;
}
ion-icon {
    color: #000;
    font-size: xx-large;
    margin: 0;
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
</style>