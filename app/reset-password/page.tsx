"use client";

import { Suspense } from "react";
import ResetPassword from "@/components/ui/resetPassword";

// ResetPassword hook uses useSearchParams so needs Suspense wrapper
function ResetPasswordContent() {
  return <ResetPassword show={true} onClose={() => {}} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
