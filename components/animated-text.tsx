import { TextShimmerWave } from '@/components/motion-primitives/text-shimmer-wave';

export function TextShimmerWaveColor() {
  return (
    <TextShimmerWave
      className='text-5xl font-bold mb-2'
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20}
    >
      Building Modern Web Experiences
    </TextShimmerWave>
  );
}
