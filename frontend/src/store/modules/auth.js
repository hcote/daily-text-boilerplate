import axios from 'axios';

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    is_admin: JSON.parse(localStorage.getItem('is_admin')) || false,
};

const getters = {
    isLoggedIn: state => !!state.token,
    isAdmin: state => !!state.is_admin,
    authStatus: state => state.status,
};

const actions = {
    register({commit}, credentials){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ method: "POST", "url": "http://localhost:3000/api/register", "data": credentials, "headers": { "content-type": "application/json" } })
            .then(res => {
                const token = res.data.token
                const is_admin = res.data.is_admin
                localStorage.setItem('token', token)
                localStorage.setItem('is_admin', JSON.stringify(is_admin))
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, is_admin)
                resolve(res)
          })
            .catch(err => {
                commit('auth_error', err)
                localStorage.removeItem('token')
                localStorage.removeItem('is_admin')
                reject(err)
          })
        })
    },

    login({commit}, credentials) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ method: "POST", "url": "http://localhost:3000/api/login", "data": credentials, "headers": { "content-type": "application/json" } })
            .then(res => {
                const token = res.data.token;
                const is_admin = res.data.is_admin;
                localStorage.setItem('token', token);
                localStorage.setItem('is_admin', JSON.stringify(is_admin))
                commit('auth_success', token, is_admin)
                resolve(res)
            })
            .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                localStorage.removeItem('is_admin')
                reject(err)
            })
        })
    },

    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          localStorage.removeItem('is_admin')
          delete axios.defaults.headers.common['Authorization']
          resolve()
          reject()
        })
      },
};

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, is_admin){
        state.status = 'success'
        state.token = token
        state.is_admin = is_admin
    },
    auth_error(state){
        state.status = 'error'
    },
    logout(state){
        state.status = ''
        state.token = ''
        state.is_admin = false
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}