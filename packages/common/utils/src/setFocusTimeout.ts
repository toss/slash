/** @tossdocs-ignore */
export async function setFocusTimeout(executeFocus: () => void, delay: number) {
  return new Promise<boolean>(resolve => {
    // focus가 되어 있지 않은 상태에서 async하게 focus하는 건 불가능하지만,
    // focus가 되어 있는 상태에서 focus를 옮기는 건 가능합니다. 이를 이용한 hack입니다.

    // 일단 focus할 fakeInput을 생성하고 보이지 않게 합니다.
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('type', 'text');
    fakeInput.style.position = 'absolute';
    fakeInput.style.opacity = '0';
    fakeInput.style.height = '0';
    fakeInput.style.fontSize = '16px'; // disable auto zoom
    fakeInput.readOnly = true; // 실제 input을 focus하기 전에 keyboard가 올라오지 않게 합니다.
    document.body.prepend(fakeInput);

    fakeInput.focus({
      preventScroll: true, // 최상단으로 scroll되는 걸 막습니다.
    });

    setTimeout(() => {
      executeFocus();
      fakeInput.remove();
      resolve(true);
    }, delay);
  });
}
