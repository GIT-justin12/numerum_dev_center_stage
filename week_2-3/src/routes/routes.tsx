import ArticlesList from '../components/ArticlesList';
import MainLayout from '../layouts/MainLayout'
import { ArticleDetailPage } from '../pages/ArticleDetail';
import Articles from '../pages/Articles';
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import TodoList from '../pages/TodoList'

// On utilise un tableau d'objets pour définir nos routes
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/todolist',
        element: <TodoList />,
      },
      {
        path: '/articles',
        element: <Articles />,
        children: [
          {
            index: true,
            element: <ArticlesList/>,
          },
          {
            path: ':articleId',
            element: <ArticleDetailPage />,
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