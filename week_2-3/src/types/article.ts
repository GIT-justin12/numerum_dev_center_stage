export interface Articles {
    totalArticles: number,
    articles: Article[]
}


export interface Article {
    id: string,
    title: string,
    description: string,
    content: string,
    image: string,
    publishedAt: string,
    url: string
    source: {
        id: string,
        title: string
    }
    
}