const findObjectValue = (arrayList, value) => {
	let returnValue = null;
	if (arrayList.length > 0) {
		arrayList.map((obj) => {
			if (obj.value == value) {
				returnValue = obj.lable;
			}
		});
		return returnValue;
	} else {
		return null;
	}
};

const navigationParentCategory = [
  { title: "Find a doctor", value: "Find a doctor" },
  { title: "Blog - Parenting", value: "Blog - Parenting" },
  { title: "Blog - Pregnancy", value: "Blog - Pregnancy" },
  { title: "Blog - Early childhood care", value: "Blog - Early childhood care" },
  { title: "Add child", value: "Add child" },
];

const navigationDoctorCategory = [
  { title: "My patients", value: "My patients" },
  { title: "My appoinments", value: "My appoinments" },
  { title: "Consulation plan", value: "Consulation plan" },
  { title: "Scan and vaccinate", value: "Scan and vaccinate" },
  { title: "Manage events", value: "Manage events" },
  { title: "Profile", value: "Profile" }
];

module.exports = {
	findObjectValue,
	navigationParentCategory,
	navigationDoctorCategory,
};