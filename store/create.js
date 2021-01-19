export const state = () => ({
    isModalFistTimeVisible: true
});

export const mutations = {
    setIsModalFirstTimeVisible(state, isView) {
        state.isModalFistTimeVisible = isView;
    }
};