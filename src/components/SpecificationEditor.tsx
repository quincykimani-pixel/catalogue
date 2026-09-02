"use client";

export interface Spec {
  name: string;
  value: string;
}

interface Props {
  specifications: Spec[];
  onChange: (specs: Spec[]) => void;
}

export default function SpecificationEditor({ specifications, onChange }: Props) {
  function updateSpec(index: number, field: keyof Spec, value: string) {
    const next = specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    onChange(next);
  }

  function addSpec() {
    onChange([...specifications, { name: "", value: "" }]);
  }

  function removeSpec(index: number) {
    onChange(specifications.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="label-field">Specifications</label>
      <div className="space-y-2">
        {specifications.map((spec, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Name (e.g. Wattage)"
              value={spec.name}
              onChange={(e) => updateSpec(index, "name", e.target.value)}
              className="input-field flex-1"
            />
            <input
              type="text"
              placeholder="Value (e.g. 550W)"
              value={spec.value}
              onChange={(e) => updateSpec(index, "value", e.target.value)}
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="px-3 border border-surface-dim text-status-danger hover:bg-status-danger hover:text-white transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addSpec}
        className="mt-3 text-sm font-medium text-brandgreen-dark hover:underline"
      >
        + Add Specification
      </button>
    </div>
  );
}
