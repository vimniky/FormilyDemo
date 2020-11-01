import { Form, FormItem, FormEffectHooks } from '@formily/antd';
import { MegaLayout, Input, DatePicker } from '@formily/antd-components';

const { onFieldChange$ } = FormEffectHooks;

const LayoutA = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>不撑满（默认）</h5>

      <MegaLayout labelCol={4}>
        <FormItem name="defaultFull" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>撑满</h5>

      <MegaLayout labelCol={4} full>
        <FormItem name="full" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>label在顶部，撑满</h5>

      <MegaLayout labelAlign="top" full>
        <FormItem name="fullTop" title="标题" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const LayoutB = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>
        labelCol: undefined / wrapperCol: undefined{' '}
      </h5>

      <MegaLayout full>
        <FormItem name="lc1" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelCol: 4 / wrapperCol: undefined{' '}
      </h5>

      <MegaLayout labelCol={4} full>
        <FormItem name="lc2" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelCol: undefined / wrapperCol: 20{' '}
      </h5>

      <MegaLayout wrapperCol={20} full>
        <FormItem name="lc3" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>labelCol: 4 / wrapperCol: 20</h5>

      <MegaLayout labelCol={4} wrapperCol={20} full>
        <FormItem name="lc4" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>labelCol: 12 / wrapperCol: 12</h5>

      <MegaLayout labelCol={12} wrapperCol={12} full>
        <FormItem name="lc5" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>labelCol: 20 / wrapperCol: 4</h5>

      <MegaLayout labelCol={20} wrapperCol={4} full>
        <FormItem name="lc6" title="标题" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const LayoutC = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>
        labelWidth: undefined / wrapperWidth: undefined{' '}
      </h5>

      <MegaLayout full>
        <FormItem name="lw1" title="lw1" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelWidth: 200px / wrapperWidth: undefined{' '}
      </h5>

      <MegaLayout labelWidth={200} full>
        <FormItem name="lw2" title="lw2" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelWidth: undefined / wrapperWidth: 200px{' '}
      </h5>

      <MegaLayout wrapperWidth={200} full>
        <FormItem name="lw3" title="lw3" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelWidth: 200px / wrapperWidth: 400px
      </h5>

      <MegaLayout labelWidth={200} wrapperWidth={400} full>
        <FormItem name="lw4" title="lw4" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelWidth: 300px / wrapperWidth: 300px
      </h5>

      <MegaLayout labelWidth={300} wrapperWidth={300} full>
        <FormItem name="lw5" title="lw5" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        labelWidth: 400px / wrapperWidth: 200px
      </h5>

      <MegaLayout labelWidth={400} wrapperWidth={200} full>
        <FormItem name="lw6" title="lw6" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const LayoutD = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>无label + 辅助文案</h5>

      <MegaLayout
        addonBefore="容器before"
        addonAfter="容器after"
        help="容器description"
        full
      >
        <FormItem name="addon1" title="组件标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>label + 辅助文案</h5>

      <MegaLayout
        label="容器标题"
        addonBefore="容器before"
        addonAfter="容器after"
        help="容器description"
        full
      >
        <FormItem name="addon2" title="组件标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>单纯表单字段（label + 辅助文案）</h5>

      <MegaLayout full>
        <FormItem
          name="itemAddon"
          title="组件标题"
          component={DatePicker}
          mega-props={{
            addonBefore: '组件before',
            addonAfter: '组件after',
          }}
          help="组件description"
        />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        label + 辅助文案 + 表单字段（label + 辅助文案）
      </h5>

      <MegaLayout
        label="容器标题"
        addonBefore="容器before"
        addonAfter="容器after"
        help="容器description"
        full
      >
        <FormItem
          name="itemAddon"
          title="组件标题"
          component={DatePicker}
          mega-props={{
            addonBefore: '组件before',
            addonAfter: '组件after',
          }}
          help="组件description"
        />
      </MegaLayout>
    </Form>
  );
};

const LayoutE = () => {
  return (
    <div>
      <Form size="small">
        <h5 style={{ marginTop: '16px' }}>小</h5>
        <MegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          help="容器description"
          full
        >
          <FormItem
            name="itemAddon"
            title="组件标题"
            component={DatePicker}
            mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after',
            }}
            help="组件description"
          />
        </MegaLayout>
      </Form>

      <Form>
        <h5 style={{ marginTop: '16px' }}>中</h5>
        <MegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          help="容器description"
          full
        >
          <FormItem
            name="itemAddon"
            title="组件标题"
            component={DatePicker}
            mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after',
            }}
            help="组件description"
          />
        </MegaLayout>
      </Form>

      <Form size="large">
        <h5 style={{ marginTop: '16px' }}>大</h5>
        <MegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          help="容器description"
          full
        >
          <FormItem
            name="itemAddon"
            title="组件标题"
            component={DatePicker}
            mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after',
            }}
            help="组件description"
          />
        </MegaLayout>
      </Form>
    </div>
  );
};

const LayoutF = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>最简单的inline布局</h5>

      <MegaLayout inline>
        <FormItem name="is1" title="标题" component={DatePicker} />
        <FormItem name="is2" title="标题" component={DatePicker} />
        <FormItem name="is3" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        inline + labelWidth: 120 + wrapperWidth: 200
      </h5>

      <MegaLayout inline labelWidth={120} wrapperWidth={200} full>
        <FormItem name="il2w2f1" title="标题" component={DatePicker} />
        <FormItem name="il2w2f2" title="标题" component={DatePicker} />
        <FormItem name="il2w2f3" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>inline + labelAlign: top</h5>

      <MegaLayout inline labelAlign="top">
        <FormItem name="ilt1" title="标题" component={DatePicker} />
        <FormItem name="ilt2" title="标题" component={DatePicker} />
        <FormItem name="ilt3" title="标题" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200
      </h5>

      <MegaLayout
        inline
        labelAlign="top"
        labelWidth={120}
        wrapperWidth={200}
        full
      >
        <FormItem name="iltl2w21" title="标题" component={DatePicker} />
        <FormItem name="iltl2w22" title="标题" component={DatePicker} />
        <FormItem name="iltl2w23" title="标题" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const LayoutG = () => {
  return (
    <Form>
      <h5 style={{ marginTop: '16px' }}>最简单的grid栅格布局</h5>

      <MegaLayout grid full>
        <FormItem name="g1" title="标题1" component={DatePicker} />
        <FormItem
          mega-props={{ span: 2 }}
          name="g2"
          title="标题2"
          component={DatePicker}
        />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>grid + autoRow 自动换行</h5>

      <MegaLayout grid full autoRow>
        <FormItem
          mega-props={{ span: 2 }}
          name="ga1"
          title="标题1"
          component={DatePicker}
        />
        <FormItem name="ga2" title="标题2" component={DatePicker} />
        <FormItem name="ga3" title="标题3" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        grid + autoRow 自动换行 + labelWidth: 100
      </h5>

      <MegaLayout grid full autoRow labelWidth={100}>
        <FormItem
          mega-props={{ span: 2 }}
          name="gal1"
          title="标题1"
          component={DatePicker}
        />
        <FormItem name="gal2" title="标题2" component={DatePicker} />
        <FormItem name="gal3" title="标题3" component={DatePicker} />
      </MegaLayout>

      <h5 style={{ marginTop: '16px' }}>
        grid + autoRow 自动换行 + label在顶部
      </h5>

      <MegaLayout grid full autoRow labelAlign="top">
        <FormItem
          mega-props={{ span: 2 }}
          name="galt1"
          title="标题1"
          component={DatePicker}
        />
        <FormItem name="galt2" title="标题2" component={DatePicker} />
        <FormItem name="galt3" title="标题3" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const LayoutH = () => {
  return (
    <Form
      effects={($, actions) => {
        onFieldChange$('vvv1').subscribe(({ value }) => {
          actions.setFieldState(
            'vvv2',
            (state) => (state.visible = value === '1')
          );
          actions.setFieldState(
            'vvv3',
            (state) => (state.display = value === '2')
          );
        });
      }}
    >
      <h5 style={{ marginTop: '16px' }}>最简单的grid栅格布局</h5>
      <MegaLayout autoRow grid full>
        <FormItem name="vvv1" title="标题1" component={Input} />
        <FormItem name="vvv2" title="标题2" component={DatePicker} />
        <FormItem name="vvv3" title="标题3" component={DatePicker} />
        <FormItem name="vvv4" title="标题4" component={DatePicker} />
        <FormItem name="vvv5" title="标题5" component={DatePicker} />
        <FormItem name="vvv6" title="标题6" component={DatePicker} />
      </MegaLayout>
    </Form>
  );
};

const App = () => {
  return [
    LayoutA,
    LayoutB,
    LayoutC,
    LayoutD,
    LayoutE,
    LayoutF,
    LayoutG,
    LayoutH,
  ].map((Layout, idx) => (
    <div
      key={idx}
      style={{ margin: '40px 0', border: '1px solid #eee', padding: 20 }}
    >
      <h1 style={{ borderBottom: '1px solid #eee' }}>{idx + 1}</h1>
      <Layout />
    </div>
  ));
};

export default App;
