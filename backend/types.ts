import { z } from "zod"

export const productSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
        url: z.string()
    }),
    category: z.string()
})

export const productCollectionSchema = z.object({
    data: z.object({
        productCollection: z.object({
            items: z.array(productSchema)
        })
    })
});

export const categorySchema = z.object({
    category: z.string()
})

export const categoryCollectionSchema = z.object({
    data: z.object({
        categoryCollection: z.object({
            items: z.array(categorySchema)
        })
    })
});
