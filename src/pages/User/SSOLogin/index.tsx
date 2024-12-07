import { Helmet, history, SelectLang, useIntl } from '@umijs/max';
import { createStyles } from 'antd-style';
import { message } from 'antd';
import {
  LoginFormPage,
  LoginForm,
} from "@ant-design/pro-components";
import React from 'react';
import Settings from '../../../../config/defaultSettings';

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
  const { styles } = useStyles();
  const intl = useIntl();
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (values: any) => {
    try {
      /**
       * env UMI_APP_PUBLIC_SSO_URL
       */
      if (!UMI_APP_PUBLIC_SSO_URL) {
        message.error('SSO misconfiguration')
        return
      }
  
      // 构造应用回调地址
      const redirectUri = encodeURIComponent(window.location.origin)
  
      // 跳转到模拟的 SSO 页面
      history.push(`${UMI_APP_PUBLIC_SSO_URL}?redirect=${redirectUri}`)
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'SSO 登录页',
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <Lang />
      <LoginForm
        // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="HPS 运营后台"
        // containerStyle={{
        //   backgroundColor: "rgba(91, 95, 105, 0.65)",
        //   backdropFilter: "blur(4px)",
        // }}
        subTitle="欢迎登录 HPS 运营后台管理系统"
        submitter={{
          searchConfig: {
            submitText: "HPS SSO Login",
          },
        }}
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
      >
      </LoginForm>
    </div>
  );
};

export default SSOLogin;
