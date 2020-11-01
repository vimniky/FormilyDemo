import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  FormPath,
} from '@formily/antd';
import { ArrayTable, Input } from '@formily/antd-components';
import { Button } from 'antd';
import Printer from '@formily/printer';
import 'antd/dist/antd.css';

const { onFieldChange$ } = FormEffectHooks;

const actions = createFormActions();

const App = () => {
  return (
    <Printer>
      <SchemaForm
        actions={actions}
        components={{ ArrayTable, Input }}
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{
          array: [
            { aa: true, bb: '123' },
            { aa: false, bb: '321' },
          ],
        }}
        effects={({ setFieldState }) => {
          onFieldChange$('array.*.aa').subscribe(({ name, value }) => {
            setFieldState(
              FormPath.transform(name, /\d/, ($1) => {
                return `array.${$1}.bb`;
              }),
              (state) => {
                console.log(name, value, state.name);
                state.visible = !!value;
              }
            );
          });
        }}
      >
        <Field type="array" name="array" title="Name" x-component="ArrayTable">
          <Field type="object">
            <Field
              type="string"
              name="aa"
              title="控制相邻字段显示隐藏"
              enum={[
                { label: '显示', value: true },
                { label: '隐藏', value: false },
              ]}
              x-component="Input"
            />
            <Field type="string" name="bb" title="BB" x-component="Input" />
          </Field>
        </Field>
        <FormButtonGroup>
          <Button
            onClick={() => {
              const mutators = actions.createMutators('array');
              mutators.push({});
            }}
          >
            Add
          </Button>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  );
};

export default App;
