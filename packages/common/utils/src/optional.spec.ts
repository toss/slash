import { Optional, None } from '.';

function expectOptionalToBeNone<T>(optional: Optional<T>) {
  expect(optional.get).toThrowError('Cannot get from None');
}

describe('Optional', () => {
  [undefined, null].forEach(falsyValue => {
    describe(`given falsy value '${falsyValue}'`, () => {
      const optional = Optional.from(falsyValue);

      it(`should be None`, () => {
        expectOptionalToBeNone(optional);
      });

      it('should return default values when getOrElse is called', () => {
        const defaultValue = 'yayyay';

        expect(optional.getOrElse(defaultValue)).toEqual(defaultValue);
      });

      it('should be None after it is mapped', () => {
        expectOptionalToBeNone(optional.map(() => 'dadsada'));
      });

      it('should be None even after it is flatMapped to Just', () => {
        const truthyVal = 1;

        expectOptionalToBeNone(optional.flatMap(() => Optional.from(truthyVal)));
      });

      it('should be None after it is filtered', () => {
        expectOptionalToBeNone(optional.filter(x => x === falsyValue));
      });

      it('should be next optional value when orElse is called', () => {
        const nextOptional = Optional.from(1);

        expect(optional.orElse(nextOptional)).toEqual(nextOptional);
      });
    });
  });

  [0, '', 'yayyay', { foo: 'bar' }].forEach(<T>(truthyValue: T) => {
    describe(`given truthy value '${JSON.stringify(truthyValue)}'`, () => {
      const optional = Optional.from(truthyValue);

      it(`should be Just, and be able to obtain the value`, () => {
        expect(optional.get()).toEqual(truthyValue);
      });

      it('should be mappable', () => {
        const mappedValue = '1';

        expect(optional.map(() => mappedValue).get()).toEqual(mappedValue);
      });

      it('should be flatMappable to Just', () => {
        const flatMappedOptional = Optional.from('1');

        expect(optional.flatMap(() => flatMappedOptional)).toEqual(flatMappedOptional);
      });

      it('should be flatMappable to None', () => {
        expectOptionalToBeNone(optional.flatMap(() => None()));
      });

      it('should be filtered to Just', () => {
        expect(optional.filter(x => x === truthyValue).get()).toEqual(truthyValue);
      });

      it('should be filtered to None', () => {
        expectOptionalToBeNone(optional.filter(x => x !== truthyValue));
      });

      it('should return its value when getOrElse is called', () => {
        expect(optional.getOrElse('foo')).toEqual(truthyValue);
      });

      it('should be itself when orElse is called', () => {
        expect(optional.orElse(Optional.from(1)).get()).toEqual(optional.get());
      });
    });
  });
});
