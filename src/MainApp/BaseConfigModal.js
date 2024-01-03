import React, { useState } from "react";
import { Form, Checkbox, Radio, InputNumber, Modal } from "antd";

const options1 = [
  { label: "ellipsis", value: "e" },
  { label: "default", value: "d" },
];
const options2 = [{ label: "序号列", value: "index" }];
const BaseConfigModal = ({ onCancel, onConfirm }) => {
  const [form] = Form.useForm();
  const handleConfirm = () => {
    const values = form.getFieldsValue();
    onConfirm && onConfirm(values);
    onCancel();
  };
  return (
    <Modal
      onCancel={onCancel}
      open
      onOk={handleConfirm}
      okText={"确定"}
      cancelText={"取消"}
      title={"一次性更改全部列配置"}
    >
      <Form form={form}>
        <Form.Item label="省略/默认" name="ed">
          <Checkbox.Group options={options1}></Checkbox.Group>
        </Form.Item>
        <Form.Item label="表头文字排版" name="align" initialValue={"center"}>
          <Radio.Group>
            <Radio value={"left"}>left</Radio>
            <Radio value={"center"}>center</Radio>
            <Radio value={"right"}>right</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="列宽度width" name="width" initialValue={120}>
          <InputNumber
            min={0}
            max={500}
            placeholder="请设置列宽度"
            controls={false}
          ></InputNumber>
        </Form.Item>
        <Form.Item label="添加列" name="fixed">
          <Checkbox.Group options={options2}></Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BaseConfigModal;
