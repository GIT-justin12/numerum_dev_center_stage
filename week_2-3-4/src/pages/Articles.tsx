import { Outlet } from "react-router-dom";
import { ArticlesProvider } from '../context/ArticlesContext';
import { useTheme } from '../context/ThemeContext';

function ArticlesPage() {
  const subject = 'World'
  const language = 'fr'
  const { theme } = useTheme()
  return (
    <ArticlesProvider subject={subject} language={language}>
      <div className="container mx-auto px-4 py-8  min-h-screen">
        {/* Header */}
        <div className={`text-center mb-12  ${ theme ? "text-black" : "text-white"}`}>
          <h1 className={`text-4xl font-bold text-base-content mb-4  ${ theme ? "text-black" : "text-white"}`}>
            Notre Blog sur l'actualité
          </h1>
          <p className={`text-xl text-base-content/70 max-w-2xl mx-auto ${ theme ? "text-black" : "text-white"}`}>
            Découvrez les actualités dans le monde
          </p>
        </div>
        <Outlet />
      </div>
    </ArticlesProvider>
  )
}

export default ArticlesPage
