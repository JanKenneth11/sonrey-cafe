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
                    <ion-img src="assets/img/profile.png" class="profile_pic"/>
                    <ion-button>Change Photo</ion-button>
                </ion-col>
                <ion-col size="12">
                    <ion-item class="user_name no-bg" lines="none">
                        <ion-label position="stacked">Name:</ion-label>
                        <ion-input type="text" value="Juan G. Carlo"></ion-input>
                    </ion-item>
                    <ion-item class="user_username no-bg" lines="none">
                        <ion-label position="stacked">Username:</ion-label>
                        <ion-input type="text" maxLenght="11" value="admin@gmail.com"></ion-input>
                    </ion-item>
                    <ion-item class="no-bg" lines="none"></ion-item>
                    <ion-item class="user_email no-bg" lines="none">
                        <ion-label position="stacked">Email:</ion-label>
                        <ion-input type="email" value="carlo@gmail.com"></ion-input>
                    </ion-item>
                    <ion-item class="user_contact no-bg" lines="none">
                        <ion-label position="stacked">Contact Number:</ion-label>
                        <ion-input type="number" maxLenght="11" value="09125122738"></ion-input>
                    </ion-item>
                    <ion-item class="user_pass no-bg" lines="none">
                        <ion-label position="stacked">Password:</ion-label>
                        <ion-input type="password" value="Abcdefghi" style="-webkit-text-security: square;"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <ion-button class="btn-save">Save</ion-button>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {} from '@ionic/vue';
import BaseLayout from '../components/BaseLayout.vue';
export default {
  components: { BaseLayout },
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
ion-img.profile_pic {
    background: white;
    border-radius: 150px;
    padding: 40px;
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