export const catalogueQuery = (category: string) => `query {
    productCollection(where: {category_contains: "${category}"}){
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