const state = {
    funds: 10000,
    stocksP: []
};

const mutations = {
    'BUY_STOCKS'(state, {stockId, quantity, stockPrice}) {

        const record = state.stocksP.find(elem => elem.id === stockId);

        if(record){
            record.quantity += Number(quantity);
        }
        else {
            state.stocksP.push({
                id: stockId,
                quantity: Number(quantity)
            })
        }
        state.funds -= stockPrice * quantity;

    },
    'SELL_STOCKS'(state, {stockId, quantity, stockPrice}) {

        const record = state.stocksP.find(elem => elem.id === stockId);

        if(record.quantity > quantity){
            record.quantity -= quantity;
        }
        else {
            state.stocksP.splice(state.stocksP.indexOf(record));
        }
        state.funds += stockPrice * quantity;
    }


};

const actions = {
    sellStock({ commit }, order) {
        commit('SELL_STOCKS', order);
    }
};

const getters = {
    stockPortfolio(state, getters) {
        return state.stocksP.map(stock => {
            const record = getters.stocks.find(elem => {
                return elem.id === stock.id
            });
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        })
    },
    funds(state) {
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}