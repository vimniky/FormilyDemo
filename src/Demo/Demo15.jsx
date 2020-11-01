import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd';
import { Select, FormLayout } from '@formily/antd-components';
import { Button } from 'antd';
import Printer from '@formily/printer';
import 'antd/dist/antd.css';

const MyComponent = ({ value, onChange }) => {
  return (
    <div>
      <Button
        onClick={() => {
          onChange({
            aa: {
              bb: {
                cc: 123,
                dd: [333, 444],
                ee: 'abcde',
              },
            },
          });
        }}
      >
        点击上传复杂数据
      </Button>
      <code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
    </div>
  );
};

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        MyComponent,
        Select,
      }}
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'wrapper.relation').subscribe(({ value }) => {
          setFieldState(
            'wrapper.{aa:{bb:{cc:destructor1,dd:[ destructor2, destructor3 ],ee}}}',
            (state) => {
              state.visible = value === 2;
            }
          );
        });
      }}
    >
      <Field type="object" name="wrapper">
        <FormLayout labelCol={6} wrapperCol={6}>
          <Field
            name="relation"
            type="number"
            title="隐藏复杂解构"
            default={1}
            enum={[
              { label: '是', value: 1 },
              { label: '否', value: 2 },
            ]}
            x-component="Select"
          />
          <Field
            type="object"
            name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
            title="复杂解构"
            required
            x-component="MyComponent"
          />
        </FormLayout>
      </Field>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);

export default App;
