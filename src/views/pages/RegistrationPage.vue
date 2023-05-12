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
                        <!-- <div>
                            <span>By using our ordering app, you agree to provide us with accurate and up-to-date contact information, including your name, phone number, email address, and delivery address.</span>
                            <span>We collect your contact information for the purpose of fulfilling your order, providing customer support, and improving our services.</span>
                            <span>We may use your contact information to send you marketing communications and promotional offers, but you have the option to opt-out of these communications at any time</span>
                            <span>We take appropriate measures to protect your contact information from unauthorized access, use, or disclosure. We do not sell or rent your contact information to third parties without your consent, except as required by law or to fulfill your order.</span>
                        </div> -->
                        <ion-checkbox labelPlacement="end" v-model="term_condition"></ion-checkbox>
                        <span @click="showTermCondition" link style="color:blue">I agree to the terms and conditions 
                           
                        </span>
                       
                        
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
import {IonPage, IonContent, IonGrid, IonRow, IonCol,IonCheckbox , IonImg, IonItem, IonLabel, IonInput, IonButton, alertController} from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { eyeOutline} from "ionicons/icons";

export default {
    components: {
        IonPage, 
        IonCheckbox,
        IonContent, IonGrid, IonRow, IonCol, IonImg, IonItem, IonLabel, IonInput, IonButton
    },
    data:() => ({
        term_condition : false,
        eyeOutline,
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
    mounted(){
        this.showTermCondition()
    },
    methods: {
        logIn() {
            this.$router.push('/login')
        },
        showTermCondition(){
            // const thiss = this
            return alertController
            .create({
            header: 'Terms and condition',
            message: `
                <span>- By using our ordering app, you agree to provide us with accurate and up-to-date contact information, including your name, phone number, email address, and delivery address.</span>
                <br>
                <br>
                <span>- We collect your contact information for the purpose of fulfilling your order, providing customer support, and improving our services.</span>
                <br>
                <br>
                <span>- We may use your contact information to send you marketing communications and promotional offers, but you have the option to opt-out of these communications at any time.</span>
                <br>
                <br>
                <span>- We take appropriate measures to protect your contact information from unauthorized access, use, or disclosure. We do not sell or rent your contact information to third parties without your consent, except as required by law or to fulfill your order.</span>
                <br>  
                <br>  
                <span>- By using our ordering app, you acknowledge and agree that we may share your contact information with our third-party service providers, such as payment processors, delivery partners, and customer support providers, to fulfill your order and provide you with a better experience.</span>
                <br>  
                <br>  
                <span>- We reserve the right to modify these terms and conditions at any time, without prior notice. Your continued use of our ordering app after any modifications to these terms and conditions constitutes your acceptance of the modified terms.</span>
                <br>  
                <br>  
                <span>- You may request access to or correction of your contact information that we hold, or withdraw your consent for us to collect, use, or disclose your contact information, by contacting us at the contact information provided in the app.</span>
                <br>  
                <br>  
                <span>- By using our ordering app, you acknowledge and agree to these terms and conditions, as well as our privacy policy, which governs our collection, use, and disclosure of your personal information.</span>
                <br>  
                `,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        
                    },
                }
            ],
            })
            .then(a => a.present())
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