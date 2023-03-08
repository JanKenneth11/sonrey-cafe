<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="11" class="header">
                    <!-- <ion-item lines="none" class="header-title-wrapper no-bg">
                        <ion-img slot="start" src="assets/img/order-icon.png" class="ion-no-margin icon"/>
                        <p>
                            Schedule an Order
                        </p>
                    </ion-item> -->
                    <ion-searchbar animated="true" @ionChange="searchProduct($event)" show-clear-button="always"></ion-searchbar>
                </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top ion-margin-start ion-margin-end row_">
                <ion-col v-for="(product, key) in products" :key="product.id">
                    <ion-item lines="none" class="header-title-wrapper" @click="scrollToCategory(key)">
                        <ion-label>{{key}}</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-grid>
        <div v-for="(product, key) in products" :key="product.id" class="cateogries_ ion-margin-start ion-margin-end" >
            <h1 class="category_name" :id="key">{{key}}</h1>
            <div class="scrolling-wrapper">
                <div v-for="data in product" :key="data.id" class="card_ ion-text-center">
                    <ion-card>
                        <ion-card-content :class="{not_availble: !data.status}">
                            <ion-img style="pointer-events:none; max-height: 100%; height: 150px; width: 150px;" :src="data.image ? splitImage(data.image) : 'assets/img/no_image_available.png'"></ion-img>
                            <h2>{{data.product_name}}</h2>
                            <h3>₱{{data.price}}.00</h3>
                            <ion-button :disabled="data.status == 0 ? true : false" class="btn_order" @click="addOrder(data)">Order</ion-button>
                        </ion-card-content>
                    </ion-card>
                </div>
            </div>
        </div>
    </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue'
import {IonGrid, IonRow, IonCol, IonImg, IonItem, IonCard, IonCardContent, IonLabel, IonSearchbar, IonButton, modalController} from '@ionic/vue';
import ProductModal from '../components/ProductModal.vue';

export default {
  components: { BaseLayout, IonGrid, IonRow, IonCol, IonImg, IonItem, IonCard, IonCardContent, IonLabel, IonSearchbar, IonButton },
  setup() {
    const slideOpts = {
        slidesPerView: 'auto',
        zoom: false,
        grabCursor: true
    };
    return {slideOpts}
  },
  ionViewWillEnter() {
    this.initialize();
  },
  mounted() {
    this.initialize();
  },
  data:() => ({
    products: [],
  }),
  methods: {
        initialize($event = null) {
            console.log($event)
            this.$axios.get('/api/product/getproducts').then((data) => {
                this.products = data.data;
                console.log(data.data);
            })
        },
        splitImage(image) {
            if(image){
                var img = (image || "").split("/")
                return "https://sonrey-cafe.thesis-back.online/images/" + img[img.length - 1]
            }
        },
        searchProduct(product) {
            this.$axios.post('/api/product/searchprodapp', {name: product.detail.value}).then((data) => {
                this.products = data.data;
                console.log(data.data);
            })
        },
        async addOrder(product) {
            const modal = await modalController.create({
                    component: ProductModal,
                    componentProps: {
                        product: {
                            id: product.id,
                            name: product.product_name,
                            image: product.image,
                            price: product.price
                        },
                        // adminInfo: this.adminInfo
                    }
                });
                modal.onDidDismiss().then((result) => {
                    result
                });
                return modal.present();
            },
            clear(){
            this.initialize();
        },
        scrollToCategory(element) {
            let yOffset = document.getElementById(element);
            yOffset.scrollIntoView()
        },
    },
}
</script>
<style scoped>
ion-label {
    --color: #000 !important;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.card_ {
    display: inline-block;
}
.card_ h2 {
    font-family: 'AbhayaLibre-SemiBold';
    font-size: 18px;
    color: #000;
    margin: 0;
    margin-top: 10px;
}
.card_ h3 {
    font-family: 'AbhayaLibre-SemiBold';
    font-size: 18px;
    color: #000;
    margin: -6px;
    margin-bottom: 5px;
}
ion-card {
    --background: #fff;
    border: 1.5px solid black;
}
.category_name {
    margin: 0 10px;
    color: #494848;
    font-family: 'AbhayaLibre-ExtraBold';
}
.btn_order {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 18px;
    --background: #1C2546;
    --border-radius: 20px;
}
ion-searchbar {
    --background: #fff;
    --color: #000;
    --placeholder-color: #000;
    --placeholder-opacity: 0.8;
    --border-radius: 5px;
    --icon-color: #000;
    padding: 0;
}
.row_ {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}
.not_availble::before {
    content: 'not available';
    color: white;
    text-align: center;
    background: #e61c1c;
    border-radius: 18px;
    font-size: 18px;
    padding: 3px 15px;
    position: absolute;
    left: 50%;
    top: 7%;
    transform: translate(-50%, 0%);
}
</style>