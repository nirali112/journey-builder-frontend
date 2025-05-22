import React from "react";
import type { FormNode, Field } from "../types";

type PrefillMapping = {
  [fieldName: string]: {
    fromForm: string;
    fromField: string;
  };
};

interface Props {
  form: FormNode;
  mapping: PrefillMapping;
  onOpenModal: (field: Field) => void;
  onClear: (fieldName: string) => void;
}

const PrefillConfigPanel = ({ form, mapping, onOpenModal, onClear }: Props) => {
  return (
    <div>
      <h3>Prefill fields for this form</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {form.fields.map((field) => (
          <li key={field.id} style={{ marginBottom: "8px" }}>
            <div
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => onOpenModal(field)}
            >
              <span>
                {field.name}
                {mapping[field.name] && (
                  <>: {mapping[field.name].fromForm}.{mapping[field.name].fromField}</>
                )}
              </span>
              {mapping[field.name] && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear(field.name);
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrefillConfigPanel;
