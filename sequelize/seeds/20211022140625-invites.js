'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "invites",
      [
        {
          id: "2c8d0893-642f-4c45-89fd-49ab9e15f72a",
          name: "Guerrilla User",
          email: "guga@grr.la",
          code: 651685,
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "165d90a3-356e-4c55-b86b-31d75ab8cd07",
          name: "Guerrilla User 2",
          email: "guga2@grr.la",
          code: 651686,
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3deecee4-80f4-4eff-88bc-cf57492505b9",
          name: "Guerrilla User",
          email: "testeinviteuser@test.com",
          code: 640245,
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "7bf7eae9-472f-4f31-85c5-d760b1c93e2a",
          name: "Guerrilla User",
          email: "guga@grr.la",
          code: 666666,
          userId: "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3",
          tenantId: "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("invites", null, {});
  }
};

