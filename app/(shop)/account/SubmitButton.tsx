"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  idleLabel: string;
  pendingLabel: string;
};

export default function SubmitButton({ idleLabel, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-[#2A2F2D] py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}
