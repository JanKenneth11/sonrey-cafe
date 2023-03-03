<template>
    <base-layout>
    <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-card>
                    <ion-card-content>
                        <table style="width: 100%;">
                            <tr>
                                <th colspan="2" style="text-align: left;">Item Name</th>
                                <th>Total Amount</th>
                            </tr>
                            <tr>
                                <td>Item #1</td>
                                <td>1</td>
                                <th rowspan="4">P 3.00</th>
                            </tr>
                            <tr>
                                <td>Item #2</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Item #3</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Item #3</td>
                                <td>1</td>
                            </tr>
                        </table>
                    </ion-card-content>
                </ion-card>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-items-center" style="flex-direction:column;">
                <ion-button class="btn_ btn_close">Close</ion-button>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import {} from '@ionic/vue'
import BaseLayout from '../components/BaseLayout.vue'
export default {
  components: { BaseLayout },
  ionViewWillEnter() {
    this.initialize();
  },
  mounted() {
    this.initialize();  
  },
  methods: {
    initialize() {
        this.$axios.get('api/order/getorder').then((data) => {
            console.log(data);
        })
    }
  },
}
</script>
<style scoped>
ion-label {
    --color: #000 !important;
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
</style>