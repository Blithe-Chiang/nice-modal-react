### 修改代码实现，支持 taro 中多页面使用

```tsx
/* eslint-disable react-hooks/rules-of-hooks */
import { NiceModalState, Provider, reducer } from '@ebay/nice-modal-react';
import { useDidShow } from '@tarojs/taro';
import { useReducer, useRef } from 'react';

const initialState: NiceModalState = {};

export default function BasePage(Comp: any) {
  return (props) => {
    const [modals, dispatch] = useReducer(reducer, initialState);
    const ref = useRef();
    useDidShow(() => {
      setTimeout(() => {
        ref.current?.updateDispatch();
      }, 0);
    });
    return (
      <Provider ref={ref} dispatch={dispatch} modals={modals}>
        <Comp {...props} />
      </Provider>
    );
  };
}
```
