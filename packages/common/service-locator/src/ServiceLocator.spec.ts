import { serviceLocator } from './ServiceLocator';

describe('ServiceLocator', () => {
  describe('register', () => {
    it('should register a named function', () => {
      function fn() {}
      serviceLocator.register(fn);
      expect(serviceLocator.resolve(fn)).toBe(fn);
    });

    it('should register a named arrow function', () => {
      const fn = () => {};
      serviceLocator.register(fn);
      expect(serviceLocator.resolve(fn)).toBe(fn);
    });

    it('should not register an anonynous function', () => {
      expect(() => {
        serviceLocator.register(function () {});
      }).toThrow();
    });

    it('should not register an anonynous arrow function', () => {
      expect(() => {
        serviceLocator.register(() => {});
      }).toThrow();
    });
  });

  describe('get', () => {
    it('should throw an error if the function is not registered', () => {
      function fnyyyyyyy() {}
      expect(() => {
        serviceLocator.resolve(fnyyyyyyy);
      }).toThrow();
    });
  });

  describe('override', () => {
    it('should override the named function', () => {
      const fn = () => 'aa';
      serviceLocator.register(fn);
      serviceLocator.override(fn, () => 'bb');
      expect(serviceLocator.resolve(fn)).not.toBe(fn);
      expect(serviceLocator.resolve(fn)()).toBe('bb');
    });
  });

  describe('reset', () => {
    it('should reset all services', () => {
      const fn = () => 'aa';
      serviceLocator.register(fn);
      serviceLocator.override(fn, () => 'bb');
      function fn2() {}
      serviceLocator.register(fn2);
      serviceLocator.reset();

      expect(serviceLocator.resolve(fn)()).toBe('aa');
      expect(serviceLocator.resolve(fn2)).toBe(fn2);
    });
  });
});
