import { Outlet } from "react-router-dom";
import { ArticlesProvider } from '../context/ArticlesContext';


function ArticlesPage() {
  const subject = 'World'
  const language = 'fr'
  
  return (
    <ArticlesProvider subject={subject} language={language}>
      <div className="container mx-auto px-4 py-8  min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 text-black">
          <h1 className="text-4xl font-bold text-base-content mb-4 text-black">
            Notre Blog sur l'actualité
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto text-black">
            Découvrez les actualités dans le monde
          </p>
        </div>
        <Outlet />
      </div>
    </ArticlesProvider>
  )
}

export default ArticlesPage
