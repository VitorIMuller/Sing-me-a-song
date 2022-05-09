import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "../src/database.js"

export function recommendationData(score: number): Recommendation {
    return {
        id: 434,
        name: "Vitor",
        youtubeLink: "https://www.youtube.com/watch?v=4fndeDfaWCg&ab_channel=BackstreetBoysVEVO",
        score,
    };
}

export function createInsertRecommendationData() {
    return {
        name: faker.name.firstName(),
        youtubeLink: "https://www.youtube.com/watch?v=4fndeDfaWCg&ab_channel=BackstreetBoysVEVO",
    };
}

export async function createRecommendation() {
    const data = createInsertRecommendationData();

    const recommendation = await prisma.recommendation.create({
        data,
    });

    return recommendation;
}