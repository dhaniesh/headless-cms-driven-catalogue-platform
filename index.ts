import express, { Request, Response } from "express";
import "dotenv/config"
import { catalogueQuery, category_query } from "./queries";
import { categoryCollectionSchema, productCollectionSchema } from "./types";

const app = express();
const PORT = 3000;
const contentful_base_url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CF_SPACE_ID}/environments/${process.env.CF_ENV_ID}`;
const contentful_header = {
    "Authorization": `Bearer ${process.env.CF_DELIVERY_API_KEY}`
}

app.get("/category/", async (req: Request, res: Response) => {
    try {
        const response = await fetch(contentful_base_url, {
            method: "POST",
            headers: contentful_header,
            body: JSON.stringify({ query: category_query, })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = categoryCollectionSchema.parse(await response.json())
        const data = result.data.categoryCollection.items
        res.json(data.map((item) => item.category))

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
})

app.get("/catalogue/", async (req: Request, res: Response) => {
    const { category } = req.query;
    try {
        const response = await fetch(contentful_base_url, {
            method: "POST",
            headers: contentful_header,
            body: JSON.stringify({ query: catalogueQuery(String(category)) })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = productCollectionSchema.parse(await response.json())
        const data = result.data.productCollection.items
        res.json(data.map((item) => {
            return {
                title: item.title,
                description: item.description,
                imageUrl: item.image.url,
                category: item.category
            }
        }))

    } catch (error) {
        console.error('Error fetching catalogue:', error);
        res.status(500).json({ error: 'Failed to fetch catalogue' });
    }
})

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})
