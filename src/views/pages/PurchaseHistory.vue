<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="11" class="header">
                    <ion-item lines="none" class="header-title-wrapper no-bg">
                        <div  style="display:flex ; width: 100%; justify-content: space-between">
                            <div class="d-flex" style="display:flex;align-items: center;">
                                <ion-img slot="start" src="assets/img/calendar-icon.png" class="ion-no-margin icon" id="title-logo"/>
                                <p>
                                    Purchase History
                                </p>
                            </div>
                            <ion-button class="ion-no-padding no-ripple btn_" @click="showInfo()">
                                <ion-icon slot="icon-only" :icon="information"></ion-icon>
                            </ion-button>
                        </div>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top ion-margin-start ion-margin-end ion-justify-content-center ion-align-items-center">
                <ion-col size="12">
                    <ion-accordion-group v-for="order in orders" :key="order.id">
                        <ion-accordion toggle-icon-slot="start" class="ion-margin-bottom">
                            <ion-item slot="header">Rf. ID: {{order.order_ref}}</ion-item>
                            <div slot="content" class="acc_content">
                                <table style="border-bottom: 1px solid #000;">
                                    <tr>
                                        <th colspan="2" class="ion-text-left">Items</th>
                                        <th style="border-right: 1px solid #000;"></th>
                                        <th class="ion-text-center">Total</th>
                                    </tr>
                                    <tr v-for="item in order.order_detail" :key="item.id">
                                        <td colspan="2">{{item.product.product_name}}</td>
                                        <td class="ion-text-right ion-margin-end">{{item.quantity}}</td>
                                        <td class="ion-text-center">{{ item.total }}.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"></td>
                                        <td class="ion-text-right" style="border-right: 1px solid #000;">Total Amount</td>
                                        <td class="ion-text-center">{{ order.total }}.00</td>
                                    </tr>
                                </table>
                                <ion-row>
                                    <ion-col size="6"><ion-label>Order status:</ion-label></ion-col>
                                    <ion-col size="6"><ion-label :color="status_color[order.status]">{{ status[order.status] }}</ion-label></ion-col>
                                    <ion-col size="6"><ion-label>Order date:</ion-label></ion-col>
                                    <ion-col size="6"><ion-label>{{ convertDate(order.created_at) }}</ion-label></ion-col>
                                </ion-row>
                                <ion-row v-if="order.status == 0">
                                    <ion-button color="danger" expand="block" style="width:100%;" @click="cancelOrder(order.id)">Cancel Order</ion-button>
                                </ion-row>
                            </div>
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import BaseLayout from '../components/BaseLayout.vue'

import {IonGrid, IonRow, IonCol, IonItem, IonImg, IonLabel, IonButton, IonAccordionGroup, IonAccordion, alertController} from '@ionic/vue'
import {information} from 'ionicons/icons'
export default {
  components: { IonGrid, IonRow, IonCol, IonItem, IonImg, IonLabel, IonButton, IonAccordionGroup, IonAccordion, BaseLayout },
  data:() => ({
    information,
    orders: {},
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
  ionViewWillEnter() {
    this.initialize()
  },
  mounted() {
    this.initialize()  
    this.adminInformation()  
  },
  methods: {
    
    initialize(){
        this.$axios.get('/api/order/getorder').then((data) => {
            this.orders = data.data
            console.log(this.orders)
        })
    },
    adminInformation(){
        this.$axios.get('/api/admininfo').then(({data})=> {
            this.adminInfo = data;
             });
    },
    showInfo(){
        const thiss = this
        return alertController
        .create({
        message: `
            <span>Note:</span>
            <br>
            <span>- When sending the payment, please use the reference as message in the Gcash app.</span>
            <br>
            <span>- No deliveries yet, but you can pick up your order on the Sonrey Cafe just present your RF. ID or receipt at the cashier and you can get your order.</span>
            <br>
            <br>
            <span>For more concern please call 
            Mobile no.:
            <br>
            `+ thiss.adminInfo.contact_number +`
        `,
        buttons: [
            {
                text: 'OK',
                handler: () => {},
            }
        ],
        })
        .then(a => a.present())
    },
    cancelOrder(id){
        var data = {
            id: id,
            status: 2
        }
        this.$axios.post('/api/order/update_status',data).then(() => {
            this.successNotify('Order has been cancelled')
            this.initialize()
        })
    }
  },
}
</script>
<style scoped>

table {
    width: 100%;
}
ion-accordion-group {
    width: 100%;
}
ion-accordion {
    background: #fff;
    --background: none;
    border-radius: 12px;
    box-shadow: 2px 4px 1px 0px rgb(0 0 0 / 10%);
}
ion-accordion ion-item {
    --border-width: 0;
    --background: #fff;
    --color: #000;
    --border-radius: 10px;
    font-family: 'AbhayaLibre-ExtraBold';
    font-size: 24px;
}
.acc_content {
    margin: 16px;
    color: black;
}
th {
    border-bottom: 1px solid #000;
}
tr:last-of-type td {
    border-top: 1px solid #000;
}
tr:last-child td,
tr:not(:first-child):not(:last-child) td {
    font-family: 'AbhayaLibre-Regular';
    font-size: 22px;
}
tr:last-child td:not(:first-child):not(:last-child){
    padding: 0 15px;
}
tr:not(:first-child):not(:last-child) td:not(:first-child):not(:last-child) {
    padding: 0 35px;
}
tr:not(:first-child):not(:last-child) td:last-child {
    border-left: 1px solid #000;
}
td:last-child {
    padding: 0 20px;
}
th {
    font-family: 'AbhayaLibre-ExtraBold';
    text-transform: uppercase;
    margin: 5px 0;
    font-size: 24px;
}
th:last-of-type {
    text-transform: capitalize;
}

.btn_{
    margin-left: 15px;
}

#title-logo{
    width: 23px;
}
</style>

<style>
.btn_{
    --background: #ffca40;
    --color: #000;
}
</style>