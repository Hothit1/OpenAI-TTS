import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TextToSpeechForm = dynamic(() => import('./components/TextToSpeechForm'), {
  loading: () => <p>Loading form...</p>,
  ssr: false
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">OpenAI Text to Speech</h1>
        <Suspense fallback={<p>Loading form...</p>}>
          <TextToSpeechForm />
        </Suspense>
      </div>
    </main>
  );
}