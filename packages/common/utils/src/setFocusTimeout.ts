/** @tossdocs-ignore */
export async function setFocusTimeout(executeFocus: () => void, delay: number) {
  return new Promise<boolean>(resolve => {
    // It is impossible to focus asynchronously when it is not in focus,
    // but it is possible to move focus while it is in focus. This is a hack that uses this.

    // Create a fakeInput to focus and make it invisible.
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('type', 'text');
    fakeInput.style.position = 'absolute';
    fakeInput.style.opacity = '0';
    fakeInput.style.height = '0';
    fakeInput.style.fontSize = '16px'; // To disable auto zoom.
    fakeInput.readOnly = true; // Prevents the keyboard from coming up before actually focusing the input.
    document.body.prepend(fakeInput);

    fakeInput.focus({
      preventScroll: true, // Prevents scrolling to the top.
    });

    setTimeout(() => {
      executeFocus();
      fakeInput.remove();
      resolve(true);
    }, delay);
  });
}
