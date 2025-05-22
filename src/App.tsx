import { useState, useEffect } from "react";
import FormList from "./components/FormList";
import PrefillConfigPanel from "./components/PrefillConfigPanel";
import PrefillModal from "./components/PrefillModal";
import { fetchFormGraph } from "./services/api";
import { getUpstreamForms } from "./utils/graph";
import type { FormNode, Field } from "./types";

function App() {
  const [forms, setForms] = useState<FormNode[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormNode | null>(null);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const [prefillMapping, setPrefillMapping] = useState<{
    [formId: string]: { [fieldName: string]: { fromForm: string; fromField: string } };
  }>({});

  useEffect(() => {
    fetchFormGraph()
      .then(setForms)
      .catch((err) => console.error("Failed to load forms", err));
  }, []);

  const handleClearMapping = (fieldName: string) => {
    if (!selectedForm) return;
    setPrefillMapping((prev) => {
      const copy = { ...prev[selectedForm.id] };
      delete copy[fieldName];
      return { ...prev, [selectedForm.id]: copy };
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Journey Builder</h1>

      <FormList forms={forms} onSelect={setSelectedForm} />

      {selectedForm && (
        <div>
          <h2>Selected: {selectedForm.name}</h2>
          <PrefillConfigPanel
            form={selectedForm}
            mapping={prefillMapping[selectedForm.id] || {}}
            onOpenModal={(field: Field) => setSelectedField(field)}
            onClear={handleClearMapping}
          />
        </div>
      )}

      {selectedField && selectedForm && (
        <PrefillModal
          field={selectedField}
          onClose={() => setSelectedField(null)}
          onSelect={(fromFormId, fromFieldName) => {
            setPrefillMapping((prev) => ({
              ...prev,
              [selectedForm.id]: {
                ...prev[selectedForm.id],
                [selectedField.name]: {
                  fromForm: fromFormId,
                  fromField: fromFieldName,
                },
              },
            }));
            setSelectedField(null);
          }}
          sourceForms={getUpstreamForms(forms, selectedForm.id)}
        />
      )}
    </div>
  );
}

export default App;
