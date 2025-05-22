import React from "react";
import type { Field, FormNode } from "../types";
import { globalData } from "../data/globalData";

interface Props {
  field: Field;
  onClose: () => void;
  onSelect: (fromFormId: string, fromField: string) => void;
  sourceForms: FormNode[];
}

const PrefillModal = ({ field, onClose, onSelect, sourceForms }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "600px",
          maxHeight: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 12px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
          <h3>Select prefill for <code>{field.name}</code></h3>
        </div>

        <div style={{ padding: "1rem", overflowY: "auto", flex: 1 }}>
          {sourceForms.map((form) => (
            <div key={form.id} style={{ marginBottom: "1rem" }}>
              <strong>{form.name}</strong>
              <ul style={{ paddingLeft: "1rem" }}>
                {form.fields.map((f) => (
                  <li key={f.id}>
                    <button onClick={() => onSelect(form.id, f.name)}>
                      {f.name} ({f.type})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <hr />
          <strong>🌐 Global Data</strong>
          <ul style={{ paddingLeft: "1rem" }}>
            {globalData.map((g) => (
              <li key={g.id}>
                <button onClick={() => onSelect("global", g.name)}>
                  {g.name} ({g.type})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "right", padding: "1rem", borderTop: "1px solid #eee" }}>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PrefillModal;
