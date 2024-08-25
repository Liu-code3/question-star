import type { FC } from 'react'
import { Layout } from 'antd'
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
        <div>内容</div>
      </Content>
      <Footer className={styles.footer}>
        问卷系统 @copy; 2024 - present. Created by 小星
      </Footer>
    </Layout>
  )
}

export default MainLayout
