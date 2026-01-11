import express, { Request, Response } from "express";
import "dotenv/config"
import { catalogue_query } from "./queries";

const app = express();
const PORT = 3000;
const contentful_base_url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CF_SPACE_ID}/environments/${process.env.CF_ENV_ID}`;
const contentful_header = {
    "Authorization": `Bearer ${process.env.CF_DELIVERY_API_KEY}`
}

app.get("/catalogue", async (req: Request, res: Response) => {
    const response = await fetch(contentful_base_url, {
        method: "POST",
        headers: contentful_header,
        body: JSON.stringify({query: catalogue_query})
    })
    const result = await response.json()
    res.send(result)
})

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})