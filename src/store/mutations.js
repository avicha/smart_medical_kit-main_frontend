import * as types from './mutation_types'
export default {
    [types.RECEIVE_ERROR](state, {
        errcode,
        errmsg
    }) {
        console.error(errcode, errmsg);
        alert(errmsg);
    },
}
