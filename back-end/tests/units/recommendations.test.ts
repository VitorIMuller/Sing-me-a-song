import { recommendationService } from "./../../src/services/recommendationsService.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationData } from "../factories/factories.js";
import { conflictError } from "../../src/utils/errorUtils.js";

const agent = supertest(app);

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe("POST - /recommendations", () => {
    it("should answer with status 409", async () => {
        const recommendation = recommendationData(0);

        jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(
            recommendation
        );

        expect(async () => {
            await recommendationService.insert(recommendation);
        }).rejects.toEqual(conflictError("Recommendations names must be unique"));
    });
});

describe("GET - /recommendations/random", () => {
    it("should answer with throw error - not_found", async () => {
        const random = 0.6;

        jest.spyOn(global.Math, "random").mockReturnValue(random);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);

        expect(async () => {
            await recommendationService.getRandom();
        }).rejects.toEqual({
            message: "",
            type: "not_found",
        });
    });
});

describe("testing function getScoreFilter()", () => {
    it("should call getByScore with parameter 'gt'", async () => {
        const random = 0.6;

        jest.spyOn(global.Math, "random").mockReturnValueOnce(random);
        const result = recommendationService.getScoreFilter(random);

        expect(result).toEqual("gt");
    });

    it("should call getByScore with parameter 'lte'", async () => {
        const random = 0.8;

        jest.spyOn(global.Math, "random").mockReturnValueOnce(random);
        const result = recommendationService.getScoreFilter(random);

        expect(result).toEqual("lte");
    });
});

describe("testing function getByScore()", () => {
    it("should answer with not null array in the first conditional", async () => {
        const recommendation = recommendationData(12);
        const recommendation2 = recommendationData(3);

        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([
            recommendation,
        ]);

        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([
            recommendation,
            recommendation2,
        ]);

        const returnFunc = await recommendationService.getByScore("gt");

        expect(returnFunc).toEqual([recommendation]);
    });
});

describe("POST - /down vote", () => {
    it("should answer with throw - not_found", async () => {
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

        expect(async () => {
            await recommendationService.downvote(3);
        }).rejects.toEqual({
            message: "",
            type: "not_found",
        });
    });

    it("should called function remove recommendation", async () => {
        const recommendation = recommendationData(-6);

        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(
            recommendation
        );
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(
            recommendation
        );

        const remove = jest
            .spyOn(recommendationRepository, "remove")
            .mockResolvedValueOnce(null);

        await recommendationService.downvote(434);

        expect(remove).toBeCalled();
    });
});

describe("POST - /down vote", () => {
    it("should answer with throw - not_found", async () => {
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

        expect(async () => {
            await recommendationService.upvote(3);
        }).rejects.toEqual({
            message: "",
            type: "not_found",
        });
    });
});