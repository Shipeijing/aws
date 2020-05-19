import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Header from '../../components/Header'
import { Button } from 'antd';

function IndexPage(props) {
    const start = (<Button type="primary">Start testing</Button>)
    const Next = <>
        <Button>Start testing</Button>
        <Button type="primary">Start testing</Button>
    </>
    return (
        <div className={styles.normal}>
            <Header></Header>
            <div className={styles.main}>
                <div><span>Scene: </span><p>fewfew fwe fw ef w few ef e  f e fe </p><span><span>5</span>/5</span></div>
                <h1>rgrg gr gre gerg r ger ger gre re eg </h1>
                <div>{props.start ? start : Next}</div>
                <div></div>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return { start: state.Index.start };
}

export default connect(mapStateToProps)(IndexPage);
