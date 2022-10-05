import { groupBy } from './groupBy';

describe('groupBy 함수는', () => {
  const input = [
    { groupName: '부엉이', value: 1 },
    { groupName: '다람쥐', value: 2 },
    { groupName: '너구리', value: 3 },
    { groupName: '너구리', value: 4 },
    { groupName: '너구리', value: 5 },
    { groupName: '부엉이', value: 6 },
  ];

  it('createKey의 return value를 이용해서 item을 묶는다', () => {
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

  it('빈 Array를 넣었을 땐 빈 object를 return한다.', () => {
    expect(groupBy([], ({ someKey }) => someKey)).toEqual({});
  });
});
