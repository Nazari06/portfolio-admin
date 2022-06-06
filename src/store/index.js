import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import * as state from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})