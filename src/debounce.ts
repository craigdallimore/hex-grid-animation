export default function debounce(f: () => void, n: number): () => void {
  let timer: number | undefined;
  return function debounced() {
    window.clearTimeout(timer);
    timer = window.setTimeout(f, n);
  };
}
