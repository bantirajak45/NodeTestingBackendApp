import {describe, expect, it,vi} from 'vitest';
import request from "supertest";
import { app } from "../index"
import { prismaClient } from "../__mocks__/db"

// u have to explicitly pass every table like here sum table every database crud function to mock db
//like below comment crud function to get rid of u have to use deep mocking we mock everything related db
//vi.mock('../db', () => ({
//    prismaClient: { sum: {
    //        create: vi.fn() ,
            // find: vi.fn() ,
            // findOne: vi.fn() ,
   //     }}
//}));

vi.mock('../db');

// if when response send value to know database working executed by sending some value of db
// that case from test case we have to pass mock value as well using mockResolvedValue()
describe("POST /sum", () => {
    it("should return the sum of two numbers", async () => {

        prismaClient.sum.create.mockResolvedValue({
            id:1,
            a: 1,
            b: 2,
            result:3
        });
        // spy lets spies on function call which do u set here set to sum table create fn
        // for look into parameter value
        vi.spyOn(prismaClient.sum, "create");

        const res = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });

        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data:{
                a: 1,
                b: 2,
                result:3,
            }
        })
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

        prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 1,
            b: 2,
            result: 3
        });

        vi.spyOn(prismaClient.sum, "create");

        const res = await request(app)
            .get("/sum")
            .set({
                a: "1",
                b: "2"
            })
            .send();
            // toHaveBeenCalledWith spies parameter value is correct passed in test case from endpoint
        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data:{
                a: 1,
                b: 2,
                result:3,
            }
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });
    it("should return 411 if no inputs are provided", async () => {
        const res = await request(app)
            .get("/sum").send();
        expect(res.statusCode).toBe(411);
    });
});