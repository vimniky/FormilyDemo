// 在 Formily 表单系统中，主要由几部分构成：

// Form
// -------
// FormState
// FormLifeCycle
//
// Field
// -------
// FieldState
// VirtualFieldState
// FieldLifeCycle

// 可以看到，想要构成一个表单系统，必须要有一套完备的生命周期，才能驱动整个系统更好的运作，生命周期，就像心脏一样，它会不断的跳动，往外派发事件，借助生命周期，我们就能构建一个无限复杂的表单系统，毫不含糊的说，我们的业务逻辑，90%以上都是基于生命周期而来的。

import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  LifeCycleTypes,
  Submit,
  Reset,
} from '@formily/antd';
import Printer from '@formily/printer';
import { Input, Select } from '@formily/antd-components';
import 'antd/dist/antd.css';

const components = {
  Input,
  Select,
};

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        effects={($, { setFieldState }) => {
          $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
            setFieldState('aa', (state) => {
              state.value = 321;
            });
          });
          $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'aa').subscribe(
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
