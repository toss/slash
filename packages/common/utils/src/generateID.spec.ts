import { generateID } from './generateID';

describe('generateID should', () => {
  it('return different string values each time it is called', () => {
    const id1 = generateID();
    const id2 = generateID();
    const id3 = generateID();

    expect(id1).not.toEqual(id2);
    expect(id1).not.toEqual(id3);
    expect(id2).not.toEqual(id3);
  });

  it('start with the prefix, if given', () => {
    const id = generateID('toss');

    expect(id.startsWith('toss')).toBe(true);
  });
});
