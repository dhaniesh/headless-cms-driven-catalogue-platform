export const catalogue_query = `query {
    productCollection{
        items{
            title
            description
            image {
                url
            }
        }
    }
}`