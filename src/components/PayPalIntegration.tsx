import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Loader2, CheckCircle2 } from "lucide-react";

interface PayPalIntegrationProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

export const PayPalIntegration: React.FC<PayPalIntegrationProps> = ({ amount, onSuccess, onError, disabled }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div className="w-full min-h-[150px] relative">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
        </div>
      )}
      <PayPalButtons
        disabled={disabled}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "checkout",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError(err);
        }}
      />
    </div>
  );
};
