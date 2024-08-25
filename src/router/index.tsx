import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const HelloWorld = lazy(() => import('@/views/HelloWorld.tsx'))
const MainLayout = lazy(() => import('@/layouts/MainLayout.tsx'))
const NotFound = lazy(() => import('@/views/NotFound/404.tsx'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
  },
  { path: '/home', element: <HelloWorld /> },
  { path: '*', element: <NotFound /> }
]

const router = createBrowserRouter(routes)

function Routes() {
  return <RouterProvider router={router}></RouterProvider>
}

export default Routes
