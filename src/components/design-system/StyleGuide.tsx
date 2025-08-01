
import React from 'react';
import { DESIGN_TOKENS } from '@/constants/designSystem';
import { FormField } from '@/components/ui/form-field';
import { SectionInput } from '@/components/ui/section-input';
import { ContentEditor } from '@/components/ui/content-editor';
import { VisibilityToggle } from '@/components/ui/visibility-toggle';
import { UploadArea } from '@/components/ui/upload-area';

/**
 * StyleGuide Component
 * 
 * This component serves as documentation and testing ground for our design system.
 * It showcases all reusable components and their variants.
 */
export const StyleGuide: React.FC = () => {
  const [sampleState, setSampleState] = React.useState({
    text: '',
    content: '',
    visible: true
  });

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Design System Style Guide</h1>
        <p className="text-gray-600">
          A comprehensive guide to our reusable components and design tokens.
        </p>
      </header>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(DESIGN_TOKENS.colors).map(([colorName, shades]) => (
            <div key={colorName} className="space-y-2">
              <h3 className="font-medium capitalize">{colorName}</h3>
              {Object.entries(shades).map(([shade, value]) => (
                <div key={shade} className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-sm">{shade}: {value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Form Components</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">FormField (Standard)</h3>
            <FormField
              id="sample-field"
              label="Sample Field"
              value={sampleState.text}
              onChange={(e) => setSampleState(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter sample text"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">SectionInput (Underline style)</h3>
            <SectionInput
              id="sample-section"
              label="Section Title"
              value={sampleState.text}
              onChange={(e) => setSampleState(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter section title"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">ContentEditor (Textarea)</h3>
            <ContentEditor
              id="sample-content"
              label="Content"
              value={sampleState.content}
              onChange={(e) => setSampleState(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter content here"
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">VisibilityToggle</h3>
            <VisibilityToggle
              id="sample-toggle"
              checked={sampleState.visible}
              onCheckedChange={(checked) => setSampleState(prev => ({ ...prev, visible: checked }))}
              label="Show content"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">UploadArea</h3>
            <UploadArea
              onFileUpload={() => {}}
              hasImages={false}
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Typography</h2>
        <div className="space-y-4">
          {Object.entries(DESIGN_TOKENS.fontSize).map(([size, value]) => (
            <div key={size} className="flex items-center space-x-4">
              <span className="w-12 text-sm text-gray-500">{size}</span>
              <span style={{ fontSize: value }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Spacing Scale</h2>
        <div className="space-y-4">
          {Object.entries(DESIGN_TOKENS.spacing).map(([size, value]) => (
            <div key={size} className="flex items-center space-x-4">
              <span className="w-12 text-sm text-gray-500">{size}</span>
              <div 
                className="bg-blue-200 h-4"
                style={{ width: value }}
              />
              <span className="text-sm text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
