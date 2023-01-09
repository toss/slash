/**
 * @name setFocusTimeout
 * @description
 * 일정 시간의 delay 후에 input.focus를 주고 싶은 경우가 있습니다.
 * 하지만, Mobile Safari에서 async function 내에서 input.focus를 할 경우(Task Queue를 이용해 실행되는) focus가 제대로 작동하지 않습니다.
 * Hacky하게 이 문제를 해결하는 함수입니다.
 * Ref: https://stackoverflow.com/questions/12204571/mobile-safari-javascript-focus-method-on-inputfield-only-works-with-click
 *
 * ```typescript
 * function setFocusTimeout(
 *   // async하게 실행할 focus 로직이 포함된 callback
 *   executeFocus: () => void,
 *   // focus를 실행하기 전에 지연시킬 시간(단위: ms)
 *   delay: number,
 * ): Promise<boolean>;
 * ```
 *
 * @example
 * setFocusTimeout(() => {
 *   input$.focus()
 * }, 3000)
 */
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
