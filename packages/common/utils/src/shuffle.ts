/**
 * @name shuffle
 * @description
 * 인자로 전달받은 Array를 복제하여 순서를 랜덤으로 섞고 리턴합니다.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * ```typescript
 * function shuffle<T>(array: T[]): T[]
 * ```
 *
 * @example
 * shuffle([1, 2, 3]); // [2, 3, 1]...
 */
export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;
  const newArray = Array.from(array);

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex]!, newArray[currentIndex]!];
  }

  return newArray;
}
