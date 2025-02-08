import {describe, expect, it,vi} from 'vitest';
import request from "supertest";
import { app } from "../index"
import { prismaClient } from "../db"

// u have to explicitly pass every table like here sum table every database crud function to mock db
//like below comment crud function to get rid of u have to use deep mocking we mock everything related db
vi.mock('../db', () => ({
    prismaClient: { sum: {
        create: vi.fn() ,
           // find: vi.fn() ,
           // findOne: vi.fn() ,
    }}
}));

describe("POST /sum", () => {
    it("should return the sum of two numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });
        await prismaClient.sum.create({
            data:{
                a:1,
                b:2,
                result:res.body.answer
            }
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });
    it("should return 411 if no inputs are provided", async () => {
        const res = await request(app).post("/sum").send({});
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
    });
});
describe("GET /sum", () => {
    it("should return the sum of two numbers", async () => {
        const res = await request(app)
            .get("/sum")
            .set({
                a: "1",
                b: "2"
            })
            .send();

        await prismaClient.sum.create({
            data:{
                a:1,
                b:2,
                result:res.body.answer
            }
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });
    it("should return 411 if no inputs are provided", async () => {
        const res = await request(app)
            .get("/sum").send();
        expect(res.statusCode).toBe(411);
    });
});