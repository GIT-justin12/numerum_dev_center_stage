class NewsService {
    private static readonly LANGUAGE: string = "fr"
    private static readonly SUBJECT: string = "Technology"
    private static readonly PAGE_SIZE: number = 10
    private static readonly API_KEY: string = import.meta.env.GNEWS_API_KEY;
    
    
    static getNews = async () => {
        const apiUrl = `https://gnews.io/api/v4/search?q=${this.SUBJECT}&lang=${this.LANGUAGE}&max=${this.PAGE_SIZE}&apikey=${this.API_KEY}`;
        //const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${this.API_KEY}`;

        try {
            const response = await fetch(apiUrl);
            console.log(response)
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`)
            }

            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }
}


export default NewsService