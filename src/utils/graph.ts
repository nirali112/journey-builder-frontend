import type { FormNode } from "../types";

export const getUpstreamForms = (forms: FormNode[], currentId: string): FormNode[] => {
  const visited = new Set<string>();
  const queue = [currentId];
  const map = new Map(forms.map((f) => [f.id, f]));

  while (queue.length > 0) {
    const node = map.get(queue.shift()!);
    if (!node) continue;
    for (const dep of node.depends_on) {
      if (!visited.has(dep)) {
        visited.add(dep);
        queue.push(dep);
      }
    }
  }

  return forms.filter((f) => visited.has(f.id));
};
