"use client";

import { useState } from "react";
import { Camera, Mic, Save, Zap } from "lucide-react";

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  manualSteps: number;
  repetition: 'low' | 'medium' | 'high';
  notes: string;
}

export default function ProcessCapture() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [currentStep, setCurrentStep] = useState<Partial<ProcessStep>>({
    name: "",
    description: "",
    duration: 0,
    manualSteps: 1,
    repetition: 'medium',
    notes: ""
  });

  const addStep = () => {
    if (!currentStep.name) return;

    const newStep: ProcessStep = {
      id: Date.now().toString(),
      name: currentStep.name!,
      description: currentStep.description || "",
      duration: currentStep.duration || 0,
      manualSteps: currentStep.manualSteps || 1,
      repetition: currentStep.repetition || 'medium',
      notes: currentStep.notes || ""
    };

    setSteps([...steps, newStep]);
    setCurrentStep({
      name: "",
      description: "",
      duration: 0,
      manualSteps: 1,
      repetition: 'medium',
      notes: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Capture New Step */}
      <div className="bg-white rounded-lg border border-[var(--color-hairline)] p-6">
        <h3 className="text-lg font-semibold mb-4">Document Manufacturing Process</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Process Name</label>
            <input
              type="text"
              value={currentStep.name}
              onChange={(e) => setCurrentStep({...currentStep, name: e.target.value})}
              placeholder="e.g., Metal Cutting, Welding, Assembly"
              className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)]"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={currentStep.duration || ''}
                onChange={(e) => setCurrentStep({...currentStep, duration: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Manual Steps</label>
              <input
                type="number"
                value={currentStep.manualSteps}
                onChange={(e) => setCurrentStep({...currentStep, manualSteps: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repetition</label>
              <select
                value={currentStep.repetition}
                onChange={(e) => setCurrentStep({...currentStep, repetition: e.target.value as any})}
                className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={currentStep.description}
              onChange={(e) => setCurrentStep({...currentStep, description: e.target.value})}
              placeholder="Describe the process steps..."
              rows={3}
              className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)]"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={addStep}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium hover:bg-[#000]"
            >
              <Save className="h-4 w-4" />
              Save Process Step
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-hairline)] rounded-full text-sm hover:bg-[var(--color-canvas-soft)]">
              <Camera className="h-4 w-4" />
              Add Photo
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-hairline)] rounded-full text-sm hover:bg-[var(--color-canvas-soft)]">
              <Mic className="h-4 w-4" />
              Voice Note
            </button>
          </div>
        </div>
      </div>

      {/* Documented Steps */}
      {steps.length > 0 && (
        <div className="bg-white rounded-lg border border-[var(--color-hairline)] p-6">
          <h3 className="text-lg font-semibold mb-4">Documented Processes ({steps.length})</h3>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="p-4 bg-[var(--color-canvas-soft)] rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{step.name}</div>
                    <div className="text-sm text-[var(--color-body)] mt-1">{step.description}</div>
                    <div className="flex gap-4 mt-2 text-xs text-[var(--color-mute)]">
                      <span>{step.duration} min</span>
                      <span>{step.manualSteps} manual steps</span>
                      <span className="capitalize">{step.repetition} repetition</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-violet)] text-white rounded-full font-medium hover:bg-[#6b21a8]">
            <Zap className="h-4 w-4" />
            Analyze with AI
          </button>
        </div>
      )}
    </div>
  );
}
