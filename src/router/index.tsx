import type { ReactNode } from 'react'
import { Suspense, lazy } from 'react'
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

/**
 * @remarks 闪烁的发生是因为将整个 App 包裹在 Suspense 中会导致在懒加载时整个应用都渲染 fallback。而将 Suspense 包裹在单个组件上，
 * 只会让正在懒加载的组件局部渲染 fallback，从而避免了不必要的全屏重新渲染并防止闪烁。
 */
function lazyComponent(element: ReactNode): ReactNode {
  return (
    <Suspense fallback={<div>loading...</div>}>
      { element}
    </Suspense>
  )
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: lazyComponent(<MainLayout />),
    children: [
      {
        path: '/',
        element: lazyComponent(<Home />),
      },
      {
        path: 'login',
        element: lazyComponent(<Login />),
      },
      {
        path: 'register',
        element: lazyComponent(<Register />),
      },
      {
        path: 'manage',
        element: lazyComponent(<ManageLayout />),
        children: [
          {
            path: 'list',
            element: lazyComponent(<List />)
          },
          {
            path: 'star',
            element: lazyComponent(<Star />)
          },
          {
            path: 'trash',
            element: lazyComponent(<Trash />)
          }
        ]
      }
    ]
  },
  {
    path: 'question',
    element: lazyComponent(<QuestionLayout />),
    children: [
      {
        path: 'edit/:id',
        element: lazyComponent(<Edit />)
      },
      {
        path: 'stat/:id',
        element: lazyComponent(<Stat />)
      }
    ]
  },
  {
    path: '*',
    element: lazyComponent(<NotFound />)
  }
]

const router = createBrowserRouter(routes)

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
