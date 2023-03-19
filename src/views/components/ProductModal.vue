<template>
    <ion-content id="product_modal" force-overscroll="false">
        <ion-grid class="ion-margin-top">
            <!-- <ion-row class="ion-justify-content-center ion-align-items-center ion-margin-bottom">
                <ion-img class="product_modal_img" style="pointer-events:none" :src="product.image ? splitImage(product.image) : 'assets/img/no_image_available.png'" />
            </ion-row> -->
            <ion-row class="ion-justify-content-center ion-align-items-center ion-margin-bottom">
                <img class="product_modal_img" style="pointer-events:none" :src="product.image ? splitImage(product.image) : 'assets/img/no_image_available.png'" />
            </ion-row>

            <ion-row class="ion-justify-content-center ion-align-items-center ion-flex-column ion-margin-bottom" style="flex-direction: column;">
                    <ion-label>{{product.name}}</ion-label>
                    <ion-label>₱{{product.price}}.00</ion-label>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col class="ion-text-center"><ion-label>QTY</ion-label></ion-col>
                <ion-col> 
                    <ion-row class="ion-align-items-center ion-justify-content-evenly">
                        <ion-button class="ion-no-padding btn-custom no-ripple" fill="clear" color="light" :disabled="qty == 1" @click="qty--">
                            <ion-icon slot="icon-only" :icon="removeSharp"></ion-icon>
                        </ion-button>
                        <ion-label class="qty_">{{qty}}</ion-label>
                        <ion-button class="ion-no-padding btn-custom no-ripple" fill="clear" color="light" @click="qty++">
                            <ion-icon slot="icon-only" :icon="addSharp"></ion-icon>
                        </ion-button>
                    </ion-row>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-items-center ion-margin-bottom">
                <ion-button class="btn_place_order" @click="addToCart(product)">Place Order</ion-button>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script>
import {IonContent, IonGrid, IonRow, /* IonImg */ IonLabel, IonCol, IonIcon, IonButton, modalController} from '@ionic/vue';
import { arrowUndoSharp, removeSharp, addSharp } from "ionicons/icons";
export default {
    components: {
        IonContent, IonGrid, IonRow, /* IonImg */ IonLabel, IonCol, IonIcon, IonButton
    },
    props: {
        product: {
            required: true,
            default: {}
        }
    },
    data:() => ({
        arrowUndoSharp,
        removeSharp,
        addSharp,
        qty: 1
    }),
    methods: {
        addToCart(product){
            this.cart = {
                total: product.price * this.qty,
                product_id: product.id,
                quantity: this.qty,
            };
            this.$axios.post('/api/cart/addtocart',this.cart).then(() => {
                this.$store.dispatch('updateCartNumber');
                this.successNotify('Added to cart successfully');
                this.closeModal();
            });
        },
        closeModal() {
            return modalController.dismiss(this.product,'close');
        },
        splitImage(image) {
            if(image){
                var img = (image || "").split("/")
                return "https://sonrey-cafe.thesis-back.online/images/" + img[img.length - 1]
            }
        },
    },
}
</script>
<style scoped>
ion-content {
    --background: #FFEBB9;
    border: 2px solid #000;
}

ion-icon {
    color: #000;
    font-weight: 900;
    font-size: 30px;
}
.product_modal_img {
    /* width: 75%; */
    width: 200px;
    height: auto;
    max-width: 200px;
    max-height: 200px;
}
ion-img.product_modal_img::part(image) {
  border-radius: 10px;
}
ion-label {
    font-size: 32px;
    font-family: 'AbhayaLibre-SemiBold';
    color: #000;
}
.qty_ {
    background: #fff;
    border-radius: 10px;
    padding: 0px 15px;
    border: 1px solid #000;
}
.btn_place_order {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 18px;
    --background: #1C2546;
    --border-radius: 20px;
}
</style>