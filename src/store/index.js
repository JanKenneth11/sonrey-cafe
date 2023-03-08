import { createStore } from 'vuex';
import axios from '../axios'

const store = createStore({
    state: () => ({
        user: {},
        cart_number: 0,

    }),
    getters: {
        user(state) {
            return state.user;
        },
        cart_number(state) {
            return state.cart_number;
        }
    },
    actions: {
        async updateCartNumber({ commit }) {
            const resp = await axios.get('api/cart/getcart');
            // console.log(resp);
            commit('SET_CART_NUMBER', resp.data ? resp.data.cart_detail.length : 0);
        },
        async updateUser({ commit }) {
            try {
                if (localStorage.getItem("token")) {
                    const response = await axios.get('/api/client/info');
                    commit('SET_USER', response.data)
                    return response.data
                }
            } catch (error) {
                commit('SET_USER', null)
                    // localStorage.removeItem("token");
                localStorage.removeItem("user_type");
            }
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_CART_NUMBER(state, cart_number) {
            state.cart_number = cart_number
        }
    }
});
export default store;