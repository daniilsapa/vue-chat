const stocks = [
    {id: 1, name: 'Rolls-Royce', price: '200'},
    {id: 2, name: 'Goggle', price: '467'},
    {id: 3, name: 'Amazon', price: '350'},
    {id: 4, name: 'Microsoft', price: '377'}
];

const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS'(state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        })
    }
};

const actions = {
    buyStock({ commit }, order) {
        commit('BUY_STOCKS', order);
    },
    initStocks({ commit }) {
        commit('SET_STOCKS', stocks)
    },
    randomizeStocks({ commit }) {
        commit('RND_STOCKS', stocks)
    }
};

const getters = {
    stocks(state) {
        return state.stocks
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}