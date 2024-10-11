"use client"


import CourseDetailsInfo from "./CourseDetailsInfo";
import CourseSummary from "./CourseSummary";
import Devices from "./Devices";
import FlaggedReason from "./FlaggedReason";
import FlagHistory from "./FlagHistory";


export default function page({ params }) {

  return (
    <section className="student-details">
      <CourseSummary params={params} />
      {/* course progress details info */}
      <CourseDetailsInfo params={params} />
      <Devices params={params}/>
      <FlagHistory params={params}/>
      <FlaggedReason params={params}/>
    </section>
  )
}