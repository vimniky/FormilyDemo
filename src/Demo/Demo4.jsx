import { useState } from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
} from '@formily/antd';
import { Button } from 'antd';
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
  FormItemGrid,
  FormTextBox,
  FormCard,
  FormBlock,
  FormLayout,
} from '@formily/antd-components'; // 或者@formily/next-components
import 'antd/dist/antd.css';

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
  Upload,
  Range,
  Rating,
  Transfer,
};

const App = () => {
  const [state, setState] = useState({ editable: true });
  return (
    <Printer>
      <SchemaForm
        editable={state.editable}
        labelCol={8}
        wrapperCol={6}
        components={components}
        effects={({ setFieldState }) => {
          FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
            setFieldState('detailCard', (state) => {
              state.visible = value;
            });
          });
        }}
      >
        <FormCard title="基本信息">
          <Field name="aaa" type="string" title="字段1" x-component="Input" />
          <Field
            name="bbb"
            type="number"
            title="控制详细信息显示隐藏"
            enum={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' },
            ]}
            default={true}
            x-component="Select"
          />
          <Field
            name="ccc"
            type="date"
            title="字段3"
            x-component="DatePicker"
          />
          ​
        </FormCard>
        <FormCard title="详细信息" name="detailCard">
          <FormLayout labelCol={8} wrapperCol={12}>
            <FormItemGrid title="字段3" gutter={10} cols={[6, 11]}>
              ​<Field name="ddd" type="number" x-component="NumberPicker" />
              ​<Field name="eee" type="date" x-component="DatePicker" />​
            </FormItemGrid>
            <Field type="object" name="mmm" title="对象字段">
              <FormItemGrid gutter={10} cols={[6, 11]}>
                <Field
                  name="ddd1"
                  default={123}
                  type="number"
                  x-component="NumberPicker"
                />
                <Field
                  name="[startDate,endDate]"
                  type="daterange"
                  x-component="DateRangePicker"
                />
                ​
              </FormItemGrid>
            </Field>
          </FormLayout>
          <FormLayout labelCol={8} wrapperCol={16}>
            <FormTextBox
              title="文本串联"
              text="订%s元/票 退%s元/票 改%s元/票"
              gutter={8}
            >
              <Field
                type="string"
                default={10}
                required
                name="aa1"
                x-props={{ style: { width: 80 } }}
                description="简单描述"
                x-component="Input"
              />
              <Field
                type="number"
                default={20}
                required
                name="aa2"
                description="简单描述"
                x-component="NumberPicker"
              />
              <Field
                type="number"
                default={30}
                required
                name="aa3"
                description="简单描述"
                x-component="NumberPicker"
              />
            </FormTextBox>
          </FormLayout>
          <Field name="aas" type="string" title="字段4" x-component="Input" />​
          <FormBlock title="区块">
            <Field
              name="ddd2"
              type="string"
              title="字段5"
              x-component="Input"
            />
            ​
            <Field
              name="eee2"
              type="string"
              title="字段6"
              x-component="Input"
            />
            ​
          </FormBlock>
        </FormCard>
        ​
        <FormButtonGroup offset={8} sticky>
          ​<Submit>提交</Submit>​
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '详情' : '编辑'}
          </Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

export default App;
