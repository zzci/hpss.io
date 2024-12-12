import React from 'react';
import { useHandleSignInCallback } from '@logto/react';
import { history } from '@umijs/max';
import { Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Callback = () => {
  const { isLoading } = useHandleSignInCallback(() => {
    history.push('/');
  });

  return isLoading ? (
    <Spin tip="Redirecting..." size="large">
      {content}
    </Spin>
  ) : null;
};

export default Callback;
