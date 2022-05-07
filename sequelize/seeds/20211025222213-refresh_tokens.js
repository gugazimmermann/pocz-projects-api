"use strict";
const { DateTime } = require("luxon");
const dt = DateTime.now();
const expiryDate = dt.plus({ months: 12 });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "refresh_tokens",
      [
        {
          id: "bc8dc4e1-1300-40c4-81bf-9b04c8d0cfa9",
          token: "8e0b583f-d795-4e92-a536-be7aca304846",
          expiryDate: new Date(),
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9c6b3095-408c-4114-bf41-b97d399c641c",
          token: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17",
          expiryDate: expiryDate.toJSDate(),
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8285376d-960a-4315-8f25-4992ba7790f3",
          token: "147dd632-e372-43ce-bc9e-e5bc37f2cbfb",
          expiryDate: expiryDate.toJSDate(),
          userId: "eb07ecc2-fd14-480a-a9a8-354b1918ef93",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("refresh_tokens", null, {});
  },
};
