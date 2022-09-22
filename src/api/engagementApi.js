import { createAPIClient } from "./apiHeaderEngagement";

const BASE_URL = process.env.REACT_APP_USER_ENGUAGEMENT_API_URI;
console.log(BASE_URL);
const engagementClient = createAPIClient(BASE_URL);

const EngagementApi = {
	getSentEmails: (data) => engagementClient.doPost('/enguagement/get/sent-notification-email', data),
	getSentNotifications: (data) => engagementClient.doPost('/enguagement/get/sent-notification-email', data),
	getDraftNotifications: (data) => engagementClient.doPost('/enguagement/get/draft-notification-email', data),
	getDraftEmails: (data) => engagementClient.doPost('/enguagement/get/draft-notification-email', data),
    getCountries: () => engagementClient.goGet('/enguagement/countries'),
	getSearchUsers: (data) => engagementClient.doPost('/enguagement/search-user', data),

	sendForTesting: (data) => engagementClient.doPost('/enguagement/test-notification', data),
    sendToAll: (data) => engagementClient.doPost2('/enguagement/all-notification', data),
	sendToAllCountry: (data) => engagementClient.doPost2('/enguagement/all-notification-country', data),
	sendToParent: (data) => engagementClient.doPost2('/enguagement/parent-notification', data),
	draftMessages: (data) => engagementClient.doPost('/enguagement/draft', data),
	updateDraft: (data) => engagementClient.doPatch('/enguagement/draft', data),
	deletMessage: (data) => engagementClient.doPost('/enguagement/delete/email-notification', data),
	uploadImages: (data) => engagementClient.doPost3('/enguagement/upload-get-url', data),
	singleMessage: (data) => engagementClient.doPost('/enguagement/individual-notification', data),

};

export default EngagementApi;