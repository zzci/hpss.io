import { AvatarDropdown, AvatarName, Footer, SelectLang } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import React from 'react';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { LogtoProvider, LogtoConfig, UserScope, useLogto } from '@logto/react';
import { LOGTO_APPLICATION_ID, LOGTO_ENDPOINT_URL } from '@/composables';

const isDev = process.env.NODE_ENV === 'development';
const loginPaths = ['/user/ssoLogin', '/user/callback', '/callback'];

// 用户信息 Provider 组件
const UserInfoProvider: React.FC<{
  children: React.ReactNode;
  setInitialState: (state: any) => void;
}> = ({ children, setInitialState }) => {
  const { isAuthenticated, fetchUserInfo } = useLogto();

  React.useEffect(() => {
    const init = async () => {
      if (isAuthenticated) {
        try {
          const userInfo = await fetchUserInfo();
          if (userInfo) {
            setInitialState((s: any) => ({
              ...s,
              currentUser: {
                name: userInfo.name || userInfo.username || userInfo.email || 'User',
                avatar:
                  userInfo.avatar ||
                  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                email: userInfo.email,
                phone: userInfo.phone,
              },
            }));
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };
    init();
  }, [isAuthenticated, fetchUserInfo, setInitialState]);

  return <>{children}</>;
};

// 认证状态检查组件
const AuthStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useLogto();
  const { location } = history;
  const isLoginPage = loginPaths.includes(location.pathname);

  React.useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      history.push(loginPaths[0]);
    }
  }, [isAuthenticated, isLoginPage]);

  return <>{children}</>;
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
}> {
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <UserInfoProvider setInitialState={setInitialState}>
            <AuthStateProvider>{children}</AuthStateProvider>
          </UserInfoProvider>
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * Root Complex
 *
 * - https://umijs.org/docs/api/runtime-config#rootcontainer
 * - https://pro-components.antdigital.dev/en-US/docs/faq#compatibility-issues-with-browsers-below-chrome-88
 */
const RootContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config: LogtoConfig = {
    appId: LOGTO_APPLICATION_ID,
    endpoint: LOGTO_ENDPOINT_URL,
    scopes: [
      UserScope.Email,
      UserScope.Phone,
      UserScope.CustomData,
      UserScope.Identities,
      UserScope.Organizations,
    ],
  };

  return <LogtoProvider config={config}>{children}</LogtoProvider>;
};

export function rootContainer(container: React.ReactElement) {
  return <RootContainer>{container}</RootContainer>;
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
