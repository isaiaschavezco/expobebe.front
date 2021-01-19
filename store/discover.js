export const state = () => ({
    isModalVideoLibraryVisible: false,
    currentModalVideoLibraryUrl:"https://www.youtube.com/watch?v=-nxsiOlPmmY"
});

export const mutations = {
    setIsModalVideoLibraryVisible(state, isView) {
      console.log("setVideModal")
      state.isModalVideoLibraryVisible = isView;
      console.log("PARECE QUE SI LO METIO",state.isModalVideoLibraryVisible)
    },
    setCurrentModalVideoLibraryUrl(state,url){
      console.log("SETuRL")
      state.currentModalVideoLibraryUrl = url
      console.log(state.currentModalVideoLibraryUrl)
    },
    say(){
    }
};
