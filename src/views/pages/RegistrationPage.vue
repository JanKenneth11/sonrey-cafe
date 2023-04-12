<template>
    <ion-page>
        <ion-content class="primary-bg">
            <ion-grid class="secondary-bg">
                <ion-row>
                    <!-- for image -->
                    <ion-col size="12" class="ion-text-center">
                        <ion-img :src="input.image ? input.image : 'assets/img/registration-noimage.png'" @click="takePhoto"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Name:</ion-label>
                            <ion-input v-model="input.name" type="text"></ion-input>
                        </ion-item>
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Username:</ion-label>
                            <ion-input v-model="input.username" type="text"></ion-input>
                        </ion-item>
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Password:</ion-label>
                            <ion-input v-model="input.password" type="password"></ion-input>
                        </ion-item>
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Confirm Password:</ion-label>
                            <ion-input v-model="input.confirmpassword" type="password"></ion-input>
                        </ion-item>
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Email:</ion-label>
                            <ion-input v-model="input.email" type="email"></ion-input>
                        </ion-item>
                        <ion-item class="no-bg" lines="none">
                            <ion-label position="stacked">Contact Number:</ion-label>
                            <ion-input v-model="input.number" type="number" maxLenght="11"></ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" class="ion-text-center term-condtion">
                        <ion-checkbox labelPlacement="end" v-model="term_condition"></ion-checkbox>
                        <span>I agree to the terms and conditions</span>
                    </ion-col>
                    <ion-col size="12" class="ion-text-center">
                        <ion-button @click="registerAccount" :disabled="term_condition ? false : true">Register</ion-button>
                    </ion-col>
                    <ion-col size="12" class="ion-text-center">
                        <p @click="logIn"><b style="color:blue">Click here!</b> to Login</p>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonPage, IonContent, IonGrid, IonRow, IonCol,IonCheckbox , IonImg, IonItem, IonLabel, IonInput, IonButton} from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default {
    components: {
        IonPage, 
        IonCheckbox,
        IonContent, IonGrid, IonRow, IonCol, IonImg, IonItem, IonLabel, IonInput, IonButton
    },
    data:() => ({
        term_condition : false,
        input: {
            email: '',
            birth_date: '',
            number: '',
            name: '',
            username: '',
            password: '',
            confirmpassword: '',
            fcm_token: ''
        },
    }),
    methods: {
        logIn() {
            this.$router.push('/login')
        },
        async takePhoto(){
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                source: CameraSource.Camera,
                resultType: CameraResultType.Base64,
            });

            this.input.image ="data:image/jpeg;base64," + image.base64String;
        },
        validateEmail(email) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email)
        },
        registerAccount() {
            if(this.input.password != this.input.confirmpassword){
                return this.errorNotify('Password and confirm password did not match')
            }
            this.input.fcm_token = 'createUser_' + this.input.name;
            this.input.birth_date = "2023-03-07"
            this.$axios.post('/user/client/register',this.input).then(() => {
                this.input = {};
                    this.successNotify('Account created successfully');
                    this.$router.push('/login');
            }).catch(err => {
                var errors = Object.values(err.response.data.errors)
                // Object.values(err.response.data.errors).forEach(el => {
                    this.errorNotify(errors[0][0])
                // })
            });
        }
    },
}
</script>
<style scoped>
ion-grid {
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* width: 80%; */
}
ion-row {
    justify-content: center;
}

ion-img {
    width: 50%;
    margin: 25% auto 0;
}

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
    font-size: 32px !important;
    --color: #5D5D5D !important;
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
.term-condtion {
    display: flex;
    margin: auto;
    padding: 0 24px;
    gap: 12px;
    margin: 12px 0;
}
.term-condtion span{
    font-size: 20px !important;
 }
</style>