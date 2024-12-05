/** @type {import('next').NextConfig} */
import withAntdLess from 'next-plugin-antd-less'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig = {
  output: 'export',
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/en/:path*',
  //       permanent: true,
  //     },
  //   ]
  // },
  // swcMinify: true,
  // fastRefresh: true,
  // concurrentFeatures: true,
}

const withNextIntl = createNextIntlPlugin()(nextConfig)

export default withAntdLess(withNextIntl)
