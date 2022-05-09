import { prisma } from "../src/database.js";
import app from "../src/app.js";
import {
    createInsertRecommendationData,
    createRecommendation,
} from "./factories.js";
import supertest from "supertest";

afterEach(async () => {
    await prisma.$disconnect();
});

const truncate = async (table: string) => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table}`);
};

const agent = supertest(app);

describe("POST - /recommendations", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with status code 201", async () => {
        const data = createInsertRecommendationData();

        const res = await agent.post("/recommendations").send(data);
        const recommendations = await prisma.recommendation.findMany();

        expect(res.status).toEqual(201);
        expect(recommendations.length).toEqual(1);
    });
});

describe("POST - /recommendations/upvote && /donwvote", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with status code 201 upvote", async () => {
        const recommendation = await createRecommendation();

        const res = await agent.post(`/recommendations/${recommendation.id}/upvote`);

        const InsertedRecommendations = await prisma.recommendation.findMany();

        expect(res.status).toEqual(200);
        expect(InsertedRecommendations.length).toEqual(1);
        expect(InsertedRecommendations[0].score).toEqual(1);
    });

    it("should answer with status code 201 downvote", async () => {
        const recommendation = await createRecommendation();

        const res = await agent.post(`/recommendations/${recommendation.id}/downvote`);

        const InsertedRecommendations = await prisma.recommendation.findMany();

        expect(res.status).toEqual(200);
        expect(InsertedRecommendations.length).toEqual(1);
        expect(InsertedRecommendations[0].score).toEqual(-1);
    });
});

describe("GET - /recommendations/:id", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with array with one object", async () => {
        const recommendation = await createRecommendation();

        const res = await agent.get(`/recommendations/${recommendation.id}`);

        expect(res.status).toEqual(200);
        expect(res.body).not.toBeNull();
        expect(res.body.id).toEqual(recommendation.id);
    });
});

describe("GET - /recommendations", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with array with one object", async () => {
        const recommendation = await createRecommendation();

        const res = await agent.get(`/recommendations`);

        expect(res.status).toEqual(200);
        expect(res.body).not.toBeNull();
        expect(res.body[0].id).toEqual(recommendation.id);
    });
});

describe("GET - /recommendations/random", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with array with one object", async () => {
        const recommendation = await createRecommendation();

        const res = await agent.get(`/recommendations/random`);

        expect(res.status).toEqual(200);
        expect(res.body).not.toBeNull();
    });
});

describe("GET - /recommendations/random", () => {
    beforeEach(async () => {
        await truncate("recommendations");
    });

    it("should answer with array with one object", async () => {
        const recommendation = await createRecommendation();

        await prisma.recommendation.update({
            where: { id: recommendation.id },
            data: { score: 20 },
        });

        const res = await agent.get(`/recommendations/top/${10}`);

        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});