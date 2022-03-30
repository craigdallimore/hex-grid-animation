export type State = {};

const state: State = {};

export function updateState(tick: number): State {
  console.log(tick);
  return state;
}
