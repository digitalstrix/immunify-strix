export const selectVaccines = (state) => state.tradenames.vaccines;
export const selectManufacturers = (state) => state.tradenames.manufacuturers;
export const selectUserId = (state) => state.user.user.personId;
export const selectTradenames = (state) => state.tradenames.tradenames;
export const selectTradenameAddStatus = (state) => state.tradenames.tradenamesAddingStatus;
export const selectPendingTradenames = (state) => state.tradenames.pendingTradenames;
export const selectPendingTradenameLoadingStatus = (state) => state.tradenames.pendingTradenamesLoadingStatus;
export const selectTradenameDeletingStatus = (state) => state.tradenames.tradenameDeletingStatus;
export const selectTradenameApproveStatus = (state) => state.tradenames.tradenameApproveStatus;
export const selectTradenameRejectStatus = (state) => state.tradenames.tradenameRejectStatus;