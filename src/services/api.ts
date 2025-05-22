import type { FormNode } from "../types";

export const fetchFormGraph = async (): Promise<FormNode[]> => {
  const response = await fetch("http://localhost:3000/api/v1/test/actions/blueprints/test/graph");
  if (!response.ok) throw new Error("Failed to fetch form graph");

  const data = await response.json();

  const formSchemas = new Map<string, any>();
  data.forms.forEach((form: any) => {
    formSchemas.set(form.id, form.field_schema?.properties || {});
  });

  const formNodes: FormNode[] = data.nodes.map((node: any) => {
    const properties = formSchemas.get(node.data.component_id) || {};

    const fields = Object.entries(properties).map(([fieldKey, fieldValue]: [string, any]) => ({
      id: fieldKey,
      name: fieldKey,
      type: fieldValue.type || "unknown",
    }));

    return {
      id: node.id,
      name: node.data.name,
      fields,
      depends_on: node.data.prerequisites || [],
    };
  });

  return formNodes;
};
