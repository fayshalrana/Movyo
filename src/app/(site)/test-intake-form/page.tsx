// app/test-intake-form/page.tsx
import { IntakePage } from "./components/IntakePage";
import { fetchQuestionsAction } from "@/server/actions/intake";
import { Suspense } from "react";

export default async function Page() {
  const questions = await fetchQuestionsAction();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntakePage questions={questions ?? []} />
    </Suspense>
  );
}
