import MainLayout from '../layouts/MainLayout'
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
        path: '*',
        element: <NotFound />,
      },
    ]
  }
];

export default routes;