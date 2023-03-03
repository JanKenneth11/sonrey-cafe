<template>
    <ion-menu side="end" type="overlay" menu-id="main-menu" content-id="main-content">
        <ion-content class="tertiary-bg">
            <ion-grid>
                <ion-row>
                    <ion-col class="menu-header">
                        <ion-item class="no-bg" lines="none">
                            <p>Settings</p>
                            <ion-button slot="end" fill="clear" class="no-ripple ion-no-margin" @click="closeMenu">
                                <ion-icon slot="icon-only" :icon="menu"></ion-icon>
                            </ion-button>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="11">
                        <ion-list class="no-bg">
                            <ion-item class="no-bg" @click="profile">
                                <ion-label>Edit Profile</ion-label>
                            </ion-item>
                            <ion-item class="no-bg" @click="dashboard">
                                <ion-label>Dashboard</ion-label>
                            </ion-item>
                            <ion-item class="no-bg" lines="none" @click="logOut">
                                <ion-label>Logout</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-menu>
</template>
<script>
import {IonMenu, IonContent, IonGrid, IonRow, IonCol, IonItem, IonButton,IonIcon, IonList, IonLabel,  menuController} from '@ionic/vue';
import {menu} from 'ionicons/icons';
export default {
    components: {
        IonMenu, IonContent, IonGrid, IonRow, IonCol, IonItem, IonButton,IonIcon, IonList, IonLabel, 
    },
    data:() => ({
        menu,
    }),
    methods: {
        closeMenu() {
            menuController.close('main-menu');
        },
        logOut() {
            menuController.close('main-menu');
            localStorage.removeItem('token');
            this.$router.push('/login')
        },
        profile(){
            menuController.close('main-menu');
            this.$router.push('/profile')
        },
        dashboard() {
            menuController.close('main-menu');
            this.$router.push('/dashboard')
        }
    },
}
</script>
<style scoped>
ion-menu {
    --width: 45%;
    --background: none;
}

ion-menu::part(backdrop) {
    background-color: transparent;
}

/* ion-content {
    opacity: 0.9;
} */
ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
}

p {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 24px;
    color: #000;
    width: 100%;
    margin: 0.9em 0;
    text-align: center;
}

ion-icon {
    font-size: 36px !important;
    color: #000;
}
.menu-header::after {
    content: '';
    position: absolute;
    left: 5%;
    right: 5%;
    bottom: 0;
    top: auto;
    border: 3px solid grey;
    border-radius: 10px;
}

ion-label {
    font-size: 22px !important;
    font-family: 'AbhayaLibre-ExtraBold' !important;
    color: #000 !important;
    margin: 0
}
</style>