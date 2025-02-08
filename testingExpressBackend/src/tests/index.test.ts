
import request from "supertest";
import { app } from "../index"
import {describe, expect, it} from "@jest/globals";

describe("sum endpoint test/Post", () => {
    it("positive number testcase",async () => {
         const res=await request(app).post("/sum").send({
             a:1,b:2
         })
        expect(res.status).toBe(200)
        expect(res.body.answer).toBe(3)
    })

    it("negative number testcase",async () => {
        const res=await request(app).post("/sum").send({
            a:-1,b:-2
        })
        expect(res.status).toBe(200)
        expect(res.body.answer).toBe(-3)
    })

    it("zero number testcase",async () => {
        const res=await request(app).post("/sum").send({
            a:0,b:0
        })
        expect(res.status).toBe(200)
        expect(res.body.answer).toBe(0)
    })
})