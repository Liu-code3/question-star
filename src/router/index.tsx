import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layouts/MainLayout.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))
const Login = lazy(() => import('@/views/auth/login/index.tsx'))
const Register = lazy(() => import('@/views/auth/register/index.tsx'))
const ManageLayout = lazy(() => import('@/layouts/ManageLayout.tsx'))
const List = lazy(() => import('@/views/manage/list/index.tsx'))
const Star = lazy(() => import('@/views/manage/star/index.tsx'))
const Trash = lazy(() => import('@/views/manage/trash/index.tsx'))
const QuestionLayout = lazy(() => import('@/layouts/QuestionLayout.tsx'))
const Edit = lazy(() => import('@/views/question/edit/index.tsx'))
const Stat = lazy(() => import('@/views/question/stat/index.tsx'))

const NotFound = lazy(() => import('@/views/NotFound/404.tsx'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />
          },
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          }
        ]
      }
    ]
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />
      },
      {
        path: "stat/:id",
        element: <Stat />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const router = createBrowserRouter(routes)

function Routes() {
  return <RouterProvider router={router}></RouterProvider>
}

export default Routes
