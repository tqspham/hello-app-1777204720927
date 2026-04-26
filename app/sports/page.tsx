import SportsSelector from '@/components/SportsSelector';

export default function SportsPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-slate-900">Select a Sport</h1>
        <p className="text-center text-slate-600 mb-8">
          Choose your favorite sport from the available options below.
        </p>
        <SportsSelector />
      </div>
    </main>
  );
}
