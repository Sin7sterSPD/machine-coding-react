// In this challenge you're given a multistep form for getting data from the user. With the JSX already in place, update the component's state and functions in order to allow the user to progress through the form, updating the state as necessary.

// Tasks
// Allow the user to transition to the next step
// Allow the user to return to the previous step
// Update the formData as the user progresses through the form
// When finished, submit the form and reset the component's state
// =============================================================
// SOL
// ==================================================================

import { useState } from "react";
import { Input } from "../ui/input";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import React from "react";
import { Progress } from "../ui/progress";

interface FormDate {
  username: string;
  email: string;
  password: string;
  address: string;
  city: string;

  zip: string;
}

const intialFormData: FormDate = {
  username: "",
  email: "",
  password: "",
  address: "",
  city: "",
  zip: "",
};
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDate>(intialFormData);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData(intialFormData);
    setStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Steps: 1: username/email, 2: password/address, 3: city/zip, 4: submit
  const totalSteps = 3;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d2d2d]">
      <div className="bg-white/80 shadow-xl rounded-xl p-8 w-full max-w-md border border-blue-200">
        <h1 className="text-3xl text-blue-600 font-extrabold mb-6 text-center tracking-tight drop-shadow">
          Multi Step Form
        </h1>
        <Progress
          value={(step / totalSteps) * 100}
          className="mb-6 h-2 bg-[#fdb71c]"
        />

        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <Field>
              <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
              <Input
                id="input-field-username"
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
              <Input
                id="input-field-email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <Field>
              <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
              <Input
                id="input-field-password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-address">Address</FieldLabel>
              <Input
                id="input-field-address"
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <Field>
              <FieldLabel htmlFor="input-field-city">City</FieldLabel>
              <Input
                id="input-field-city"
                type="text"
                placeholder="Enter your city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-zip">ZIP Code</FieldLabel>
              <Input
                id="input-field-zip"
                type="text"
                placeholder="Enter your ZIP code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full"
                autoComplete="off"
              />
            </Field>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 font-semibold text-[#2d2d2d] border-[#fdb71c] bg-white"
            onClick={handlePrev}
            disabled={step === 1}>
            Prev
          </Button>
          {step < totalSteps ? (
            <Button
              className="rounded-full px-6 py-2 font-semibold bg-[#fdb71c] text-[#2d2d2d]"
              onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              className="rounded-full px-6 py-2 font-semibold bg-[#fdb71c] text-[#2d2d2d]"
              onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>

        {/* Reset confirmation UI after submit */}
        {step === 1 &&
          formData.username === "" &&
          formData.email === "" &&
          formData.password === "" &&
          formData.address === "" &&
          formData.city === "" &&
          formData.zip === "" && (
            <div className="mt-8 text-center animate-fade-in">
              <span className="text-green-600 font-semibold">
                Form submitted and reset!
              </span>
            </div>
          )}
      </div>
      {/* Animations removed as per minimal requirement */}
    </div>
  );
};

export default MultiStepForm;
