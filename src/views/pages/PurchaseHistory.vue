<template>
    <base-layout>
        <ion-grid class="ion-margin-top">
            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="11" class="header">
                    <ion-item lines="none" class="header-title-wrapper no-bg">
                        <ion-img slot="start" src="assets/img/calendar-icon.png" class="ion-no-margin icon"/>
                        <p>
                            Purchase History
                        </p>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top ion-margin-start ion-margin-end ion-justify-content-center ion-align-items-center">
                <ion-accordion-group>
                    <ion-accordion toggle-icon-slot="start" class="ion-margin-bottom">
                        <ion-item slot="header">Rf. ID: ABC123DE45</ion-item>
                        <div slot="content" class="acc_content">
                            <table>
                                <tr>
                                    <th colspan="2" class="ion-text-left">Items</th>
                                    <th style="border-right: 1px solid #000;"></th>
                                    <th class="ion-text-center">Total</th>
                                </tr>
                                <tr>
                                    <td colspan="2">Tesst</td>
                                    <td class="ion-text-right ion-margin-end">1</td>
                                    <td class="ion-text-center">1.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="ion-text-right" style="border-right: 1px solid #000;">Total Amount</td>
                                    <td class="ion-text-center">1.00</td>
                                </tr>
                            </table>
                        </div>
                    </ion-accordion>
                    <ion-accordion toggle-icon-slot="start" class="ion-margin-bottom">
                        <ion-item slot="header">Rf. ID: ABC123DE45</ion-item>
                        <div slot="content" class="acc_content">
                            <table>
                                <tr>
                                    <th colspan="2" class="ion-text-left">Items</th>
                                    <th style="border-right: 1px solid #000;"></th>
                                    <th class="ion-text-center">Total</th>
                                </tr>
                                <tr>
                                    <td colspan="2">Tesst</td>
                                    <td class="ion-text-right ion-margin-end">1</td>
                                    <td class="ion-text-center">1.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="ion-text-right" style="border-right: 1px solid #000;">Total Amount</td>
                                    <td class="ion-text-center">1.00</td>
                                </tr>
                            </table>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>
<script>
import BaseLayout from '../components/BaseLayout.vue'
export default {
  components: { BaseLayout },
}
</script>
<style scoped>

table {
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
    font-size: 32px;
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
</style>