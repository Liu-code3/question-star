import type { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Logo from '@/components/Logo/index.tsx'
import UserInfo from '@/components/UserInfo'
import { useLoadUserData } from '@/hooks/useLoadUserData.ts'
import { useNavPage } from '@/hooks/useNavPage.ts'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
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
