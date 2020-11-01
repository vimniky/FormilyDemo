import { useEffect } from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/antd';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const actions = createFormActions();

const App = () => {
  useEffect(() => {
    actions.setFieldState('name', (state) => {
      state.value = 'First Name';
    });
  }, []);

  return (
    <SchemaForm
      actions={actions}
      components={{ Input }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  );
};

export default App;
