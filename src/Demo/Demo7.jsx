// 通常，我们的校验场景可以分为几类，我们可以是：
//
// 静态校验
// ---------
// 必填校验
// 格式校验
// 提示型校验
// 其他规则性校验
//
// 动态校验
// ---------
// 联动校验
// 异步校验
//
// 定制校验
// ---------
// 定制文案
// 定制校验模板

import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  Submit,
  Reset,
  setValidationLocale,
} from '@formily/antd';
import Printer from '@formily/printer';
import { Input, Select, NumberPicker } from '@formily/antd-components';
import 'antd/dist/antd.css';

const components = {
  Input,
  Select,
  NumberPicker,
};

const { onFieldValueChange$ } = FormEffectHooks;

setValidationLocale({
  zh: {
    url: 'URL格式不合法，注意：必须要带上协议，可以直接以//开头',
  },
});

const placehodlers = {
  url: 'https://test.alibaba.com',
  email: 'test@alibaba-inc.com',
  qq: '123',
  date: '2012-12-12',
  idcard: '433533199312058746',
  zip: '333333',
  money: '$12.33',
  ipv6: '2001:0db8:86a3:08d3:1319:8a2e:0370:7344',
  ipv4: '168.1.1.0',
  phone: '16835646823',
  zh: '我爱中国',
};

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        validateFirst
        expressionScope={{
          externalTitle: (
            <span style={{ color: 'green' }}>React Node Message</span>
          ),
          requiredReactNode: (
            <div>
              必填，<span style={{ color: 'blue' }}>富文本错误文案</span>
            </div>
          ),
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('format_type').subscribe((fieldState) => {
            setFieldState('format_text', (state) => {
              state.value = placehodlers[fieldState.value];
              state.rules = fieldState.value;
              state.props['x-component-props'] =
                state.props['x-component-props'] || {};
              state.props['x-component-props'].placeholder =
                placehodlers[fieldState.value];
            });
          });
        }}
      >
        <Field
          type="string"
          required
          title="Required"
          name="required"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Format Type"
          name="format_type"
          enum={[
            'url',
            'email',
            'ipv6',
            'ipv4',
            'idcard',
            'taodomain',
            'qq',
            'phone',
            'money',
            'zh',
            'date',
            'zip',
          ]}
          x-component="Select"
        />
        <Field
          type="string"
          required
          title="Format Text"
          name="format_text"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Other Rules"
          x-rules={[
            {
              whitespace: true,
              min: 5,
              max: 10,
              validator(value) {
                return value.indexOf('asd') > -1 ? '文本里不能包含asd' : '';
              },
            },
          ]}
          name="custom_rules"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Async Validate"
          x-rules={(value) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(value !== '57350' ? '验证码验证失败' : '');
              }, 1000);
            });
          }}
          name="remote_code"
          x-props={{
            hasFeedback: true,
            triggerType: 'onBlur',
          }}
          x-component="Input"
          x-component-props={{
            placeholder: 'Please input remote code:57350',
          }}
        />
        <Field
          type="number"
          required
          title="Threshold Validate"
          x-rules={(value) => {
            if (value > 0 && value < 100) {
              return {
                type: 'warning',
                message: '第一阶梯',
              };
            } else if (value >= 100 && value < 500) {
              return {
                type: 'warning',
                message: '第二阶梯',
              };
            } else if (value >= 500 && value < 1000) {
              return {
                type: 'warning',
                message: '第三阶梯',
              };
            } else if (value >= 1000) {
              return {
                type: 'warning',
                message: '第四阶梯',
              };
            } else {
              return '';
            }
          }}
          name="threshold"
          x-component="NumberPicker"
        />
        <Field
          type="string"
          title="Custom Message"
          x-rules={{
            required: true,
            extra: '校验模板注入变量',
            message: 'Required {{extra}}',
          }}
          name="custom_message"
          x-component="Input"
        />
        <Field
          type="string"
          title="{{externalTitle}}"
          x-rules={[
            {
              required: true,
              message: '{{requiredReactNode}}',
            },
          ]}
          name="react_node_message"
          x-component="Input"
        />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

export default App;
