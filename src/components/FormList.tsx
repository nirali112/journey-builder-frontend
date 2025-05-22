import { useEffect, useState } from "react";
import { fetchFormGraph } from "../services/api";
import type { FormNode } from "../types/index"

interface Props {
  onSelect: (form: FormNode) => void;
  forms: FormNode[];
}

const FormList = ({ onSelect }: Props) => {
  const [forms, setForms] = useState<FormNode[]>([]);

  useEffect(() => {
    fetchFormGraph().then(setForms).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Available Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <button onClick={() => onSelect(form)}>{form.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
