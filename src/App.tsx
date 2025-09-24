import React from 'react';
import Header from './components/Header';
import SignatureForm from './components/SignatureForm';
import NewSignaturePreview from './components/NewSignaturePreview';
import { useSignatureGenerator } from './hooks/useSignatureGenerator';

function App() {
  const {
    signatureData,
    copySuccess,
    updateField,
    updatePosition,
    addPosition,
    removePosition,
    copyToClipboard,
    resetForm
  } = useSignatureGenerator();

  const hasPosition = signatureData.positions && signatureData.positions.some(pos => pos.trim() !== '');
  const isFormValid = signatureData.fullName && hasPosition && signatureData.email;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ colorScheme: 'light' }}>
      <Header />
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Form Section */}
        <aside className="w-full lg:w-2/5 xl:w-1/3 bg-white lg:shadow-sm">
          <SignatureForm
            data={signatureData}
            onUpdate={updateField}
            onUpdatePosition={updatePosition}
            onAddPosition={addPosition}
            onRemovePosition={removePosition}
            onReset={resetForm}
          />
        </aside>

        {/* Preview Section */}
        <section className="flex-1 bg-gray-100 lg:bg-gray-50">
          <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <NewSignaturePreview
              data={signatureData}
              onCopy={copyToClipboard}
              success={copySuccess}
              disabled={!isFormValid}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;