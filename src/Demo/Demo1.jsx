import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd'; // 或者 @formily/next
import { Input } from '@formily/antd-components'; // 或者@formily/next-components
import { fetch } from 'mfetch';
import { Table } from 'antd';

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters,
    },
  })
    .then((res) => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        ...pagination,
        total: 200,
      };
    });
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const App = () => {
  const { form, table } = useFormTableQuery(service);
  console.log(form, table);
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={(record) => record.login.uuid}
      />
    </>
  );
};

export default App;
