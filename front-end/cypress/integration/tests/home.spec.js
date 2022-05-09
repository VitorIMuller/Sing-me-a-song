/// <reference types="cypress" />

import { faker } from "@faker-js/faker"


const name = faker.name.firstName();
const youtubeLink = "https://www.youtube.com/watch?v=GNd0afTplVs&ab_channel=TeddysFanta"
describe("HomePage", () => {

    it("Should Post Video", () => {
        cy.visit("http://localhost:3000");

        cy.request("POST", "http://localhost:5000/recommendations/clear");


        cy.get("input[placeholder$='Name']").type(`${name}`);
        cy.get("input[placeholder$='https://youtu.be/...']").type(`${youtubeLink}`);

        cy.intercept("POST", "http://localhost:5000/recommendations").as(
            "postRecommendation"
        );

        cy.get("#sendLink").click();
        cy.wait("@postRecommendation");

        cy.contains(name);

        cy.get("#upVote").click();
        cy.get("#upVote").click();
        cy.contains("2");

        cy.get("#downVote").click();
        cy.contains("1");

        cy.contains("Top").click();
        cy.url().should("equal", "http://localhost:3000/top");
        cy.contains(name);

        cy.contains("Random").click();
        cy.url().should("equal", "http://localhost:3000/random");
        cy.contains(name);

    })
})