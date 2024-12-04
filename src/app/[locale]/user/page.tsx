'use client'
import Layout from '@/components/Layout'
import styles from './index.module.less'

export default function User() {
  return (
    <Layout curActive='/user'>
      <main className={styles.userWrap}>
        <div className={styles.content}>test</div>
      </main>
    </Layout>
  )
}
