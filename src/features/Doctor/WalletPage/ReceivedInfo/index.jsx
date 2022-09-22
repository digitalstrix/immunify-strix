import React from "react";
import Table from "../../../../common/components/Table";

const Index = () => {
  return (
    <div>
      <Table
        title=""
        columns={[
          {
            title: "Avatar",
            field: "imageUrl",
            render: (rowData) => (
              <img
                src={rowData.imageUrl}
                style={{ width: 40, borderRadius: "50%" }}
                alt="avatar"
              />
            ),
          },
          { title: "Name", field: "name" },

          { title: "Date", field: "date", type: "date" },
          {
            title: "Amount",
            field: "amount",
            type: "currency",
            currencySetting: {
              currencyCode: "LKR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            },
          },
        ]}
        data={[
          {
            name: "Mehmet Baran",
            date: "5 May, 2021",
            amount: 300,
            imageUrl:
              "https://i2.wp.com/nofiredrills.com/wp-content/uploads/2016/10/myavatar.png?resize=300%2C300&ssl=1",
          },
          {
            name: "Mehmet",
            date: "5 May, 2021",
            amount: 300,
            imageUrl:
              "https://i2.wp.com/nofiredrills.com/wp-content/uploads/2016/10/myavatar.png?resize=300%2C300&ssl=1",
          },
          {
            name: "Mehmet",
            date: "5 May, 2021",
            amount: 300,
            imageUrl:
              "https://i2.wp.com/nofiredrills.com/wp-content/uploads/2016/10/myavatar.png?resize=300%2C300&ssl=1",
          },
        ]}
      />
    </div>
  );
};

export default Index;
