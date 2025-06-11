'use client';
import { FC, useState } from 'react';

export type StepProps<T> = {
  data: T;
  next: () => void;
  previous: () => void;
};

type StepComponent<T> = FC<StepProps<T>>;

type Props<T> = {
  components: StepComponent<T>[];
  data: T;
};

export default function Steps<T>({ components, data }: Props<T>) {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveComponent = components[activeStep];
  const next = () => setActiveStep(activeStep + 1);
  const previous = () => setActiveStep(activeStep - 1);
  return (
    <div>
      <ActiveComponent data={data} next={next} previous={previous} />
    </div>
  );
}
