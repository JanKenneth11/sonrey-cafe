<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center first-card-container">
                <ion-col size="11.5">
                    <ion-slides pager="true" :options="slideOpts">
                        <ion-slide>
                            <ion-card>
                                <ion-card-content>
                                    <h1>Announcement</h1>
                                    <h1>New product</h1>
                                    <h1>etc.</h1>
                                </ion-card-content>
                            </ion-card>
                        </ion-slide>
                        <ion-slide>
                            <ion-card>
                                <ion-card-content>
                                    <h1>Announcement</h1>
                                    <h1>New product</h1>
                                    <h1>etc.</h1>
                                </ion-card-content>
                            </ion-card>
                        </ion-slide>
                        <ion-slide>
                            <ion-card>
                                <ion-card-content>
                                    <h1>Announcement</h1>
                                    <h1>New product</h1>
                                    <h1>etc.</h1>
                                </ion-card-content>
                            </ion-card>
                        </ion-slide>
                    </ion-slides>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <ion-col size="11.5">
                    <ion-row class="last-card-container">
                        <ion-col size="6" class="">
                            <ion-card @click="gotoOrder">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-img src="assets/img/order-icon.png"/>
                                        <ion-Label>Order</ion-Label>
                                    </ion-card-title>
                                </ion-card-header>
                            </ion-card>
                        </ion-col>
                        <ion-col size="6">
                            <ion-card @click="gotoHistory">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-img src="assets/img/calendar-icon.png"/>
                                        <ion-Label>Purchase History</ion-Label>
                                    </ion-card-title>
                                </ion-card-header>
                            </ion-card>
                        </ion-col>
                        <ion-col size="6">
                            <ion-card @click="gotoFeedBack">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-img src="assets/img/feedback-icon.png"/>
                                        <ion-Label>Feedback</ion-Label>
                                    </ion-card-title>
                                </ion-card-header>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {IonGrid, IonRow, IonCol, IonSlides, IonSlide, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLabel } from '@ionic/vue';
import BaseLayout from '../components/BaseLayout.vue';
export default {
  components: { IonGrid, IonRow, IonCol, IonSlides, IonSlide, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLabel, BaseLayout },
  setup() {
    const slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop: true,
        // autoplay: true,
    };
    return {slideOpts}
  },
  methods: {
    gotoHistory() {
        this.$router.push("/history");
    },
    gotoOrder() {
        this.$router.push("/order");
    },
    gotoFeedBack() {
        this.$router.push("/feedback");
    }
  },
}
</script>
<style scoped>
.first-card-container ion-card {
    height: inherit;
    width: inherit;
    --background: #fff;
    border-radius: 35px;
}
h1 {
    color: #000;
    font-family: 'AbhayaLibre-ExtraBold';
    margin: 0;
}
.first-card-container ion-card-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.last-card-container ion-card {
    height: 100%;
    width: 100%;
    --background: #fff;
    border-radius: 35px;
    margin: 0;
}

/* ion-card-header {
    height: 100%;
} */

.last-card-container ion-card-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

ion-img {
    width: calc(100%/2);
}

ion-label {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 28px;
    text-transform: capitalize;
    text-align: center;
    color: #000;
}

ion-slides {
    height: 200px;
    --bullet-background: #000000;
    --bullet-background-active: #493500;
}
ion-slide {
    /* background: #fff; */
    color: #000;
    border-radius: 35px;
    height: 98%;
}
</style>