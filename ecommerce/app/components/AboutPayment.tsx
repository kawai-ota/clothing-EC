import React from "react";

type AboutPaymentProps = {};

const Payment = (props: AboutPaymentProps) => {
  return (
    <div className="w-8/12 mt-2 ml-10">
      お支払いに関してましては、以下のカードからのお支払いが可能になります。
      <hr className="my-2" />
      <span>Visa etc...</span>
    </div>
  );
};

export default Payment;
