'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "companies",
      [
        {
          id: "a7f307fe-84ed-41c2-8295-9150919d68b1",
          name: "Company Test",
          site: "http://www.test.com",
          site: "company@test.com",
          phone: "(47) 99999-9999",
          zip: "88.301-000",
          address: "Rua Hercílio Luz",
          number: null,
          complement: null,
          neighborhood: "Centro",
          city: "SC",
          comments: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c9d299cd-8138-4469-ace8-b7d9022274cf",
          name: "Company Test 2",
          site: "http://www.test.com",
          site: "company@test.com",
          phone: "(47) 99999-9999",
          zip: "88.301-000",
          address: "Rua Hercílio Luz",
          number: null,
          complement: null,
          neighborhood: "Centro",
          city: "SC",
          comments: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("companies", null, {});
  }
};
