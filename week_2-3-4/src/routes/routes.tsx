import ArticlesList from '../components/ArticlesList';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout'
import { ArticleDetailPage } from '../pages/ArticleDetail';
import ArticlesPage from '../pages/Articles';
import Home from '../pages/Home'
import Login from '../pages/Login';
import NotFound from '../pages/NotFound'
import TodoList from '../pages/TodoList'

// On utilise un tableau d'objets pour définir nos routes
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/todolist',
        element: (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/articles',
        element: <ArticlesPage />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ArticlesList/>
              </ProtectedRoute>),
          },
          {
            path: ':articleId',
            element: (
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]
  }
];

export default routes;