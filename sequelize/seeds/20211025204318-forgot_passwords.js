"use strict";
const { DateTime } = require("luxon");
const dt = DateTime.now();
const expiryDate = dt.plus({ months: 12 });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "forgot_passwords",
      [
        {
          id: "4a8a0044-bca6-4940-a40d-c90828660e34",
          email: "gugazimmermann@gmail.com",
          code: "1234",
          codeurl: "da549802-a6be-4b87-ba8c-e46632135acf",
          expiryDate: expiryDate.toJSDate(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a277dfdd-fc73-464e-8509-242681311f19",
          email: "test@test.com",
          code: "9876",
          codeurl: "31c5502a-56de-443f-9e67-9aa1be26b294",
          expiryDate: expiryDate.toJSDate(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "51bcc414-33e3-4ee4-8812-8ff08ce76eaa",
          email: "teste-not-found@test.com",
          code: "5678",
          codeurl: "a6659722-4866-4105-a21c-888b1897ae73",
          expiryDate: expiryDate.toJSDate(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5f29d5df-a70e-49ca-83a6-1b51b94ed769",
          email: "gugazimmermann@gmail.com",
          code: "0000",
          codeurl: "0208a9f8-44b3-4b2c-b098-8337a056de16",
          expiryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("forgot_passwords", null, {});
  },
};
