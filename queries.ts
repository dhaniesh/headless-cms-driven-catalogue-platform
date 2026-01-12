export const catalogue_query = `query {
    productCollection({category_in: ["${category}"]}){
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
    categoryColleciton: productCollection{
        items{
            category
        }
    }
}`