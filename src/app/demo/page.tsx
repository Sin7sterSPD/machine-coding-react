"use client";
import React from "react";
import StarRating from "@/components/machine-coding/1.star-rating/star-rating";
import MultiStepForm from "@/components/challenges/1.multi-step-form";
import FieldNotes from "@/components/challenges/2.field-notes";
import ClickOutside from "@/components/challenges/3.click-outside";
import ExpandingTextArea from "@/components/challenges/4.expanding-textarea";
import Tabs from "@/components/challenges/5.tabs";
import AccordionDemo from "@/components/challenges/6.accordin";
const MachineCoding = () => {
  return (
    <div className="bg-[#2d2d2d]">
      {/* <StarRating /> */}
      {/* <MultiStepForm /> */}
      {/* <FieldNotes /> */}
      {/* <ClickOutside /> */}
      {/* <ExpandingTextArea /> */}

      <AccordionDemo />
    </div>
  );
};

export default MachineCoding;
