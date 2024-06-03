const originalDocument = document;

export function mockDocumentVisibilityState(visiblityState: Document['visibilityState']) {
  delete (global as any).document;

  global.document = new Proxy(originalDocument, {
    get: (target, name) => {
      if (name === 'visibilityState') {
        return visiblityState;
      }

      return (target as any)[name];
    },
  });

  global.document.dispatchEvent(new Event('visibilitychange'));
}

export function clearMockDocumentVisibilityState() {
  global.document = originalDocument;
}
