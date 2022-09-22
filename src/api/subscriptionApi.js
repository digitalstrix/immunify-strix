import immSubscriptionInstance from "./immSubscriptionInstance";

export const getMyChildrenServicePlansAsync = async (info) => immSubscriptionInstance.post('/v1/subscription/children-plans', info)
export const getAllChildrenHaveFreeQuater = async (info) => immSubscriptionInstance.post('v1/subscription/get-child-list-have-free-service-quater', info)