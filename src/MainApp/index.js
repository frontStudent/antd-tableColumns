import React, { useState, useEffect } from "react";
import { Input, Row, Col, message, Button } from "antd";
import CodeBlock from "../components/CodeBlock";
import BaseConfigModal from "./BaseConfigModal";
import stringifyFunction from "../utils/stringifyFunction";
function App() {
  const [colStr, setColStr] = useState("");
  const [textValue, setTextValue] = useState("");
  const [cols, setCols] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (cols.length === 0) {
      setColStr("");
      setTextValue("");
      return;
    }
    //指定第二个参数 null 表示使用默认的 replacer 函数，第三个参数 2 表示每个层级缩进两个空格。
    const colStr = JSON.stringify(cols, null, 2).replace(/"([^"]+)":/g, "$1:");
    setColStr(colStr);
  }, [cols]);

  const handleGenerateColumns = (e) => {
    setTextValue(e.target.value);
    const dataStr = e.target.value.replace(/\s+/g, ""); //不去除空格JSON.parse会报错

    if (!dataStr) {
      setColStr("");
      return;
    }
    let data;
    try {
      data = JSON.parse(dataStr);
    } catch (error) {
      message.error("数据格式错误");
      setColStr("");
      return;
    }

    let record;
    if (Array.isArray(data)) {
      record = data?.[0] || {};
    } else if (typeof data === "object") {
      record = data || {};
    } else {
      message.error("数据格式错误");
      setColStr("");
      return;
    }
    const cols = Object.keys(record).map((key) => {
      return {
        title: "",
        dataIndex: key,
        field: key,
        align: "center",
        width: 120,
      };
    });
    setCols(cols);
  };

  const handleChangeConfig = (values) => {
    const { ed = [], align = "center", width = 120, fixed = [] } = values || {};
    const newCols = cols?.map((col) => {
      const params = {
        ...col,
        align,
        width,
      };
      if (ed.includes("e")) params.ellipsis = true;
      if (ed.includes("d")) params.default = true;
      return params;
    });
    if (
      fixed.includes("index") &&
      newCols.length > 0 &&
      newCols[0].dataIndex !== "op"
    ) {
      newCols.unshift({
        dataIndex: "op",
        field: "op",
        fixed: "left",
        align: "center",
        width: 50,
        default: true,
        render: `(text, record, index) => {
          return <DataGrid.RowIndex dataGridRef={tableRef} index={index} />
        }`,
      });
    } else if (
      !fixed.includes("index") &&
      newCols.length > 0 &&
      newCols[0].dataIndex === "op"
    ) {
      newCols.shift();
    }
    console.log(newCols);
    setCols(newCols);
  };
  return (
    <div className="App">
      <Row style={{ padding: "0 40px" }}>
        <Button onClick={() => setCols([])} type="primary">
          点击清空
        </Button>
      </Row>
      <Row style={{ padding: "0 40px", alignItems: "center" }}>
        <Col span={8}>
          <Input.TextArea
            placeholder="请粘贴JavaScript对象，若粘贴数组将解析第一个元素"
            value={textValue}
            onChange={(val) => handleGenerateColumns(val)}
            style={{ height: "400px" }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={8}>
          <CodeBlock
            codeStr={colStr}
            showConfigModal={() => setDialogVisible(true)}
          />
        </Col>
      </Row>
      {dialogVisible && (
        <BaseConfigModal
          onCancel={() => setDialogVisible(false)}
          onConfirm={handleChangeConfig}
        />
      )}
    </div>
  );
}

export default App;
