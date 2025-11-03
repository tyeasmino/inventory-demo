"use client";
import { useEffect, useRef } from "react";

export default function SetUserData({ action }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  return (
    <form ref={formRef} action={action}>
      {/* Hidden input if needed */}
      <input type="hidden" name="auto" value="1" />
    </form>
  );
}
