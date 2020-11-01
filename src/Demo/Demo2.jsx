import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd'; // 或者 @formily/next
import Printer from '@formily/printer';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
} from '@formily/antd-components'; // 或者@formily/next-components

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  TimeRangePicker: TimePicker.RangePicker,
  Upload,
  Range,
  Rating,
  Transfer,
};

const App = () => (
  <Printer>
    <SchemaForm
      onSubmit={(values) => {
        console.log('values', values);
      }}
      labelCol={5}
      wrapperCol={14}
      components={components}
    >
      <Field type="string" title="String" name="string" x-component="Input" />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        title="Radio"
        name="radio"
        x-component="Radio"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        title="Select"
        name="select"
        x-component="Select"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        title="Checkbox"
        name="checkbox"
        x-component="Checkbox"
      />
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="TextArea"
      />
      <Field
        type="number"
        title="数字选择"
        name="number"
        x-component="NumberPicker"
      />
      <Field
        type="boolean"
        title="开关选择"
        name="boolean"
        x-component="Switch"
      />
      <Field
        type="string"
        title="日期选择"
        name="date"
        x-component="DatePicker"
      />
      <Field
        type="array<date>"
        title="日期范围"
        default={['2018-12-19', '2018-12-19']}
        name="daterange"
        x-component="DateRangePicker"
      />
      <Field type="string" title="年份" name="year" x-component="YearPicker" />
      <Field
        type="string"
        title="月份"
        name="month"
        x-component="MonthPicker"
      />
      <Field type="string" title="时间" name="time" x-component="TimePicker" />
      <Field
        type="string"
        title="时间范围"
        name="timerange"
        x-component="TimeRangePicker"
      />
      <Field type="string" title="周" name="week" x-component="WeekPicker" />
      <Field
        type="array"
        title="卡片上传文件"
        name="upload"
        x-component-props={{ listType: 'card' }}
        x-component="Upload"
      />
      <Field
        type="array"
        title="拖拽上传文件"
        name="upload2"
        x-component-props={{ listType: 'dragger' }}
        x-component="Upload"
      />
      <Field
        type="array"
        title="普通上传文件"
        name="upload3"
        x-component-props={{ listType: 'text' }}
        x-component="Upload"
      />
      <Field
        type="number"
        title="范围选择"
        name="range"
        x-component-props={{ min: 0, max: 1024, marks: [0, 1024] }}
        x-component="Range"
      />
      <Field
        type="number"
        enum={[
          { key: 1, title: '选项1' },
          { key: 2, title: '选项2' },
        ]}
        x-component-props={{ render: (item) => item.title }}
        title="穿梭框"
        name="transfer"
        x-component="Transfer"
      />
      <Field type="number" title="等级" name="rating" x-component="Rating" />
      <FormButtonGroup offset={5}>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);

export default App;
