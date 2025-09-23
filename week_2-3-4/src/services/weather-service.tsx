class WeatherService {
    private static readonly LATITUDE: number = 6.16667
    private static readonly LONGITUDE: number = 1.21667
    private static readonly WEATHER_API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY
    
    static getWeather = async () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.LATITUDE}&lon=${this.LONGITUDE}&appid=${this.WEATHER_API_KEY}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }
}


export default WeatherService