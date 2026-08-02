import type Lenis from 'lenis';

// Shared handle so the custom scrollbar can drive the same Lenis instance the smooth-scroll hook owns.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
