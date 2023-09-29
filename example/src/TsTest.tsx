// This a test file to check if typescript is working properly

import NiceModal, { useModal, antdModalV5 } from '@ebay/nice-modal-react';

const MyModal1 = NiceModal.create(({ p1, p2 }: { p1: string; p2: number }) => {
  const modal = useModal();
  return (
    <div {...antdModalV5(modal)}>
      <h1>Foo</h1>
      <button onClick={modal.hide}>Close</button>
    </div>
  );
});

const MyModal2 = NiceModal.create(() => {
  const modal = useModal();
  return (
    <div {...antdModalV5(modal)}>
      <h1>Foo</h1>
      <button onClick={modal.hide}>Close</button>
    </div>
  );
});

NiceModal.register('modal-1', MyModal1, { p2: 1 });

export default function TsTest() {
  const modal1 = useModal(MyModal1, { p3: 'foo', p2: 123 });
  modal1.show({ p1: 'foo', p2: 123, p4: 'hello' }); // expected: p4 should not be accepted

  NiceModal.show(MyModal1); // valid?
  NiceModal.show(MyModal1, { p1: 'foo', p2: 123 }); // valid
  NiceModal.show(MyModal1, { p1: 'foo', p2: '123' }); // expected ts error: p2 should be number
  NiceModal.show(MyModal1, { p1: 'foo' }); // unexpected ts error: p2 is already set when register

  const modal1_1 = useModal('modal-1', { p3: 'foo', p2: 123 });
  modal1_1.show();

  const modal2 = useModal(MyModal2);
  modal2.show();
  modal2.show({ p1: 'foo', p2: 123 }); // expected ts error

  return <>hello ts</>;
}