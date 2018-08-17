const state = {
    count: 0
}

const getters = {
    count: state => {
      return state.count;
    }
}

const mutations = {
    increment: (state) => {
        const obj = state
        obj.count += 1
    },
    decrement: (state) => {
        const obj = state
        obj.count -= 1
    }
}

export default {
    state,
    getters,
    mutations
};