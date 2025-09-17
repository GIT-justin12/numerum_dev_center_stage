// src/pages/ArticleDetailPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

import { useArticles } from "../context/ArticlesContext";
import { useEffect, useState } from "react";
import type { Article } from "../types/article";


export function ArticleDetailPage() {
  const [articleData, setArticleData] =  useState<Article>();
  const { data, loading, error, refetch, getArticleById } = useArticles();

  const { articleId } = useParams<{ articleId: string}>();

  useEffect(() => {
    if (data) {
      setArticleData(articleId ? getArticleById(articleId) : undefined);
    }
  }, [data]);

  const navigate = useNavigate();
  console.log(articleData);
  console.log(articleId, articleData);
  
  
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Chargement des articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state bg-base-100 text-black">
        <h3>Erreur de chargement</h3>
        <p>Une erreur est survenue lors du chargement des articles.</p>
        <button className="retry-btn" onClick={refetch}>
          Réessayer
        </button>
    
      </div>
    );
  }

  if (!articleData || !data) {
    return (
      <div className="empty-state bg-base-100 text-black">
        <h3>Article indisponible</h3>
        <button onClick={refetch} className="refresh-btn">
          Charger les articles
        </button>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Bouton retour */}
      <button className="btn btn-ghost mb-8" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 w-4 h-4" />
        Retour
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="badge badge-secondary mb-4">
          {/*article.category*/}
        </div>

        <h1 className="text-4xl font-bold text-base-content mb-4 text-black">
          {articleData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-base-content/60 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(articleData.publishedAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </div>

      {/* Image principale */}
      <figure className="mb-8 rounded-lg overflow-hidden">
        <img
          src={articleData.image}
          alt={articleData.title}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card text-black">
        <div className="card-body p-8">
          <article
            className="prose max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: articleData.description }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Link to="/articles" className="btn btn-outline">
          ← Tous les articles
        </Link>
        
        <a href={articleData.url} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-secondary">
            aller sur la source
            <ArrowRight className="mr-2 w-4 h-4" />
          </button>
        </a>
      </div>
    </div>
  );
}