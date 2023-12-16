import { SDCGenerator } from '@/app/components/SDCGenerator';
import { SDCGeneratorProvider } from '@/app/contexts/SDCGeneratorProvider';

export default function Home() {

  return (
    <SDCGeneratorProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SDCGenerator />
      </main>
    </SDCGeneratorProvider>
  )
}
