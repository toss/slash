import { groupBy } from './groupBy';

describe('The groupBy function', () => {
  const input = [
    { groupName: '부엉이', value: 1 },
    { groupName: '다람쥐', value: 2 },
    { groupName: '너구리', value: 3 },
    { groupName: '너구리', value: 4 },
    { groupName: '너구리', value: 5 },
    { groupName: '부엉이', value: 6 },
  ];

  it('groups items using the return value of createKey', () => {
    expect(groupBy(input, ({ groupName }) => groupName)).toEqual({
      부엉이: [
        { groupName: '부엉이', value: 1 },
        { groupName: '부엉이', value: 6 },
      ],
      다람쥐: [{ groupName: '다람쥐', value: 2 }],
      너구리: [
        { groupName: '너구리', value: 3 },
        { groupName: '너구리', value: 4 },
        { groupName: '너구리', value: 5 },
      ],
    });
  });

  it('returns an empty object when given an empty array', () => {
    expect(groupBy([], ({ someKey }) => someKey)).toEqual({});
  });
});
