export interface Article {
    author: string,
    title: string,
    source: ArticleSource,
    description: string,
    urlToImage: string,
    publishedAt: string,
    content:string,
    url:string
}


export interface ArticleSource {
    name: string,
    id: string
}