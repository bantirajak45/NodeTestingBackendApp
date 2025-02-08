import express from "express";
import zod from "zod";

export const app = express();
app.use(express.json());

const inputValidate=zod.object({
    a:zod.number(),
    b:zod.number(),
})

// @ts-ignore
app.post("/sum", (req, res) => {
    const parsedResponse = inputValidate.safeParse(req.body);

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json({
        answer
    });
});

// @ts-ignore
app.get("/sum", (req, res) => {
    const parsedResponse = inputValidate.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json({
        answer
    })
});
