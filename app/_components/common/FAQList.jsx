import React, { use } from "react";
import FaqCard from "../home/FaqCard";
import { fetchData } from "@/app/_fetch/fetchData";
import { QueryBoundary } from "./Index";

const FAQList = () => {
  const {
    data: { results, count } = {},
    status,
    message,
  } = use(fetchData(`/api/faqs/`));

  return (
    <QueryBoundary status={status} count={count} errorMsg={message}>
      {results?.map((faq, i) => (
        <FaqCard
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isInitialOpen={i === 0}
        />
      ))}
    </QueryBoundary>
  );
};

export default FAQList;
