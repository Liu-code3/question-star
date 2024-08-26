import type { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          logo
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        问卷系统 @copy; 2024 - present. Created by 小星
      </Footer>
    </Layout>
  )
}

export default MainLayout
