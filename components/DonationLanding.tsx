// components/DonationLanding.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonationLanding() {
  const [amount, setAmount] = useState<number | "">("");
  const [isMonthly, setMonthly] = useState(false);
  const [cause, setCause] = useState("Sponsor a Dev");
  const router = useRouter();

  const canProceed = amount !== "" && amount > 0;
  const go = (method: "card" | "bank") => {
    router.push(
      `/donation/${method}?amt=${amount}&monthly=${isMonthly}&cause=${encodeURIComponent(
        cause
      )}`
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Make a Donation</h2>

      <div className="grid grid-cols-3 gap-2">
        {[50, 100, 250, 500].map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            className={`p-2 rounded ${
              amount === v ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            ${v}
          </button>
        ))}
        <input
          type="number"
          placeholder="Other"
          value={amount === "" ? "" : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="col-span-3 border p-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={!isMonthly}
            onChange={() => setMonthly(false)}
          />
          One-time
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={isMonthly}
            onChange={() => setMonthly(true)}
          />
          Monthly
        </label>
      </div>

      <select
        value={cause}
        onChange={(e) => setCause(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Sponsor a Dev</option>
        <option>Tech Alliance</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => go("card")}
          disabled={!canProceed}
          className="flex-1 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Pay with Card
        </button>
        <button
          onClick={() => go("bank")}
          disabled={!canProceed}
          className="flex-1 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Pay via Bank
        </button>
      </div>
    </div>
  );
}
