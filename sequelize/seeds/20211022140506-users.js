"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          email: "gugazimmermann@gmail.com",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          email: "guga@pocz.io",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          email: "contato@touchsistemas.com.br",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "eb07ecc2-fd14-480a-a9a8-354b1918ef93",
          email: "test@test.com.br",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0305aa94-ef0a-4d96-a3b9-ebe54c2947cb",
          email: "test2@test.com.br",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3",
          email: "testinvite@test.com",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b5ad793e-798f-4f55-8c7f-e3ac4a89e8b0",
          email: "testinvite2@test.com",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "b5ad793e-798f-4f55-8c7f-e3ac4a89e8b0",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e4fb93dd-8c72-4cb9-bfc6-7d5f72ac1682",
          email: "testinvite2@test.com",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "b5ad793e-798f-4f55-8c7f-e3ac4a89e8b0",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0772b5bd-a385-40bb-99b6-6c41838167cc",
          email: "testinvite3@test.com",
          password:
            "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "0772b5bd-a385-40bb-99b6-6c41838167cc",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
