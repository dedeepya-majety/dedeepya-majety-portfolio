"use client";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { ScrollTimeline } from "@/app/components/ui/ScrollTimeline";
import { jobs } from "@/app/data";

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper">
      <div className="section-inner">
        <SectionHeading title="Work Experience" />
        <div className="section-body" style={{ paddingLeft: "1.5rem" }}>
          <ScrollTimeline jobs={jobs} />
        </div>
      </div>
    </section>
  );
}
