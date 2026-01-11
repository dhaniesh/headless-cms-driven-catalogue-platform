import express, { Request, Response } from "express";
import "dotenv/config"
import { string } from "zod";

const app = express();
const PORT = 3000;
const contentful_base_url = `https://cdn.contentful.com/spaces/${process.env.CF_SPACE_ID}/environments/${process.env.CF_ENV_ID}/entries?`;

app.get("/catalogue", async (req: Request, res: Response) => {
    const header = {
        "Authorization": `Bearer ${process.env.CF_DELIVERY_API_KEY}`
    }
    const contentful_catalogue_url = contentful_base_url + new URLSearchParams({
        content_type: "product"
    })
    // res.send(contentful_catalogue_url)
    const response = await fetch(contentful_catalogue_url, {
        method: "GET",
        headers: header
    })
    const result = await response.json()
    res.send(result)
})

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})