export const catalogueQuery = (category: string | null) => `query {
    productCollection(where: {category_contains:${category ? `"${category}"` : '""'}}){
        items{
            title
            description
            image {
                url
            }
            category
        }
    }
}`

export const category_query = `query {
    categoryCollection: productCollection{
        items{
            category
        }
    }
}`