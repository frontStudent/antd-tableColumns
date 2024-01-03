import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { CopyOutlined, SettingOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ codeStr, showConfigModal }) => {
  const handleCopy = () => {
    if (codeStr) message.success("已复制到剪贴板！");
    else message.warning("没有内容可复制！");
  };
  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard text={codeStr} onCopy={handleCopy}>
        <Button
          size="small"
          style={{
            position: "absolute",
            top: "10px",
            right: "30px",
            zIndex: 2,
          }}
        >
          <CopyOutlined />
        </Button>
      </CopyToClipboard>
      <Button
        onClick={showConfigModal}
        size="small"
        style={{
          position: "absolute",
          top: "10px",
          right: "70px",
          zIndex: 2,
        }}
      >
        <SettingOutlined />
      </Button>
      <SyntaxHighlighter
        className="code-block"
        language="javascript"
        // style={theme}
        customStyle={{
          height: "380px",
          overflow: "auto",
          borderRadius: "5px",
        }}
      >
        {codeStr ? codeStr : "此处会对应生成列配置对象数组"}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
