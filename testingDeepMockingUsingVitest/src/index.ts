import express from "express";
import { z } from "zod";
import { prismaClient } from "./db"

export const app = express();
app.use(express.json());


const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

// change to database create function reverse parameter value to
// which r not supposed to set and run test
// testcase will passed for preventing this case we set spy vitest provide
//data: {
 //   a: parsedResponse.data.b,
 //       b: parsedResponse.data.a,
//}

// @ts-ignore
app.post("/sum", async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    const response=await prismaClient.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: answer
        }
    })
    res.json({
        answer,
        'id':response.id
    })
});


// @ts-ignore
app.get("/sum", async (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;

    const response=await prismaClient.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: answer
        }
    })
    res.json({
        answer,
        'id':response.id
    })
});

