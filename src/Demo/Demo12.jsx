import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormEffectHooks,
} from '@formily/antd';
import { Input } from '@formily/antd-components';
import Printer from '@formily/printer';
import 'antd/dist/antd.css';

const { onFieldValueChange$ } = FormEffectHooks;

const App = () => {
  return (
    <Printer>
      <SchemaForm
        components={{ Input }}
        onSubmit={(values) => {
          console.log(values);
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('aa').subscribe(({ name, value }) => {
            setFieldState('*(bb,cc,dd)', (state) => {
              state.visible = value;
            });
          });
        }}
      >
        <Field
          type="string"
          name="aa"
          title="批量控制显示隐藏"
          enum={[
            { label: '显示', value: true },
            { label: '隐藏', value: false },
          ]}
          default={true}
          x-component="Input"
        />
        <Field type="string" name="bb" title="BB" x-component="Input" />
        <Field type="string" name="cc" title="CC" x-component="Input" />
        <Field type="string" name="dd" title="DD" x-component="Input" />
      </SchemaForm>
    </Printer>
  );
};

export default App;
