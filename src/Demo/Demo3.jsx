// 通常，我们的联动逻辑可以分为几类，我们可以是：

// 模式分类
//------------
// 一对多联动(A-->B,A-->C,A-->D)
// 多对一联动(B-->A,C-->A,D-->A)
// 链式联动(A-->B,B-->C,C-->D)
// 循环联动(A-->B,B-->C,C-->A)

// 控制分类
//------------
// 控制显示隐藏
// 控制值
// 控制校验信息或校验规则
// 控制组件属性(只读/禁用/文案/加载态等等)

// 结构分类
//------------
// 对象结构的字段间联动
// 自增数组结构的字段间联动
// 其他联动
// 联动发生前存在异步取数
// 表单之外的组件与表单内字段的联动

import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  Submit,
  Reset,
} from '@formily/antd';
import Printer from '@formily/printer';
import { merge } from 'rxjs';
import { Input, Select } from '@formily/antd-components';
import 'antd/dist/antd.css';

const components = {
  Input,
  Select,
};

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks;

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        effects={({ setFieldState }) => {
          // 所有联动操作统一在 effects 中实现
          merge(onFieldValueChange$('aa'), onFieldInit$('aa')).subscribe(
            (fieldState) => {
              setFieldState('bb', (state) => {
                state.visible = fieldState.value === 123;
              });
            }
          );
        }}
      >
        <Field
          type="string"
          title="AA"
          enum={[
            { label: '123', value: 123 },
            { label: '321', value: 321 },
          ]}
          name="aa"
          x-component="Select"
        />
        <Field type="string" title="BB" name="bb" x-component="Input" />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

export default App;
