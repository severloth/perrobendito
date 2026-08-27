// Tailwind emite `.relative` despues de `.absolute`, asi que un componente que
// siempre agrega `relative` a su wrapper le gana al `absolute inset-0` que le
// pase quien lo usa. Con esto el caller manda si ya definio un position.
const POSITIONED = /(?:^|\s)(?:absolute|fixed|relative|sticky)(?:\s|$)/;

export function positionClass(className: string) {
  return POSITIONED.test(className) ? "" : "relative";
}
