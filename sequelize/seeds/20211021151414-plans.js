"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "plans",
      [
        {
          id: "269a27f2-6006-445d-af03-b9c524556c9a",
          preapprovalPlanId: "teste",
          collectorId: 0,
          applicationId: 0,
          reason: "Teste Gratuito",
          status: "active",
          initPoint: "teste",
          frequency: 15,
          frequencyType: "days",
          transactionAmount: 0,
          currencyId: "BRL",
          type: "professional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
          preapprovalPlanId: "2c9380847b629308017bdb9d01655e5d",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Básico Mensal",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629308017bdb9d01655e5d",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 49.9,
          currencyId: "BRL",
          type: "basic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          preapprovalPlanId: "2c9380847b629336017bdb9d9f195f79",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Profissional Mensal",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629336017bdb9d9f195f79",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          currencyId: "BRL",
          type: "professional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "206a3f77-c860-441c-a0e9-f284051e7078",
          preapprovalPlanId: "2c9380847b62931d017bdb9e23cc5ed5",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Básico Semestral",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b62931d017bdb9e23cc5ed5",
          frequency: 6,
          frequencyType: "months",
          transactionAmount: 274.45,
          currencyId: "BRL",
          type: "basic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "74c48c24-1a46-4893-b4de-a258ae68f553",
          preapprovalPlanId: "2c9380847b629336017bdb9e7e0c5f7a",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Profissional Semestral",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629336017bdb9e7e0c5f7a",
          frequency: 6,
          frequencyType: "months",
          transactionAmount: 549.45,
          currencyId: "BRL",
          type: "professional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c8780847-76a4-4db4-91bf-7e8af0dda6a7",
          preapprovalPlanId: "2c9380847b62931d017bdb9eea105ed6",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Básico Anual",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b62931d017bdb9eea105ed6",
          frequency: 12,
          frequencyType: "months",
          transactionAmount: 499,
          currencyId: "BRL",
          type: "basic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "565fb5a9-b1e6-4195-bbc1-aff10cccf4db",
          preapprovalPlanId: "2c9380847b629308017bdb9f3d5e5e5e",
          collectorId: 139586911,
          applicationId: 416943132752098,
          reason: "Iustitia Profissional Anual",
          status: "active",
          initPoint:
            "https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629308017bdb9f3d5e5e5e",
          frequency: 12,
          frequencyType: "months",
          transactionAmount: 999,
          currencyId: "BRL",
          type: "professional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("plans", null, {});
  },
};