import { format } from 'date-fns';
import { toInternationalAge } from '.';

describe('Age', () => {
  const today = format(new Date(), 'yyyy-MM-dd');

  test('toInternationalAge', () => {
    expect(toInternationalAge('1996-07-29', '2019-04-16')).toEqual(22);
    expect(toInternationalAge('1996-07-29', '2019-07-29')).toEqual(23);
    expect(toInternationalAge('1996-07-29', today)).toEqual(toInternationalAge('1996-07-29'));
  });
});
