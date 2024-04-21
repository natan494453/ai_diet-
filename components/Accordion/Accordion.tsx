import React from "react";
interface dataProps {
  data: [{ id?: number; title: string; createdAt: Date; recipe: string }];
}
export default function Accordion({ data }: dataProps) {
  return (
    <div className="flex flex-col gap-10 w-[80vw]">
      {data.map((item: any, index) => {
        return (
          <div key={item.id} className="collapse bg-base-200">
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-xl font-medium">
              {item.title}
            </div>
            <div
              className="collapse-content"
              dangerouslySetInnerHTML={{ __html: item.recipe }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
