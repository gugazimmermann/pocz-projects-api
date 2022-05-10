'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "place_clients",
      [
        {
          personId: "c2d40490-e098-404b-9e90-f333f9d14121",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          personId: "d3e2320d-2da8-44ff-8cc7-65be5a2a5d63",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          personId: "e59e2b6b-a6c6-48db-8620-d97acd49b6c0",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          personId: "4e8c09c1-8f7b-417c-8ac4-69ed3e3f3feb",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          personId: "b5bb4789-e609-4923-918b-2207aa61e8ea",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("place_clients", null, {});
  }
};
