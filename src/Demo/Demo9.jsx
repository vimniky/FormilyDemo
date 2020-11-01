import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  FormProvider,
  FormSpy,
  Submit,
  Reset,
} from '@formily/antd';
import { Button } from 'antd';
import { Input, Select } from '@formily/antd-components';
import 'antd/dist/antd.css';

const components = {
  Input,
  Select,
};

const actions = createFormActions();

const App = () => {
  return (
    <FormProvider>
      <SchemaForm
        actions={actions}
        labelCol={5}
        wrapperCol={14}
        components={components}
        effects={($, { setFieldState }) => {
          $('customEvent').subscribe(() => {
            setFieldState('cc', (state) => {
              state.visible = !state.visible;
            });
          });
        }}
      >
        <Field type="string" title="BB" name="bb" x-component="Input" />
        <Field type="string" title="CC" name="cc" x-component="Input" />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
        <FormSpy
          initialState={{
            actions: [],
          }}
          reducer={(state, action) => {
            return {
              actions: state.actions.concat(action),
            };
          }}
        >
          {({ state }) => {
            const { actions } = state;
            return (
              <div>
                全量生命周期
                <div
                  style={{
                    margin: 20,
                    height: 100,
                    overflow: 'auto',
                    border: '1px solid red',
                    padding: 10,
                  }}
                >
                  {(actions || []).map((action, key) => {
                    return <div key={key}>{action.type}</div>;
                  })}
                </div>
              </div>
            );
          }}
        </FormSpy>
        <FormSpy
          selector="*(onFormChange,onFieldChange)"
          initialState={{
            actions: [],
          }}
          reducer={(state, action) => {
            return {
              actions: state.actions.concat(action),
            };
          }}
        >
          {({ state }) => {
            const { actions } = state;
            return (
              <div>
                指定生命周期
                <div
                  style={{
                    margin: 20,
                    height: 100,
                    overflow: 'auto',
                    border: '1px solid red',
                    padding: 10,
                  }}
                >
                  {(actions || []).map((action, key) => {
                    return <div key={key}>{action.type}</div>;
                  })}
                </div>
              </div>
            );
          }}
        </FormSpy>
      </SchemaForm>
      <FormSpy
        selector="customEvent"
        initialState={{
          actions: [],
        }}
        reducer={(state, action) => {
          return {
            actions: state.actions.concat(action),
          };
        }}
      >
        {({ state }) => {
          const { actions } = state;
          return (
            <div>
              指定生命周期
              <div
                style={{
                  margin: 20,
                  height: 100,
                  overflow: 'auto',
                  border: '1px solid red',
                  padding: 10,
                }}
              >
                {(actions || []).map((action, key) => {
                  return <div key={key}>{action.type}</div>;
                })}
              </div>
            </div>
          );
        }}
      </FormSpy>
      <FormButtonGroup align="center">
        <Button
          onClick={() => {
            actions.dispatch('customEvent');
          }}
        >
          自定义生命周期
        </Button>
      </FormButtonGroup>
    </FormProvider>
  );
};

export default App;
