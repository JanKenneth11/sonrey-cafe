<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="11" class="header">
                    <ion-item lines="none" class="header-title-wrapper">
                        <ion-img slot="start" src="assets/img/profile.png" class="ion-no-margin icon"/>
                        <p>
                            Profile
                        </p>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-margin-top ion-margin-start ion-margin-end">
                <ion-col size="12" class="profile_pic_container">
                    <!-- <ion-img :src="data.image != null || data.image != undefined ? data.image :'assets/img/profile.png'" id="profile_pic" class="profile_pic" style="border:solid"/> -->
                    <div  class="profile_pic" id="profile_pic">
                        <img :src="data.image != null || data.image != undefined ? data.image :'assets/img/empty_person.png'"  width="150" height="150">
                    </div>
                    <ion-button @click="takePhoto">Change Photo</ion-button>
                </ion-col>
                <ion-col size="12">
                    <ion-item class="user_name no-bg" lines="none">
                        <ion-label position="stacked">Name:</ion-label>
                        <ion-input v-model="data.name" type="text"></ion-input>
                    </ion-item>
                    <ion-item class="user_username no-bg" lines="none">
                        <ion-label position="stacked">Username:</ion-label>
                        <ion-input v-model="data.username" type="text" maxLenght="11"></ion-input>
                    </ion-item>
                    <ion-item class="no-bg" lines="none"></ion-item>
                    <ion-item class="user_email no-bg" lines="none">
                        <ion-label position="stacked">Email:</ion-label>
                        <ion-input v-model="data.email" type="email"></ion-input>
                    </ion-item>
                    <ion-item class="user_contact no-bg" lines="none">
                        <ion-label position="stacked">Contact Number:</ion-label>
                        <ion-input v-model="data.number" type="number" maxLenght="11"></ion-input>
                    </ion-item>
                    <ion-item class="user_pass no-bg" lines="none">
                        <ion-label position="stacked">Password:</ion-label>
                        <ion-input v-model="data.password" type="password" style="-webkit-text-security: square;"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <ion-button class="btn-save" @click="updateUser(data)">Save</ion-button>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {IonImg, IonItem, IonCol, IonRow, IonButton, IonLabel, IonInput, IonGrid, } from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import BaseLayout from '../components/BaseLayout.vue';
export default {
  components: { IonImg, IonItem, IonCol, IonRow, IonButton, IonLabel, IonInput, IonGrid, BaseLayout },
  ionViewWillEnter(){
    this.initialize()
  },
  mounted() {
    this.initialize()
  },
  data:() => ({
    data: {},
  }),
  methods: {
    initialize(){
        this.data = this.$store.getters.user
        this.data.password = null
        this.data.image = this.splitImage(this.data.image)
        console.log(this.data)
    },
    splitImage(image) {
        if(image){
            var img = (image || "").split("/")
            return "https://sonrey-cafe.thesis-back.online/images/" + img[img.length - 1]
        }
    },
    updateUser(updatedInfo){
        this.$axios.post('/user/client/register',updatedInfo).then((data) => {
            console.log(data)
        }) 
    },
    async takePhoto(){
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64,
        });

        this.data.image ="data:image/jpeg;base64," + image.base64String;
    },
  },
}
</script>
<style scoped>
ion-label {
    font-family: 'AbhayaLibre-ExtraBold' !important;
    font-size: 32px !important;
    --color: #5D5D5D !important;
}
.profile_pic_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
/* ion-img.profile_pic { */
.profile_pic {
    background: white;
    border-radius: 150px;
    height: 230px;
    width: 230px;
}
/* ion-button {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 18px;
    --background: #1C2546;
    --border-radius: 10px;
    height: 55px;
    width: 75%;
    font-size: 26px;
} */
.profile_pic_container ion-button {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 16px;
    --background: #1C2546;
    --border-radius: 20px;
}
ion-item {
    padding: 0;
    --padding-start: 0;
}
.user_name ion-input {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 24px;
    --color: #000;
    --padding-bottom: 0;
}
.user_username ion-input {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 24px;
    --color: #000;
    --padding-bottom: 0;
    text-decoration: underline;
}
.user_email ion-input,
.user_contact ion-input,
.user_pass ion-input {
    --background: #fff;
    color: #000;
    --padding-start: 8px;
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 22px;
    border-radius: 16px;
    margin: 5px 0;
    --padding-bottom: 5px;
    --padding-top: 5px;
}
ion-row:last-child {
    margin-top: 30px;
}
.btn-save {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 18px;
    --background: #1C2546;
    --border-radius: 20px;
    height: 55px;
    width: 50%;
    font-size: 26px;
}
</style>

<style>
#profile_pic img{
    height: 100% !important;
    width: 100% !important;
    border-radius: 150px !important;
    object-fit: fill;
}
</style>