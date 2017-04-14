export const updateFirstVideoPlay = function({ dispatch }, newFirstVideoPlay) {
    dispatch('updateFirstVideoPlay', newFirstVideoPlay);
}
export const updateFirstClassTab = function({ dispatch }, newFirstClassTab) {
    dispatch("updateFirstClassTab", newFirstClassTab);
}
export const updateSecondClassTab = function({ dispatch }, newSecondClassTab) {
    dispatch("updateSecondClassTab", newSecondClassTab);
}
export const updateClassTabList = function({ dispatch }, newClassTabList) {
    dispatch("updateClassTabList", newClassTabList);
}
export const updateLastPicList = function({ dispatch }, newLastPicList) {
    dispatch("updateLastPicList", newLastPicList);
}
export const updateIsMainLayout = function({ dispatch }, newIsMainLayout) {
    dispatch("updateIsMainLayout", newIsMainLayout);
}
export const updateScaleImgUrl = function({ dispatch }, newScaleImgUrl) {
    dispatch("updateScaleImgUrl", newScaleImgUrl);
}
export const updateLastStore = function({ dispatch }, newLastStore) {
    dispatch("updateLastStore", newLastStore);
}

