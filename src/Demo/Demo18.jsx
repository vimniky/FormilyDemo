/* eslint-disable react-hooks/rules-of-hooks */

import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  createEffectHook,
  Submit,
  Reset,
  FormPath,
} from '@formily/antd';
import {
  Input,
  Select,
  NumberPicker,
  Password,
} from '@formily/antd-components';

import Printer from '@formily/printer';
import { combineLatest } from 'rxjs/operators';
import { merge } from 'rxjs';

const { onFieldValueChange$, onFormMount$, onFieldInit$ } = FormEffectHooks;

const useOneToManyEffects = () => {
  const { setFieldState } = createFormActions();

  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('*(bb,cc,dd)', (state) => {
      state.visible = value;
    });
  });
};

const OneToMany = () => {
  return (
    <Printer>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        effects={() => {
          useOneToManyEffects();
        }}
      >
        <FormItem
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false },
          ]}
        />
        <FormItem name="bb" title="BB" component={Input} />
        <FormItem name="cc" title="CC" component={Input} />
        <FormItem name="dd" title="DD" component={Input} />
      </Form>
    </Printer>
  );
};

const useManyToOneEffects = () => {
  const { setFieldState } = createFormActions();
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('aa', (state) => {
      state.visible = value;
    });
  });
  onFieldValueChange$('cc').subscribe(({ value }) => {
    setFieldState('aa', (state) => {
      state.value = value;
    });
  });
};

const ManyToOne = () => {
  return (
    <Printer>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        effects={() => {
          useManyToOneEffects();
        }}
      >
        <FormItem name="aa" title="AA" component={Input} />
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false },
          ]}
          initialValue={false}
          name="bb"
          title="BB"
          component={Select}
        />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  );
};

const customEvent$ = createEffectHook('CUSTOM_EVENT');

const useMultiDepsEffects = () => {
  const { setFieldState, dispatch } = createFormActions();

  onFormMount$().subscribe(() => {
    setTimeout(() => {
      dispatch('CUSTOM_EVENT', true);
    }, 3000);
  });

  onFieldValueChange$('aa')
    .pipe(combineLatest(customEvent$()))
    .subscribe(([{ value, values }, visible]) => {
      setFieldState('bb', (state) => {
        state.visible = visible;
      });
      setFieldState('cc', (state) => {
        state.visible = value;
        if (values[1] && values[1].otherInfo) {
          state.value = values[1].otherInfo;
        }
      });
    });
};

const MultipleDeps = () => {
  return (
    <Printer>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        effects={() => {
          useMultiDepsEffects();
        }}
      >
        <FormItem
          dataSource={[
            { label: 'visible', value: true, otherInfo: '123' },
            { label: 'hidden', value: false, otherInfo: '321' },
          ]}
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
        />
        <FormItem name="bb" visible={false} title="BB" component={Input} />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  );
};
const useChainEffects = () => {
  const { setFieldState } = createFormActions();
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('bb', (state) => {
      state.visible = value;
    });
  });
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('cc', (state) => {
      state.visible = value;
    });
  });
};

const Chained = () => {
  return (
    <Printer>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        effects={() => {
          useChainEffects();
        }}
      >
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false },
          ]}
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
        />
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false },
          ]}
          initialValue={false}
          name="bb"
          title="BB"
          component={Select}
        />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  );
};

const useCyclicLinkageEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  onFieldValueChange$('total').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('count', (state) => {
      const price = getFieldState('price', (state) => state.value);
      if (!price) return;
      state.value = value / price;
    });
    setFieldState('price', (state) => {
      const count = getFieldState('count', (state) => state.value);
      if (!count) return;
      state.value = value / count;
    });
  });
  onFieldValueChange$('price').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('total', (state) => {
      const count = getFieldState('count', (state) => state.value);
      if (!count) return;
      state.value = value * count;
    });
    setFieldState('count', (state) => {
      const total = getFieldState('total', (state) => state.value);
      if (!total) return;
      state.value = total / value;
    });
  });
  onFieldValueChange$('count').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('total', (state) => {
      const price = getFieldState('price', (state) => state.value);
      if (!price) return;
      state.value = value * price;
    });
    setFieldState('price', (state) => {
      const total = getFieldState('total', (state) => state.value);
      if (!total) return;
      state.value = total / value;
    });
  });
};

const Cyclic = () => (
  <Printer>
    <Form
      effects={() => {
        useCyclicLinkageEffects();
      }}
      onChange={(v) => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={(v) => console.log(v)}
    >
      <FormItem
        name="total"
        type="number"
        required
        title="Total"
        component={NumberPicker}
      />
      <FormItem
        name="count"
        type="number"
        required
        title="Count"
        component={NumberPicker}
      />
      <FormItem
        name="price"
        type="number"
        required
        title="Price"
        component={NumberPicker}
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
);
const useLinkageValidateEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  onFieldValueChange$('*(password,confirm)').subscribe((fieldState) => {
    const selfName = fieldState.name;
    const selfValue = fieldState.value;
    const otherName = selfName === 'password' ? 'confirm' : 'password';
    const otherValue = getFieldState(otherName, (state) => state.value);
    setFieldState(otherName, (state) => {
      if (selfValue && otherValue && selfValue !== otherValue) {
        state.errors = '两次密码输入不一致';
      } else {
        state.errors = '';
      }
    });
    setFieldState(selfName, (state) => {
      if (selfValue && otherValue && selfValue !== otherValue) {
        state.errors = '两次密码输入不一致';
      } else {
        state.errors = '';
      }
    });
  });
};

const Validation = () => (
  <Printer>
    <Form
      labelCol={6}
      wrapperCol={6}
      effects={() => {
        useLinkageValidateEffects();
      }}
    >
      <FormItem name="username" title="用户名" required component={Input} />
      <FormItem
        name="password"
        title="密码"
        checkStrength
        help={
          <ul>
            <li>1. 长度不小于8个</li>
            <li>2. 必须包含大小写数字符号</li>
          </ul>
        }
        required
        component={Password}
      />
      <FormItem
        name="confirm"
        title="确认密码"
        checkStrength
        required
        component={Password}
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
);

const createLinkageUtils = () => {
  const { setFieldState } = createFormActions();
  const linkage = (key, defaultValue) => (path, value) =>
    setFieldState(path, (state) => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue);
    });
  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    value: linkage('value'),
  };
};

const useAsyncLinkageEffect = () => {
  const linkage = createLinkageUtils();
  onFieldValueChange$('aa').subscribe((fieldState) => {
    if (!fieldState.value) return;
    linkage.show('bb');
    linkage.loading('bb');
    setTimeout(() => {
      linkage.loaded('bb');
      linkage.enum('bb', ['1111', '2222']);
      linkage.value('bb', '1111');
    }, 1000);
  });
  merge(onFieldValueChange$('bb'), onFieldInit$('bb')).subscribe(
    (fieldState) => {
      if (!fieldState.value) return linkage.hide('cc');
      linkage.show('cc');
      linkage.value('cc', fieldState.value);
    }
  );
};

const Async = () => (
  <Printer>
    <Form
      effects={() => {
        useAsyncLinkageEffect();
      }}
      onChange={(v) => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={(v) => console.log(v)}
    >
      <FormItem
        name="aa"
        dataSource={['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']}
        title="AA"
        component={Select}
      />
      <FormItem
        name="bb"
        title="BB"
        dataSource={[]}
        visible={false}
        hasFeedback
        component={Select}
      />
      <FormItem name="cc" title="CC" component={Input} />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
);

const App = () => {
  return [
    {
      Component: OneToMany,
      name: '一对多联动',
    },
    {
      Component: ManyToOne,
      name: '多对一联动',
    },
    {
      Component: MultipleDeps,
      name: '多依赖联动',
    },
    {
      Component: Chained,
      name: '链式联动',
    },
    {
      Component: Cyclic,
      name: '循环联动',
    },
    {
      Component: Validation,
      name: '联动校验',
    },
    {
      Component: Async,
      name: '异步联动',
    },
  ].map(({ Component, name }) => (
    <div
      key={name}
      style={{ border: '1px solid #eee', padding: 20, marginBottom: 40 }}
    >
      <h1>{name}</h1>
      <Component />
    </div>
  ));
};

export default App;
