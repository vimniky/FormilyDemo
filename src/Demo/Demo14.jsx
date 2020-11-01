import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd';
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
      }}
      labelCol={6}
      wrapperCol={6}
    >
      <Field
        type="object"
        name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
        title="复杂解构"
        required
        x-component="MyComponent"
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);

export default App;
