import React from "react";
import { connect } from "dva";
import styles from "./style.less";
import { Form, message, Input, Button, Radio, Row, Col, Modal } from "antd";
import { AuditOutlined, TabletOutlined } from "@ant-design/icons";

function IndexPage({ visible, btnText, dispatch }) {
  const [form] = Form.useForm();
  if (btnText !== 0) {
    setTimeout(() => {
      dispatch({
        type: "Login/setbtnText",
        payload: { btnText: btnText - 1 },
      });
    }, 1000);
  }
  const onFinish = (values) => {
    if (values.country === "0" && values.phoneNumber.trim().length !== 8) {
      message.error("Please enter the correct Singapore number");
      return false;
    }
    const result = dispatch({
      type: "Login/loginIn",
      payload: values,
    });
    result.then((res) => {
      if (!res) {
        form.setFieldsValue({ taskCode: "" });
      }
    });
  };
  const handleCancel = () => {
    dispatch({
      type: "Login/setvisible",
      payload: { visible: false },
    });
  };

  return (
    <div className={styles.bg}>
      <Modal
        width={900}
        wrapClassName="login"
        style={{ textAlign: "center" }}
        title="AWS crowdsourcing instructions"
        visible={visible}
        centered={true}
        maskClosable={false}
        keyboard={false}
        closable={btnText === 0}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            type="primary"
            disabled={btnText !== 0}
            onClick={handleCancel}
          >
            {btnText === 0 ? "Got in" : btnText + "s"}
          </Button>,
        ]}
      >
        <p style={{ textAlign: "left", lineHeight: 2, padding: "0 40px" }}>
          Thank you for your participation, this voice capture is by phone, so
          we will call you and require you to enter your valid number when you
          log in. For non-Singaporean numbers, please select "Non-Singaporean"
          and add your country code before the number. Your number is used for
          this call only and we do not do any number saving. <br />
          1. After logging in, after you have a basic understanding of the test
          scenario, click Start Test, and we will give you the number you
          entered to call. <br />
          2. after answering the phone, the AI will play the voice first, wait
          for the system to finish broadcasting and ask you to say the words on
          the screen. <br />
          3. the sentences that are read need to flow naturally or they will be
          considered unqualified. <br />
          4. if a sentence fails, the retest can be clicked. <br />
          5. if a sentence passes, click the next button to test it.
        </p>
      </Modal>
      <Row className={styles.formBox} justify="center" align="middle">
        <Col className={styles.formWrapper} span={32}>
          <div className={styles.logo}>
            <img height="30" src={require("../../assets/logo.png")} alt="" />
            <div
              style={{ lineHeight: "40px", borderBottom: "2px solid #f1f2f6" }}
            >
              Welcome to the WIZ corpus collection systeml
            </div>
          </div>
          <Form
            style={{ width: 460, margin: "0 auto" }}
            form={form}
            className="login-form"
            initialValues={{
              taskCode: "",
              country: "0",
              phoneNumber: "",
            }}
            onFinish={onFinish}
          >
            <Form.Item name="country">
              <Radio.Group>
                <Radio value={"0"}>Singapore</Radio>
                <Radio value={"1"}>Non-Singapore</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="taskCode"
              rules={[
                {
                  required: true,
                  message: "Please enter CODE",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<AuditOutlined />}
                placeholder="Please enter CODE"
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
              ]}
            >
              <Input
                prefix={<TabletOutlined />}
                size="large"
                placeholder="Please enter your phone number"
              />
            </Form.Item>
            <Row style={{ lineHeight: "30px", marginBottom: "20px" }}>
              <Col span={23} offset={1} style={{ color: "#a5a5a5" }}>
                For non-singaporean testers, please prefix the number with the
                country code
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                size="large"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <p>COPYRIGHT ©2019~2020 WIZ HOLDINGS PTE.LTD</p>
    </div>
  );
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  const { phoneArea, visible, btnText } = state.Login;
  return {
    phoneArea,
    visible,
    btnText,
  };
}

export default connect(mapStateToProps)(IndexPage);
