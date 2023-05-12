<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="11" class="header">
                    <ion-item lines="none" class="header-title-wrapper no-bg">
                        <ion-img slot="start" src="assets/img/order-icon.png" class="ion-no-margin icon"/>
                        <p>
                            Cart
                        </p>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top ion-justify-content-center ion-align-items-center">
                <ion-card>
                    <ion-card-content>
                        <table class="table-responsive">
                            <tr>
                                <th style="border-right: 1px solid #000; padding-right: 5px;">
                                    <!-- <ion-checkbox v-model="allSelected" :indeterminate="indeterminated" @click="selectAll()"></ion-checkbox> -->
                                </th>
                                <th colspan="2" class="ion-text-left"><h2 id="label" style="text-align: center">Items</h2></th>
                                <th style="border-right: 1px solid #000;"></th>
                                <th class="ion-text-center"><h2 id="label">Total</h2></th>
                            </tr>
                            <tr v-for="product in products" :key="product.id">
                                <td style="border-right: 1px solid #000; padding-right: 5px;">
                                    <!-- <ion-checkbox v-model="selectedList" @ionChange="addToTempOrder(product)"></ion-checkbox> -->
                                    <ion-button class="ion-no-padding no-ripple btn_" id="removeProd" @click="deleteProduct(product) ">
                                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                    </ion-button>
                                </td>
                                <td colspan="2" style="padding-left: 2px;"><h2 id="label" style="text-align: center">{{product.product.product_name}}</h2></td>
                                <td class="ion-text-right ion-margin-end" style="padding: 0;">
                                    <ion-row class="ion-align-items-center ion-justify-content-between" style="margin-right: 10px;">
                                        <ion-col size="3" class="ion-no-padding">
                                            <ion-button class="ion-no-padding no-ripple btn_" @click="product.quantity > 1 ? updateProductQuantity('minus', product) : deleteProduct(product) ">
                                                <ion-icon slot="icon-only" :icon="remove"></ion-icon>
                                            </ion-button>
                                        </ion-col>
                                        <ion-col size="3" class="ion-no-padding">
                                            <ion-label>{{product.quantity}}</ion-label>
                                        </ion-col>
                                        <ion-col size="3" class="ion-no-padding">
                                            <ion-button class="ion-no-padding no-ripple btn_" @click="updateProductQuantity('add', product)">
                                                <ion-icon slot="icon-only" :icon="add"></ion-icon>
                                            </ion-button>
                                        </ion-col>
                                    </ion-row>
                                </td>
                                <td class="ion-text-center"><h2 id="label" style="text-align: center">{{product.total}}.00</h2></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="3" class="ion-text-center" style="border-right: 1px solid #000;"><h2 id="label">Total Amount</h2></td>
                                <td class="ion-text-center"><h2 id="label">{{ cart_details.cart_total ? cart_details.cart_total + '.00' : 0 }}</h2></td>
                                <!-- <td class="ion-text-center"><h2 id="label">{{ total }}.00</h2></td> -->
                            </tr>
                        </table>
                    </ion-card-content>
                </ion-card>
                <ion-item id="note-wrapper">
                    <ion-label style="margin:0">Note</ion-label>
                </ion-item>
                <ion-item id="note-wrapper">
                    <ion-textarea placeholder="Type something here" :auto-grow="true" value="" v-model="note">
                    </ion-textarea>
                </ion-item>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-margin-start ion-margin-end">
                <ion-col size="6">
                    <ion-button class="back-btn_" expand="block" @click="gotoOrder">Back</ion-button>
                </ion-col>
                <ion-col size="6">
                    <ion-button class="ok-btn" expand="block" :disabled="disablebtn" @click="orderConfirmation">Ok</ion-button>
                    
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {IonGrid, IonRow, IonCol, IonItem, IonImg, IonButton, IonCard, IonCardContent, IonTextarea, /* IonCheckbox */ IonIcon, IonLabel, alertController} from '@ionic/vue'
import {close, add, remove, trash} from 'ionicons/icons'
import BaseLayout from '../components/BaseLayout.vue'
export default {
    components: {
        IonGrid, IonRow, IonCol, IonItem, IonImg, IonButton, IonCard, IonCardContent,IonTextarea, /* IonCheckbox */ IonIcon, IonLabel,
        BaseLayout
    },
    ionViewDidEnter() {
        this.initialize()
    },
    mounted() {
        this.initialize()
    },
    computed : {
        cart_number () {
            return this.$store.getters.cart_number
        }
    },
    data:() => ({
        close,
        add,
        remove,
        trash,
        temp_orders: [],
        products: {},
        adminInfo: {},
        cart_details: [],
        selectedList: [],
        to_order: false,
        allSelected: false,
        indeterminated: false,
        disablebtn: false,
        note: '',
        total: 0,
        cnt: 0,
        btnOrder: false,
    }),
    methods: {
        initialize() {
            this.$axios.get('/api/cart/getcart').then((data) => {
                this.products = data.data.cart_detail
                this.cart_details = data.data
                this.disablebtn = data.data.cart_detail.length ? false : true
            })
            this.$axios.get('/api/admininfo').then(({data})=> {
            this.adminInfo = data;
            this.adminInfo.ref = this.generateReferenceID(10);
            // console.log(this.adminInfo)
            });
        },
        orderConfirmation(){
            const thiss = this
            return alertController
            .create({
            header: 'Payment Method',
            subHeader: `This order will be valid after payment was recieved by the admin. This is also a noncancellable order`,
            message: `
                <span>Payment will be only made via Gcash app by entering the following:</span>
                <ul>
                    <li><strong>Gcash Account</strong>: `+ (thiss.adminInfo.gcash_name ?  thiss.adminInfo.gcash_name : 'admin')+`</li>
                    <li><strong>Gcash Number</strong>: `+thiss.adminInfo.gcash_number+`</li>
                    <li><strong>Order Reference</strong>: `+thiss.adminInfo.ref+`</li>
                </ul>
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
                    handler: () => {
                        
                        this.data = {
                            order_ref: thiss.adminInfo.ref,
                            cart_total: this.cart_details.cart_total,
                            cart_id: this.cart_details.id,
                            cart_order: this.products,
                            note: this.note
                            // cart_order: this.temp_orders
                        }
                        if(!this.btnOrder){
                            this.addOrder(thiss.data);
                            this.btnOrder = true;
                        }
                    },
                }
            ],
            })
            .then(a => a.present())
        },
        addOrder(order_details) {
            
            this.$axios.post('/api/order/addorder', order_details).then(() => {
                this.temp_orders = [];
                this.total = 0;
                this.initialize();
                this.allSelected = false;
                this.$router.push('/receipt')
                this.successNotify("Order created. Waiting for payment");
            })
        },
        addToTempOrder(cart){
            if(cart.to_order){
                this.temp_orders.push({
                    "quantity" : cart.quantity,
                    "product_id" : cart.product_id,
                    "total" : cart.product.price * cart.quantity
                });
                this.total += (cart.quantity * cart.product.price)
                this.cnt += 1;
            } 
            else{
                let index = this.temp_orders.findIndex(order => order.product_id == cart.product_id)
                this.temp_orders.splice(index, 1)
                this.total -= (cart.quantity * cart.product.price);
                this.cnt -= 1;
            }
            
            if (this.cnt > 0 && this.cnt < this.cart_number) {
                // One item is selected among all checkbox elements
                this.indeterminated = true;
                this.allSelected = false;
            } else if (this.cnt == this.cart_number) {
                // All item selected
                this.allSelected = true;
                this.indeterminated = false;
            } else {
                // No item is selected
                this.indeterminated = false;
                this.allSelected = false;
            }
        },
        generateReferenceID(length) {
            var result = [];
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            return result.join('');
        },
        selectAll() {
            setTimeout(()=>{
                this.products.forEach(product => {
                    product.to_order = this.allSelected;
                });
            });
        },
        deleteProduct(product) {
            var data = {
                cart_id: product.cart_id,
                product_id: product.product_id,
                total: product.total
            }
            this.$axios.post('/api/cart_detail/deleteproduct', data).then(() => {
                this.initialize()
                this.successNotify('Product deleted')
                this.$store.dispatch('updateCartNumber');
            })
        },
        updateProductQuantity(type, item) {
            var data = {};
            if (type == 'add') {
                data = {
                    cart_id: item.cart_id,
                    old_total: item.total,
                    price: item.product.price,
                    product_id: item.product_id,
                    quantity: item.quantity + 1,
                    total: item.product.price * (item.quantity + 1),
                }
            } else {
                data = {
                    cart_id: item.cart_id,
                    old_total: item.total,
                    price: item.product.price,
                    product_id: item.product_id,
                    quantity: item.quantity - 1,
                    total: item.product.price * (item.quantity - 1),
                }
            }
            this.$axios.post('/api/cart_detail/updatecart', data).then(() => {
                this.successNotify('Product quantity updated')
                this.initialize()
            })
        },
        gotoOrder() {
            this.$router.push('/order')
        }
    },
}
</script>
<style scoped>
ion-grid {
    height: -webkit-fill-available;
}
ion-label {
    --color: #000 !important;
}
ion-card {
    --background: #fff;
    color: #000;
    margin-top: 0;
    box-shadow: 2px 4px 1px 0px rgb(0 0 0 / 10%);
    width: 100%;
}
table {
    width: 100%;
}
tr td {
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
    padding: 0 16px;
    /* padding: 0 35px; */
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
#removeProd {
    font-size: 11px !important;
}
.btn_ {
    font-size: 12px;
    --background: transparent;
    --box-shadow: 0;
    color: #000;
    --background-focused-opacity: 0;
    --background-hover-opacity: 0;
    --margin-end: 0;
    --margin-top: 0;
}

.back-btn_ {
    --background: #A22525;
    --border-style: solid;
    --border-color: #000;
    --border-width: 1px;
}

.ok-btn {
    --background: #107707;
    --border-style: solid;
    --border-color: #000;
    --border-width: 1px;
}
.back-btn_, .ok-btn {
    font-family: 'AbhayaLibre-SemiBold';
    font-size: 24px;
    --border-radius: 30px;
    height: 45px;
}

.total-wrapper *, #label{
    font-size: 20px;
}
#note-wrapper{
    width: 100%;
    margin: 0 10px;
}
.textarea-wrapper textarea{
    --padding: 0 !important;
}
</style>