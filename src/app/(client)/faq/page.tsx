import GuideSection from "@/app/(client)/faq/_components/guide-section";
import ExampleSection from "@/app/(client)/faq/_components/example-section";
import { Fragment } from "react";

export default function FaqPage() {
  return (
    <Fragment>
      <GuideSection />
      <ExampleSection />
    </Fragment>
  );
}