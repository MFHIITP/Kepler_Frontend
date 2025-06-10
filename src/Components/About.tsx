import React, { FC } from "react";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";

const About: FC<componentPropsInterface> = () => {
  return (
    <div className="space-y-10">
      {/* Objectives Section */}
      <section className="bg-gray-900 py-8 px-4 rounded-lg shadow-lg">
        <h2 className="text-center text-4xl font-serif font-bold text-blue-200 underline mb-8">
          OBJECTIVES
        </h2>
        <ul className="list-none space-y-4 text-lg text-gray-300 font-light">
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            To foster a love for mathematics and promote enthusiasm and appreciation for mathematics through engaging activities and events.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Encourage academic excellence by providing resources, workshops, and tutoring to help members excel in their mathematical studies.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Promote collaborative learning by creating study groups and collaborative projects to enhance understanding and problem-solving skills.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Encourage innovation and support members in pursuing mathematical research and presenting their findings.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Provide a platform for discussion by offering a forum for members to discuss mathematical problems, theories, and applications.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Facilitate competitions and organize challenges or encourage participation in mathematics competitions, Olympiads, and other problem-solving events.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Enhance professional development and provide guidance on career opportunities in mathematics and related fields, including internships and job placements.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Promote interdisciplinary collaboration and encourage integration of mathematics with other fields, such as physics, engineering, and economics.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            To accept any gifts, donations, or subscriptions to create and manage funds to further the Club's objectives.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            To borrow funds as needed, as decided by the Executive and Treasury Committees.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            To invest funds as deemed appropriate by the Treasury Committee.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            The ownership, management, and control of all Club assets shall vest with the Executive Trustees/Treasury of the Club.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            Create a supportive community where members can share their passion for mathematics and support one another.
          </li>
          <li className="flex items-start gap-4">
            <span className="text-blue-200 font-bold">•</span>
            To carry out any acts, deeds, or initiatives incidental to achieving these objectives.
          </li>
        </ul>
      </section>

      {/* Membership Details Section */}
      <section className="bg-gray-900 py-8 px-4 rounded-lg shadow-lg my-4">
        <h2 className="text-center text-4xl font-serif font-bold text-blue-200 underline mb-8">
          MEMBERSHIP DETAILS
        </h2>
        <div className="text-gray-300 font-light space-y-6">
          <p>
            <strong>Permanent Members</strong> - Any member who agrees to the Club's memorandum, objectives, rules, and regulations, and is appointed as a member of the executive committee, holding office throughout their time at the University (until graduation), will be recognized as a Permanent Member.
          </p>
          <p>
            <strong>Exclusive Members</strong> - Any member who aligns with the Club’s objectives and rules, appointed as a Convenor in a Category/Sub-Committee or a coordinator under the Core Committee's authority, will be considered an Exclusive Member.
          </p>
          <p>
            <strong>Associate Members</strong> - Any member committed to the Club's objectives and who subscribes to the Club’s website will be considered an Associate Member. Members of the previous categories are also regarded as Associate Members.
          </p>
          <p>
            <strong>Floating Members</strong> - Members connected to the Club through online forums or social media platforms (WhatsApp, Facebook, LinkedIn, Twitter, etc.) who do not meet the previous criteria will be classified as Floating Members.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
