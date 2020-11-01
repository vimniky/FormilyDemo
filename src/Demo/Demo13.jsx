import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd';
import { DatePicker } from '@formily/antd-components';
import Printer from '@formily/printer';
import 'antd/dist/antd.css';

const components = {
  DateRangePicker: DatePicker.RangePicker,
};

const App = () => (
  <Printer>
    <SchemaForm components={components} labelCol={6} wrapperCol={6}>
      <Field
        type="array"
        name="dateRange"
        title="未解构日期"
        required
        x-component="DateRangePicker"
      />
      <Field
        type="array"
        name="[startDate,endDate]"
        title="已解构日期"
        required
        x-component="DateRangePicker"
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);

export default App;
