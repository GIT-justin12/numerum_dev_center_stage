import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from '../types/article';


function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col 
      bg-base-100 text-black">
      {/* Image */}
      <figure className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="card-body flex-1">
        {/* Titre */}
        <h2 className="card-title text-xl line-clamp-2 mb-2 p-1">
          {article.title}
        </h2>

        {/* Extrait */}
        <p className="text-base-content/70 line-clamp-3 mb-4">
          {/*article.excerpt*/}
        </p>
        {/* Métadonnées */}
        <div className="flex items-center gap-4 text-sm text-base-content/60 mb-4">
          <div className="flex items-center gap-1 text-black">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Bouton */}
        {/*`/articles/${article.id}`*/}
        <div className="card-actions mt-auto">
          <Link to={`/articles/${article.id}`} className="btn btn-outline w-full">
            Lire l'article
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard