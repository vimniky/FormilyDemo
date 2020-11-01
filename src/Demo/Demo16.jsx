// 在 Formily 中，不管是 SchemaForm 组件还是 Form 组件，都支持 3 个传值属性
// value 受控值属性
// 主要用于外部多次渲染同步表单值的场景，但是注意，它不会控制默认值，点击重置按钮的时候值会被置空
// defaultValue 同步初始值属性
// 主要用于简单同步默认值场景，限制性较大，只保证第一次渲染生效，重置不会被置空
// initialValues 异步初始值属性
// 主要用于异步默认值场景，兼容同步默认值，只要在第 N 次渲染，某个字段还没被设置默认值，第 N+1 次渲染，就可以给其设置默认值

import { useState } from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Reset,
} from '@formily/antd';
import { Input } from '@formily/antd-components';
import { Button } from 'antd';
import Printer from '@formily/printer';
import 'antd/dist/antd.css';

const Value = () => {
  const [value, setValue] = useState({
    aa: 'first render value',
  });
  return (
    <Printer>
      <SchemaForm
        value={value}
        components={{
          Input,
        }}
      >
        <Field type="string" name="aa" x-component="Input" />
        <Field type="string" name="bb" x-component="Input" />
        <FormButtonGroup>
          <Button
            onClick={() => {
              setValue({
                aa: Math.random() * 1000 + '',
                bb: Math.random() * 1000 + '',
              });
            }}
          >
            刷新
          </Button>
          <Reset>重置会置空数据</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

const DefaultValue = () => {
  const [value, setValue] = useState({
    aa: 'first render value',
  });
  return (
    <Printer>
      <SchemaForm
        defaultValue={value}
        components={{
          Input,
        }}
      >
        <Field type="string" name="aa" x-component="Input" />
        <Field type="string" name="bb" x-component="Input" />
        <FormButtonGroup>
          <Button
            onClick={() => {
              setValue({
                aa: Math.random() * 1000 + '',
                bb: Math.random() * 1000 + '',
              });
            }}
          >
            刷新不会生效
          </Button>
          <Reset>重置不会置空数据</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

const InitialValues = () => {
  const [value, setValue] = useState({
    aa: 'first render value',
  });
  return (
    <Printer>
      <SchemaForm
        initialValues={value}
        components={{
          Input,
        }}
      >
        <Field type="string" name="aa" x-component="Input" />
        <Field type="string" name="bb" x-component="Input" />
        <FormButtonGroup>
          <Button
            onClick={() => {
              setValue({
                aa: Math.random() * 1000 + '',
                bb: Math.random() * 1000 + '',
              });
            }}
          >
            刷新
          </Button>
          <Reset>重置</Reset>
          <Reset forceClear>清空</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

const App = () => {
  return (
    <div>
      <div style={{ border: '1px solid #eee', padding: 20 }}>
        <h2>Value 使用场景</h2>
        <Value />
      </div>
      <div style={{ border: '1px solid #eee', padding: 20, margin: '40px 0' }}>
        <h2>DefaultValue 使用场景</h2>
        <DefaultValue />
      </div>
      <div style={{ border: '1px solid #eee', padding: 20 }}>
        <h2>InitialValues 使用场景</h2>
        <InitialValues />
      </div>
    </div>
  );
};

export default App;
