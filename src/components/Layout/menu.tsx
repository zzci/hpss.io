/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BarChartOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'

const getNavList = (t: any) => {
  return [
    {
      key: '/dashboard',
      icon: <BarChartOutlined />,
      label: 'dashboard',
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: t('user'),
    },
  ]
}

export default getNavList
