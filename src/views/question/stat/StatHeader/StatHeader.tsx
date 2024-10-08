import type { FC } from 'react'
import { useRef } from 'react'
import type { InputRef } from 'antd'
import { Button, Input, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import { useGetPageInfo } from '@/hooks/useGetPageInfo.ts'

const { Title } = Typography
const StatHeader: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()
  const urlInputRef = useRef<InputRef>(null)

  function copy() {
    const ele = urlInputRef.current
    if (ele === null)
      return

    ele.select()
    document.execCommand('copy') // 拷贝选中的内容
    message.success('拷贝成功')
  }

  function genLinkAndQRCodeEle() {
    if (!isPublished)
      return null
      // 拼接url，需要参考C端端规则
    const url = `http://192.168.10.21:3000/question/${id}`
    // 定义二维码组件
    const QRCodeEle = (
      <div className="text-center">
        <QRCode value={url} size={150}></QRCode>
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeEle}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeEle()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
