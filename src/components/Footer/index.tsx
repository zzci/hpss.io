import React from 'react';
import { useIntl } from '@umijs/max';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const intl = useIntl()

  return (
    <DefaultFooter
      copyright={intl.formatMessage(
        {
          id: 'copyright',
          defaultMessage: 'Copyright © {year} HPS',
        },
        {
          year: new Date().getFullYear(),
        }
      )}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/zzci/hpss.io',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
