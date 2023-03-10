<template>
    <base-layout>
    <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-card>
                    <ion-card-content>
                        <table style="width: 100%;" id="table-wrapper-reciept">
                            <tr>
                                <th colspan="2" style="text-align: left;"> <h2 id="label">Item Name</h2></th>
                                <th><h2 id="label">Total Amount</h2></th>
                            </tr>
                            <tr v-for="order in latestOrder.order_detail" :key="order.id">
                                <td><h2 id="label">{{ order.product.product_name }}</h2></td>
                                <td><h2 id="label">{{ order.quantity }}</h2></td>
                                <th><h2 id="label">₱ {{ order.total }}.00</h2></th>
                            </tr>
                        </table>
                        <div class="total-wrapper">
                            <h2>Totals:</h2>
                            <h2>₱ {{latestOrder.total}}.00</h2>
                        </div>
                        <hr>
                        <ion-row>
                            <ion-col size="6" style="display: flex; flex-direction: column;">
                                <ion-label>Order Reference:</ion-label>
                                <ion-label>Order Status:</ion-label>
                                <ion-label>Gcash account:</ion-label>
                                <ion-label>Gcash number:</ion-label>
                            </ion-col>
                            <ion-col size="6" style="display: flex; flex-direction: column;">
                                <ion-label>{{ latestOrder.order_ref }}</ion-label>
                                <ion-label :color="status_color[latestOrder.status]">{{ status[latestOrder.status] }}</ion-label>
                                <ion-label>{{ adminInfo.gcash_name }}</ion-label>
                                <ion-label>{{ adminInfo.gcash_number }}</ion-label>
                            </ion-col>
                        </ion-row>
                        <ion-row><h5>Note: This order will be processed once transaction was paid. When sending the payment, please use the reference as message in the Gcash app.</h5></ion-row>
                    </ion-card-content>
                </ion-card>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-items-center" style="flex-direction:column;">
                <ion-button class="btn_ btn_close" @click="goToOrderHistory">Close</ion-button>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {IonCard, IonCardContent, IonRow, IonButton, IonGrid, IonCol, IonLabel, } from '@ionic/vue'
import BaseLayout from '../components/BaseLayout.vue'
export default {
  components: { IonCard, IonCardContent, IonRow, IonButton, IonGrid, IonCol, IonLabel, BaseLayout },
  ionViewWillEnter() {
    this.initialize();
  },
  mounted() {
    this.initialize();  
  },
  data:() => ({
    latestOrder: {},
    adminInfo: {},
    status: [
        'Pending',
        'Processing',
        'Cancelled',
        'Done'
    ],
    status_color: [
        'primary',
        'success',
        'danger',
        '#555550'
    ],
  }),
  methods: {
    initialize() {
        this.$axios.get('/api/order/getorder').then((data) => {
            this.latestOrder = data.data[0]
        })
        this.$axios.get('/api/admininfo').then((data) => {
            this.adminInfo = data.data
        })
    },
    goToOrderHistory() {
        this.$router.push('/history')
    }
  },
}
</script>
<style scoped>
ion-label {
    --color: #000 !important;
    font-size: 15px;
}
ion-card {
    --background: #fff;
    color: #000;
    width: 90%;
}
th {
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 24px;
    /* padding: 0 20px; */
}
td {
    font-family: 'AbhayaLibre-SemiBold';
    font-size: 24px;
}
tr:first-child th:first-of-type, tr td:last-of-type {
    border-right: 1px solid #000;
    font-family: 'AbhayaLibre-ExtraBold';
}
tr:last-child {
    border-bottom: 1px solid #000
}

.btn_close {
--background: #A22525;
--border-style: solid;
--border-color: #000;
--border-width: 1px;
}

.btn_gen_receipt {
    --background: #4A5EA5;
    --border-style: solid;
    --border-color: #000;
    --border-width: 1px;
}

.btn_ {
    font-family: 'AbhayaLibre-SemiBold';
    font-size: 24px;
    --border-radius: 30px;
    height: 45px;
    width: 50%;

}
.total-wrapper{
    display: flex;
    gap: 117px;
}
.total-wrapper *, #label{
    font-size: 22px;
}
.th{
    font-size: 20px;
}
</style>