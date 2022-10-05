/** @tossdocs-ignore */
import { format } from 'date-fns';
import { toInsuranceAge } from '.';

const today = format(new Date(), 'yyyy-MM-dd');

it('toInsuranceAge', () => {
  expect(toInsuranceAge('1996-07-29', '2019-04-02')).toEqual(23);
  expect(toInsuranceAge('1991-05-10', '2017-04-16')).toEqual(26);
  expect(toInsuranceAge('1991-05-10', '2017-11-10')).toEqual(27);
  expect(toInsuranceAge('1978-08-08', '2013-10-22')).toEqual(35);
  expect(toInsuranceAge('1978-02-08', '2013-10-22')).toEqual(36);
  expect(toInsuranceAge('1996-07-29', today)).toEqual(toInsuranceAge('1996-07-29'));
});
