import { Helmet, SelectLang, useIntl } from '@umijs/max';
import { createStyles } from 'antd-style';
import { LoginForm } from "@ant-design/pro-components";
import React from 'react';
import { useLogto } from '@logto/react';
import Settings from '../../../../config/defaultSettings';
import { AUTH_CALLBACK_URL } from '@/composables';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      zIndex: 999,
      // color: "#fff",
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const SSOLogin: React.FC = () => {
  const { signIn } = useLogto();
  const { styles } = useStyles();
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'pages.sso.login',
            defaultMessage: 'SSO 登录页',
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <Lang />
      <LoginForm
        // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="/logo.svg"
        // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={intl.formatMessage({
          id: 'pages.sso.title',
          defaultMessage: 'HPS 运营后台',
        })}
        subTitle={intl.formatMessage({
          id: 'pages.sso.subtitle',
          defaultMessage: '欢迎登录 HPS 运营后台管理系统',
        })}
        submitter={{
          searchConfig: {
            submitText: intl.formatMessage({
              id: 'pages.sso.submit',
              defaultMessage: 'HPS SSO Login',
            }),
          },
        }}
        onFinish={async () => {
          await signIn(AUTH_CALLBACK_URL);
        }}
      >
      </LoginForm>
    </div>
  );
};

export default SSOLogin;
