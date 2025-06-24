"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonationLanding() {
  const [amount, setAmount] = useState<number | "">("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [cause, setCause] = useState("Sponsor a Dev");
  const router = useRouter();

  const canProceed = +amount > 0;
  const goTo = (method: "card" | "bank") => {
    router.push(
      `/donation/${method}?amt=${amount}&monthly=${isMonthly}&cause=${encodeURIComponent(
        cause
      )}`
    );
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Donate</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[50, 100, 250, 500].map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            className={`p-2 rounded ${
              amount === v ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            ${v}
          </button>
        ))}
        <input
          type="number"
          placeholder="Other"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="col-span-3 border p-2 rounded"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="radio"
            checked={!isMonthly}
            onChange={() => setIsMonthly(false)}
          />{" "}
          One-time
        </label>
        <label>
          <input
            type="radio"
            checked={isMonthly}
            onChange={() => setIsMonthly(true)}
          />{" "}
          Monthly
        </label>
      </div>

      <select
        value={cause}
        onChange={(e) => setCause(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      >
        <option>Sponsor a Dev</option>
        <option>Tech Alliance</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => goTo("card")}
          disabled={!canProceed}
          className="flex-1 bg-green-600 text-white p-2 rounded disabled:opacity-50"
        >
          Pay with Card
        </button>
        <button
          onClick={() => goTo("bank")}
          disabled={!canProceed}
          className="flex-1 bg-yellow-600 text-white p-2 rounded disabled:opacity-50"
        >
          Pay via Bank
        </button>
      </div>
    </div>
  );
}
