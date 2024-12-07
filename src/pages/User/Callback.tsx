import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useIntl, useModel, history } from '@umijs/max';
import { message, Spin } from 'antd';
import { setToken, sleep } from '@/utils'

const Callback: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Uncomment for mock SSO implementation
        // const mockToken = `mock_token_${Date.now()}`;
        // const finalRedirectUrl = `${redirectUri}?token=${mockToken}`;
        // window.location.href = finalRedirectUrl;

        // TODO: test coding
        setToken('test')

        await sleep(500)

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      } catch (error) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！',
        });
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    };

    handleCallback();
  }, []);

  return <Spin />;
};

export default Callback;
