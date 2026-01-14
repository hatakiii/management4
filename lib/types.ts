export type StepProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
};
