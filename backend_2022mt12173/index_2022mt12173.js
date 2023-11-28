import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    organization: "org-O3ELWWCvBhpmWt3BYGUndG0Z",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a TestGPT. You can help with all queries",
            },
            ...chats,
        ],
    });

    response.json({
        output: result.data.choices[0].message,
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});