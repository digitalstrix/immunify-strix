export const getSelectedChildName = (state) => {
  const firstName = state.myChildren.selectedChildAllInfo?.firstName ?? "";
  const lastName = state.myChildren.selectedChildAllInfo?.lastName ?? "";
  return {
    firstName,
    lastName,
    fullName: firstName.concat(" ", lastName),
  };
};
