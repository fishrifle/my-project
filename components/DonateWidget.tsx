"use client";
import { useState } from "react";
import DonationLanding from "./DonationLanding";

export default function DonateWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Donate button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white border-4 border-blue-200 py-2 px-4 rounded-full"
      >
        Donate
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ×
            </button>
            <DonationLanding />
          </div>
        </div>
      )}
    </>
  );
}
