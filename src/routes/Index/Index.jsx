import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Header from '../../components/Header'
import { Button, Popover, Modal } from 'antd';

function IndexPage(props) {
    const [ loading, setLoading ] = useState([false, false, false])
    const setStart = (type) => {
        if (type !== '0')
            setLoading([false, false, true])
            else{
                props.dispatch({ type: 'Index/getStart', payload: { start: !props.start } })
            }
        setTimeout(() => {
            setLoading([false, false, false])
        }, 500)
    }
    const setNum = () => {
        if (props.num + 1 >= 5) {
            setVisible()
            props.dispatch({ type: 'Index/getPrompt', payload: {  id:props.id } })
        } else {
            setLoading([false, true, false])
            props.dispatch({ type: 'Index/getNum', payload: {  id:props.id,currentPosition:String(props.num+1) } })
        }
        setTimeout(() => {
            setLoading([false, false, false])
        }, 500)
    }
    const reset = () => {
        setLoading([true, false, false])
        props.dispatch({ type: 'Index/getReset', payload: { id:props.id,currentPosition:String(props.num+1)} })
        setTimeout(() => {
            setLoading([false, false, false])
        }, 500)
    }
    const setVisible = () => {
        props.dispatch({ type: 'Index/setVisible', payload: { visible: !props.visible } })

    }
    const Prompt = () => {
        props.dispatch({ type: 'Index/loginOut' })
    }
    const start = <Button size="large" type="primary" style={{ width: 200 }} onClick={() => { setStart('0') }}>Start testing</Button>
    const Next = <>
        <Popover visible={props.num === 0} content={'If the sentence test does not meet the requirements,click Retest'} placement="bottomRight"><Button size="large" onClick={reset} loading={loading[0]} style={{ width: 180, marginRight: 100 }}>Re-test</Button></Popover>

        <Popover visible={props.num === 0} content={'If this sentence is tested,please click on the next sentence to test'} placement="bottomLeft">  <Button size="large" type="primary" loading={loading[1]} style={{ width: 180 }} onClick={setNum}>{props.num + 1 < 5 ? 'Next sentence' : 'Complete'}</Button></Popover>
    </>
    return (
        <div className={styles.normal}>
            <Modal
                width={600}
                centered={true}
                closable={false}
                keyboard={false}
                maskClosable={false}
                title="Prompt"
                visible={props.visible}
                footer={<Button type="primary" size="large" style={{ width: 150 }} onClick={Prompt}>Confirm</Button>}
            >
                <p>Thank you for your participation,this voice acquisition has been completed,please hang up to end the test,thank you~!</p>
            </Modal>
            <Header></Header>
            <div className={styles.main}>
                <div><span>Scene: </span><p>fewfew fwe fw ef w few ef e  f e fe </p><span><span>{props.num + 1}</span>/5</span></div>
                <h1><Popover visible={props.num === 0 && props.start} content={'At the end of the call,please say the words above'} placement="bottom">rgrg gr gre gerg r ger ger gre re eg </Popover></h1>
                <div>{!props.start ? start : Next}</div>
                <div><Popover content={<><p style={{ width: 300 }}>If the call is disconnected,click the Continue Test button to restart the call</p><Button loading={loading[2]} onClick={() => { setStart('1') }} type="primary">Continue testing</Button></>} placement="rightBottom"><Button type="link" danger>Interrupted call ?</Button></Popover></div>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        start: state.Index.start,
        visible: state.Index.visible,
        num: state.Index.num,
        id:state.Index.id
    };
}

export default connect(mapStateToProps)(IndexPage);
