# vfup-nice-modal-react

此项目基于 [@ebay/nice-modal-react](https://github.com/eBay/nice-modal-react)。

主要的改进是支持在微信小程序无法公用渲染节点环境中使用 nice-modal-react。

支持 taro 框架，并且理论上支持 remax 等其他使用 react 编写小程序的框架。

## 用法

使用此 library 需要对`@ebay/nice-modal-react` 有基本的了解。

将 `@ebay/nice-modal-react` 换成 `vfup-nice-modal-react` 即可。

## taro react 微信小程序使用例子

微信小程序中无法通过在 App 组件中使用渲染节点。
不过可以通过封装 BasePage 高阶组件包裹 Page 的方式达到类似的效果。

### 具体代码

- 封装`BasePage`组件

'src/layout/BasePage.tsx' 内容

```tsx
/* eslint-disable react-hooks/rules-of-hooks */
import { Provider, ProviderHandle } from 'vfup-nice-modal-react';
import { useDidShow } from '@tarojs/taro';
import { useRef } from 'react';

export default function BasePage(Page: any) {
  return (props) => {
    const ref = useRef<ProviderHandle>();
    useDidShow(() => {
      ref.current && ref.current.reset();
    });
    return (
      <Provider ref={ref}>
        <Page {...props} />
      </Provider>
    );
  };
}
```

- 包裹页面组件

'index/index.tsx' 内容

```tsx
import { Text, View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { show } from 'vfup-nice-modal-react';
// 你自己的弹窗
import ModalDemo from '@/components/ModalDemo';
import BasePage from '@/layout/BasePage';
import './index.scss';

export default BasePage(function Index() {
  const onClick_showModal = () => {
    show(ModalDemo, {
      // ModalDemo 的props
    });
  };

  return (
    <View className="index">
      <View>
        <Text onClick={onClick_showModal}>show modal!</Text>
      </View>
    </View>
  );
});
```
