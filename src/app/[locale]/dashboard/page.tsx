'use client'
import Layout from '@/components/Layout'

import styles from './index.module.less'

export default function Dashboard() {
  return (
    <Layout curActive='/dashboard'>
      <main className={styles.dashboardWrap}>
        <div className={styles.content} id='dashboard'>
          dashboard
        </div>
      </main>
    </Layout>
  )
}
