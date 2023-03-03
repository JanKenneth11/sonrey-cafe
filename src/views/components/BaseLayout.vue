<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-avatar slot="start" @click="goToProductPage">
                    <ion-img src="assets/img/logo.png"/>
                </ion-avatar>
                <ion-button slot="end" fill="clear" class="btn_cart no-ripple" @click="goToCartPage">
                    <ion-icon slot="icon-only" :icon="cart"></ion-icon>
                    <ion-badge color="warning" v-if="cart_number"><span>{{cart_number}}</span></ion-badge>
                </ion-button>
                <ion-button slot="end" fill="clear" class="btn_menu no-ripple" @click="openMenu">
                <!-- <ion-button slot="end" fill="clear" class="no-ripple" :class="{menuToggle: !displayHide}" @click="openMenu"> -->
                    <ion-icon slot="icon-only" :icon="menu"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonAvatar, IonImg, IonBadge, IonButton, IonIcon, IonContent,  menuController} from '@ionic/vue';
import { menu, cart, } from 'ionicons/icons';
export default {
    props: [
    ],
    components: {
        IonPage, IonHeader, IonToolbar, IonAvatar, IonImg, IonBadge, IonButton, IonIcon, IonContent, 
    },
    data:() => ({
        menu, cart,
    }),
    computed : {
        cart_number () {
            return this.$store.getters.cart_number
        }
    },
    methods: {
        openMenu(){
            menuController.open('main-menu');
        },
        goToProductPage() {
            this.$router.push('/order')
        },
        goToCartPage() {
            this.$router.push('/review')
        }
    },

}
</script>
<style scoped>

ion-header {
    z-index: 0;
}
ion-toolbar {
    --background:#FFCA40;
    padding: 0 8px;
}

ion-avatar {
    height: 100px;
    width: 100px;
}

ion-icon {
    font-size: 36px !important;
    color: #000;
}

ion-content {
    --background:#FFEBB9;
}
.menuToggle {
    display: none;
}
.btn_cart {
    --padding-end: 0;
}
.btn_menu {
    --padding-start: 0;
}
ion-badge {
    position: absolute;
    border-radius: 50px;
    bottom: 0px;
    left: -5px;
    border: 2px solid #000;
}
ion-badge span {
    font-size: 12px;
    padding: 3px;
}
</style>