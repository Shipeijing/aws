import React from 'react';
import { connect } from 'dva';
import styles from '../assets/style/main.less';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function IndexPage() {
  return (
    <div className={styles.normal}>
     <img src={require('../assets/logo.png')} alt=""/>
     <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    </div>
  );
}

export default connect()(IndexPage);
