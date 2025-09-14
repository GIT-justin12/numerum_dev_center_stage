import ArticleCard from "../components/ArticleCard"
import { useArticles } from "../context/ArticlesContext";

function ArticlesList() {
  const { data, loading, error } = useArticles();
  console.log(data)
    
  return (
    <>
      <div className="container mx-auto px-4 py-8">
      {/* Header */}

      {/* Grid d'articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && <p>Chargement des articles...</p>}
        {error && <p>Erreur lors du chargement des articles.</p>}
        {data && data.articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
    </div>
    </>
  )
}

export default ArticlesList;
