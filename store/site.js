export const state = () => ({
    // hasSession: null,
    // name: null,
    // sessionCode: null,
    // isExpanded: true
    isExhibitNavVisible: true,
})

export const mutations = {
    showExhibitNav(state) {
        state.isExhibitNavVisible = true
    },
    hideExhibitNav(state) {
        state.isExhibitNavVisible = false
    }
    // setName(state, payload) {
    //     state.name = payload;
    // },
    // setSessionCode(state, payload) {
    //     state.sessionCode = payload;
    // },
    // closeMenu(state) {
    //     state.isExpanded = false;
    // },
    // openMenu(state) {
    //     state.isExpanded = true;
    // }
}

export const getters = {
    // hasSession(state) {
    //     if (state.name && state.sessionCode) {
    //         return true
    //     } else {
    //         return false;
    //     }

    // }
}
