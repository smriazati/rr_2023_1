export const state = () => ({
    activeStory: null,
    viewedStories: [],
    panAnimComplete: false,
    visitedOnce: false,
    isFlyoverCompleted: false
})

export const mutations = {
    setActiveStory(state, payload) {
        state.activeStory = payload;
        if (!state.viewedStories.includes(payload)) {
            state.viewedStories.push(payload);
        }
    },
    resetActiveStory(state) {
        state.activeStory = null;
    },
    setPanAnimComplete(state) {
        state.panAnimComplete = true
    },
    resetPanAnimComplete(state) {
        state.panAnimComplete = false
    },
    setFirstVisit(state) {
        state.visitedOnce = true;
    },
    setFlyoverComplete(state) {
        state.isFlyoverCompleted = true;
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
