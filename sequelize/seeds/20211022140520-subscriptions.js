"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "subscriptions",
      [
        {
          id: "458a4fbf-beae-4311-a2f9-81a77aad4adf",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c463f80e-eb21-4b06-a6f0-af78b595a9c0",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fdcd1092-77e1-4bcd-b291-314878622d3d",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "975bbdbb-77f6-48dc-b878-326369a6449b",
          reason: "Iustitia Básico Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 49.9,
          status: true,
          type: "basic",
          planId: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
          userId: "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6e13bdb0-4eff-434c-b3c3-946359002889",
          reason: "Iustitia Básico Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 49.9,
          status: true,
          type: "basic",
          planId: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
          userId: "b5ad793e-798f-4f55-8c7f-e3ac4a89e8b0",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3f85de53-a4bc-41d3-b2b8-5f4f87a40ae8",
          reason: "Iustitia Básico Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 49.9,
          status: true,
          type: "basic",
          planId: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
          userId: "0772b5bd-a385-40bb-99b6-6c41838167cc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subscriptions", null, {});
  },
};
