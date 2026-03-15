import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { componentPropsInterfacePaymentProfile } from "./Interfaces/ComponentProps.interface";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CourseInterface {
  name: string;
  salutation: string;
  value: number;
}
interface courseDetailsInterface {
  admittedCourses: [string];
  selectedCourses: [CourseInterface];
  preventedCourses: [string];
  allPossibleCourses: { name: string; price: number }[];
  showDiscount: boolean;
}

const getAllCourses = async (emailId: string) => {
  const { data } = await api.post<courseDetailsInterface>(
    apiRoutes.courses.payment.currentCourses,
    { email: emailId },
  );
  return data;
};

// ─── Icon Components ──────────────────────────────────────────────────────────

const ChevronDownIcon = ({ isOpen, className = "" }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TagIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const TrendingIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const GraduationCapIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Profile_Courses: React.FC<componentPropsInterfacePaymentProfile> = (
  props,
) => {
  const [admittedCourses, setAdmittedCourses] = useState<{
    "Computer Science": string[];
  }>({ "Computer Science": [] });
  const [choices, setChoices] = useState<{
    "Computer Science": Array<{ name: string; price: number }>;
  }>({ "Computer Science": [] });
  const [allComputerCourses, setAllComputerCourses] = useState<{
    "Computer Science": Array<{ name: string; price: number }>;
  }>({ "Computer Science": [] });
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    AllCourses: false,
    "Computer Science": false,
  });
  const [preventedCourses, setPreventedCourses] = useState<string[]>([]);
  const [search, setsearch] = useState("");
  const [courses] = useState(["Computer Science"]);
  const [showDiscount, setShowDiscount] = useState(false);

  const { mutate: getCoursesMutation } = useMutation({
    mutationFn: (emailId: string) => getAllCourses(emailId),
    onSuccess: (data) => {
      const admittedCourses = data.admittedCourses;
      setAdmittedCourses({
        "Computer Science": admittedCourses.filter((val) =>
          String(val).startsWith("Computer Science"),
        ),
      });
      const selectedCourses = data.selectedCourses;
      setChoices({
        "Computer Science": selectedCourses
          .filter((val) => String(val.name).startsWith("Computer Science"))
          .map((val) => ({ name: val.name, price: val.value })),
      });
      const allPossibleCourses = data.allPossibleCourses;
      setAllComputerCourses({
        "Computer Science": allPossibleCourses
          .filter((val) => String(val.name).startsWith("Computer Science"))
          .map((val) => ({
            name: val.name.replace(/^Computer Science - \s*/, ""),
            price: val.price,
          })),
      });
      setPreventedCourses(data.preventedCourses);
      setShowDiscount(data.showDiscount);
    },
  });

  useEffect(() => {
    getCoursesMutation(props.details?.email ?? "");
  }, []);

  const applied_courses = courses.filter((val) =>
    val.toLowerCase().includes(search.toLowerCase()),
  );

  const PLACEMENT_COURSE = "Computer Science - Placements Made Easier";

  const handleChoiceChange = (category: string, value: string) => {
    setChoices((prev) => {
      const categoryKey = category as keyof typeof allComputerCourses;
      const updated_list = prev[categoryKey].some((item) => item.name === value)
        ? prev[categoryKey].filter((item) => item.name !== value)
        : [
            ...prev[categoryKey],
            {
              name: value,
              price:
                allComputerCourses[categoryKey]?.find(
                  (c) => `Computer Science - ${c.name}` === value,
                )?.price || 0,
            },
          ];
      return { ...prev, [categoryKey]: updated_list };
    });
  };

  const handleApplyCourses = async () => {
    const subjectList = courses.flatMap((category) =>
      choices[category as keyof typeof choices].map((course) => course.name),
    );
    let additionalCoursesSelected = [];
    if (subjectList.includes(PLACEMENT_COURSE)) {
      additionalCoursesSelected.push(
        "Computer Science - Development Crash Course: Projects Made Easier",
      );
    }
    const response = await api.post(apiRoutes.courses.payment.appliedCourses, {
      name: props.details?.name,
      email: props.details?.email,
      selectedCourses: subjectList,
      additionalCoursesSelected: additionalCoursesSelected,
    });
    if (response.status == 200) props.goToPage("dashboard");
    else if (response.status == 303)
      toast.error(
        "Please Remove selection for courses you are admitted in whose deadline has not yet arrived",
      );
    else alert(response.status);
  };

  const isCourseBlocked = (courseName: string): boolean => {
    const fullName = `Computer Science - ${courseName}`;
    const selectedNames = choices["Computer Science"].map((c) => c.name);
    if (
      selectedNames.includes(PLACEMENT_COURSE) &&
      fullName !== PLACEMENT_COURSE
    )
      return true;
    if (
      !selectedNames.includes(PLACEMENT_COURSE) &&
      selectedNames.length > 0 &&
      fullName === PLACEMENT_COURSE
    )
      return true;
    return false;
  };

  const getTotalSelectedCourses = () => Object.values(choices).flat().length;

  const getPriceBreakdown = () => {
    let subtotal = 0;
    Object.entries(choices).forEach(([_, courseList]) =>
      courseList.forEach((course) => {
        subtotal += course.price;
      }),
    );
    const totalSelected = getTotalSelectedCourses();
    const hasPlacement = choices["Computer Science"]
      .map((v) => v.name)
      .includes(PLACEMENT_COURSE);
    const hasAI = choices["Computer Science"]
      .map((v) => v.name)
      .includes(
        "Computer Science - Artificial Intelligence: Explore the Future",
      );
    let discountRate = 0;
    let discountLabel = "";
    if (totalSelected >= 2 && !hasPlacement) {
      discountRate = 0.2;
      discountLabel = "Bundle Discount";
    } else if (
      hasPlacement &&
      hasAI &&
      choices["Computer Science"].length === 2
    ) {
      discountRate = 0.2;
      discountLabel = "Bundle Discount (Placements + AI)";
    }
    const discountAmount = subtotal * discountRate;
    const priceAfterBundleDiscount = subtotal - discountAmount;
    // JU 50% discount is applied on top of the bundle discount
    const juDiscountAmount = showDiscount ? priceAfterBundleDiscount * 0.5 : 0;
    const total = priceAfterBundleDiscount - juDiscountAmount;
    return { subtotal, discountRate, discountAmount, juDiscountAmount, total, discountLabel };
  };

  const isPlacementSelected = choices["Computer Science"].some(
    (c) => c.name === PLACEMENT_COURSE,
  );
  const totalSelected = getTotalSelectedCourses();
  const { subtotal, discountRate, discountAmount, juDiscountAmount, total, discountLabel } =
    getPriceBreakdown();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #faf8ff 100%)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .course-card { transition: all 0.2s cubic-bezier(0.4,0,0.2,1); }
        .course-card:hover:not(.blocked) { transform: translateX(4px); }
        .pulse-badge { animation: pulse-soft 2s ease-in-out infinite; }
        @keyframes pulse-soft { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .shine { position:relative; overflow:hidden; }
        .shine::after { content:''; position:absolute; top:-50%; left:-75%; width:50%; height:200%; background:linear-gradient(to right,transparent,rgba(255,255,255,0.4),transparent); transform:skewX(-20deg); animation:shine 3s ease-in-out infinite; }
        @keyframes shine { 0%,100%{left:-75%} 50%{left:125%} }
        .checkbox-custom { appearance:none; width:18px; height:18px; border:2px solid #c7d2fe; border-radius:5px; cursor:pointer; transition:all 0.15s; position:relative; background:white; flex-shrink:0; }
        .checkbox-custom:checked { background:linear-gradient(135deg,#6366f1,#8b5cf6); border-color:transparent; }
        .checkbox-custom:checked::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:700; }
        .checkbox-custom:disabled { background:#f3f4f6; border-color:#e5e7eb; cursor:not-allowed; }
        .scrollbar-thin::-webkit-scrollbar { width:4px; } 
        .scrollbar-thin::-webkit-scrollbar-track { background:transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background:#c7d2fe; border-radius:99px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Page Header ── */}
        <div className="mb-10 fade-in">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Course Enrollment
                </span>
              </div>
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight"
              >
                Build Your
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Learning Path
                </span>
              </h1>
              <p className="text-gray-500 text-base max-w-lg leading-relaxed">
                Select from our expert-curated curriculum. Bundle 2+ courses for
                an instant{" "}
                <strong className="text-indigo-600">20% discount</strong>.
              </p>
            </div>

            {/* Stats strip */}
            <div className="hidden lg:flex items-center gap-6 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {Object.values(admittedCourses).flat().length}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">
                  Enrolled
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">
                  {totalSelected}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">
                  In Cart
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {discountRate > 0 ? "20%" : "0%"}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">
                  Discount
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 fade-in bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Before You Choose
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-violet-50 border border-violet-100 rounded-xl p-3.5">
              <div className="p-1.5 rounded-lg bg-violet-100 text-violet-600 flex-shrink-0 mt-0.5">
                <SparkleIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-800 mb-0.5">
                  Placements Made Easier
                </p>
                <p className="text-xs text-violet-600 leading-relaxed">
                  This is an <strong>exclusive bundle</strong> — selecting it
                  gives you all 4 courses for the price of 2, but it{" "}
                  <strong>cannot be combined</strong> with individual course
                  selections.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3.5">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 flex-shrink-0 mt-0.5">
                <BookIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-800 mb-0.5">
                  Individual Courses
                </p>
                <p className="text-xs text-indigo-600 leading-relaxed">
                  Pick any 2 or more individual courses and get an automatic{" "}
                  <strong>20% bundle discount</strong>. Cannot be combined with
                  Placements Made Easier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bundle Discount Banner ── */}
        {totalSelected === 1 && !isPlacementSelected && (
          <div className="mb-6 fade-in shine bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl px-5 py-3.5 flex items-center gap-3 text-white shadow-lg shadow-orange-100">
            <TrendingIcon />
            <p className="text-sm font-medium">
              <strong>One more course away</strong> from unlocking a flat 20%
              bundle discount on your entire order!
            </p>
            <span className="ml-auto text-xs bg-white/20 rounded-full px-3 py-1 font-semibold whitespace-nowrap">
              Save 20%
            </span>
          </div>
        )}
        {discountRate > 0 && (
          <div className="mb-6 fade-in shine bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl px-5 py-3.5 flex items-center gap-3 text-white shadow-lg shadow-emerald-100">
            <SparkleIcon />
            <p className="text-sm font-medium">
              <strong>Bundle discount applied!</strong> You're saving ₹
              {discountAmount.toLocaleString()} on this order.
            </p>
            <span className="ml-auto text-xs bg-white/20 rounded-full px-3 py-1 font-semibold whitespace-nowrap">
              20% OFF
            </span>
          </div>
        )}
        {isPlacementSelected && (
          <div className="mb-6 fade-in shine bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-5 py-3.5 flex items-center gap-3 text-white shadow-lg shadow-violet-100">
            <SparkleIcon />
            <p className="text-sm font-medium">
              <strong>Placements Made Easier unlocked!</strong> You get all 4
              courses bundled — pay for just 2. Best value on the platform.
            </p>
            <span className="ml-auto text-xs bg-white/20 rounded-full px-3 py-1 font-semibold whitespace-nowrap">
              🎓 4-for-2
            </span>
          </div>
        )}

        {/* ── Jadavpur University Discount Banner ── */}
        {showDiscount && (
          <div className="mb-6 fade-in shine bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl px-5 py-3.5 flex items-center gap-3 text-white shadow-lg shadow-rose-100">
            <GraduationCapIcon />
            <p className="text-sm font-medium">
              <strong>Jadavpur University exclusive!</strong> You qualify for an
              additional <strong>50% off</strong> applied on top of any existing
              discounts.
            </p>
            <span className="ml-auto text-xs bg-white/20 rounded-full px-3 py-1 font-semibold whitespace-nowrap">
              🎓 50% OFF
            </span>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-7">
          {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
          <div className="flex-1 min-w-0">
            {/* Search + Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookIcon />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Course Catalogue
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Click to explore available courses
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                    setDropdowns((p) => ({ ...p, AllCourses: true }));
                  }}
                  placeholder="Search course categories..."
                  className="w-full pl-11 pr-12 py-3.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all placeholder-gray-400"
                />
                <button
                  onClick={() =>
                    setDropdowns((p) => ({ ...p, AllCourses: !p.AllCourses }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors"
                >
                  <ChevronDownIcon isOpen={dropdowns.AllCourses} />
                </button>
              </div>
            </div>

            {/* Course Category Accordion */}
            {dropdowns.AllCourses && (
              <div className="space-y-3 fade-in">
                {applied_courses.map((category) => (
                  <div
                    key={category}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Category header */}
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        setDropdowns((p) => ({
                          ...p,
                          [category]: !p[category],
                        }))
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${category === "Computer Science" ? "bg-violet-500" : "bg-emerald-500"}`}
                        />
                        <span className="font-semibold text-gray-800 text-base">
                          {category}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                          {allComputerCourses["Computer Science"]?.length ?? 0}{" "}
                          courses
                        </span>
                      </div>
                      <div className="text-gray-400">
                        <ChevronDownIcon isOpen={dropdowns[category]} />
                      </div>
                    </button>

                    {/* Course list */}
                    {dropdowns["Computer Science"] &&
                      category === "Computer Science" && (
                        <div className="border-t border-gray-100 fade-in">
                          {allComputerCourses["Computer Science"].map(
                            (sem, idx) => {
                              const fullName = `Computer Science - ${sem.name}`;
                              const isChecked = choices[category].some(
                                (item) => item.name === fullName,
                              );
                              const isPrevented =
                                preventedCourses.includes(fullName);
                              const isBlocked = isCourseBlocked(sem.name);
                              const isDisabled = isPrevented || isBlocked;
                              const isPlacement =
                                sem.name === "Placements Made Easier";

                              return (
                                <label
                                  key={sem.name}
                                  className={`course-card flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-b-0 select-none
                                ${isDisabled ? "blocked opacity-40 cursor-not-allowed bg-gray-50/50" : "cursor-pointer hover:bg-indigo-50/40"}
                                ${isChecked && !isDisabled ? "bg-indigo-50/60" : ""}
                              `}
                                >
                                  <input
                                    type="checkbox"
                                    className="checkbox-custom"
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={() =>
                                      handleChoiceChange(category, fullName)
                                    }
                                  />

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span
                                        className={`text-sm font-medium ${isDisabled ? "text-gray-400" : "text-gray-800"}`}
                                      >
                                        {sem.name}{" "}
                                        {/* have to remove the following code lines on 31st April, 2026*/}
                                        {sem.name == "Artificial Intelligence: Explore the Future" ? <span className="inline-flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                          🗓 Available from April 2026
                                        </span> : <span className="inline-flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                          🗓 Live Now !
                                        </span>}

                                      </span>
                                      {isPlacement && !isDisabled && (
                                        <span className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                          <SparkleIcon /> Best Value
                                        </span>
                                      )}
                                      {isPrevented && (
                                        <span className="inline-flex items-center gap-1 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                                          <LockIcon />
                                        </span>
                                      )}
                                      {isBlocked && !isPrevented && (
                                        <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full">
                                          <LockIcon /> Incompatible selection
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 flex-shrink-0">
                                    {isChecked && (
                                      <span className="text-xs text-indigo-500 font-medium bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                                        Added
                                      </span>
                                    )}
                                    <span
                                      className={`text-sm font-bold ${isDisabled ? "text-gray-300" : "text-emerald-600"}`}
                                    >
                                      ₹{sem.price.toLocaleString()}
                                    </span>
                                  </div>
                                </label>
                              );
                            },
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setChoices({ "Computer Science": [] })}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-medium text-sm transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
              <button
                onClick={handleApplyCourses}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <CartIcon />
                Apply & Continue
              </button>
            </div>
          </div>

          {/* ══ RIGHT PANEL ═════════════════════════════════════════════════════ */}
          <div className="w-full xl:w-[380px] space-y-5 flex-shrink-0">
            {/* Admitted Courses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircleIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Enrolled Courses
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {Object.values(admittedCourses).flat().length} active
                  </p>
                </div>
              </div>

              <div className="p-4">
                {Object.entries(admittedCourses).some(
                  ([_, c]) => c.length > 0,
                ) ? (
                  <div className="space-y-2">
                    {Object.entries(admittedCourses).map(
                      ([category, courses]) =>
                        courses.length > 0 ? (
                          <div key={category}>
                            {courses.map((val, key) => (
                              <div
                                key={key}
                                className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-emerald-50/60 border border-emerald-100 mb-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                <span className="text-xs text-emerald-800 font-medium leading-snug">
                                  {val}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null,
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <BookIcon />
                    </div>
                    <p className="text-sm text-gray-400">
                      No active enrollments
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Course Cart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                  <CartIcon />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Your Cart
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {totalSelected} course{totalSelected !== 1 ? "s" : ""}{" "}
                    selected
                  </p>
                </div>
                {totalSelected > 0 && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    }}
                  >
                    {totalSelected}
                  </span>
                )}
              </div>

              <div className="p-4">
                {Object.entries(choices).some(([_, c]) => c.length > 0) ? (
                  <div className="space-y-3">
                    {/* Course list */}
                    {Object.entries(choices).map(([category, courses]) =>
                      courses.length > 0 ? (
                        <div key={category} className="space-y-1.5">
                          {courses.map((val, key) => (
                            <div
                              key={key}
                              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-violet-50/60 border border-violet-100"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                                <span className="text-xs text-violet-800 font-medium leading-snug truncate">
                                  {val.name.replace("Computer Science - ", "")}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-violet-600 ml-2 flex-shrink-0">
                                ₹{val.price.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null,
                    )}

                    {/* Price Breakdown */}
                    <div className="rounded-xl border border-gray-100 overflow-hidden mt-4">
                      <div
                        className="px-4 py-2.5 flex items-center gap-2"
                        style={{
                          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        }}
                      >
                        <TagIcon />
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">
                          Price Summary
                        </span>
                      </div>

                      <div className="bg-gray-50 p-4 space-y-2.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="font-semibold text-gray-800">
                            ₹{subtotal.toLocaleString()}
                          </span>
                        </div>

                        {isPlacementSelected ? (
                          <div className="flex justify-between items-center bg-violet-50 border border-violet-200 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                                4-for-2
                              </span>
                              <span className="text-violet-700 text-xs font-medium">
                                Placements Bundle
                              </span>
                            </div>
                            <span className="text-violet-600 text-xs font-bold">
                              All 4 courses included
                            </span>
                          </div>
                        ) : discountRate > 0 ? (
                          <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                                −20%
                              </span>
                              <span className="text-emerald-700 text-xs font-medium">
                                {discountLabel}
                              </span>
                            </div>
                            <span className="text-emerald-600 text-sm font-bold">
                              −₹{discountAmount.toLocaleString()}
                            </span>
                          </div>
                        ) : totalSelected === 1 && !isPlacementSelected ? (
                          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                            <svg
                              className="w-3.5 h-3.5 text-amber-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-xs text-amber-700">
                              Add 1 more course → unlock{" "}
                              <strong>20% off</strong>
                            </p>
                          </div>
                        ) : null}

                        {/* Jadavpur University discount row */}
                        {showDiscount && totalSelected > 0 && (
                          <div className="flex justify-between items-center bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                                −50%
                              </span>
                              <span className="text-rose-700 text-xs font-medium">
                                Jadavpur University
                              </span>
                            </div>
                            <span className="text-rose-600 text-sm font-bold">
                              −₹{juDiscountAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                          <span className="font-bold text-gray-900 text-sm">
                            Total
                          </span>
                          <div className="text-right">
                            {(discountRate > 0 || showDiscount) && (
                              <div className="text-xs text-gray-400 line-through text-right">
                                ₹{subtotal.toLocaleString()}
                              </div>
                            )}
                            <span
                              className="text-xl font-bold"
                              style={{
                                background:
                                  "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              ₹{total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                      <svg
                        className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Selections are temporary. Click{" "}
                        <strong>"Apply & Continue"</strong> to confirm your
                        enrollment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <CartIcon />
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Cart is empty
                    </p>
                    <p className="text-xs text-gray-400">
                      Select courses from the catalogue to begin
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Discount Info Card */}
            <div
              className="rounded-2xl p-5 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{
                  background: "white",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
                style={{
                  background: "white",
                  transform: "translate(-30%, 30%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <SparkleIcon />
                  <span className="text-sm font-bold uppercase tracking-wide opacity-90">
                    Bundle Offer
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">Save 20%</p>
                <p className="text-xs opacity-75 leading-relaxed mb-4">
                  Add any 2 or more courses to your cart and get an automatic
                  flat 20% off your entire order — no coupon needed.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/10 rounded-xl py-2.5">
                    <div className="text-lg font-bold">
                      {Object.values(admittedCourses).flat().length}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">Enrolled</div>
                  </div>
                  <div className="bg-white/10 rounded-xl py-2.5">
                    <div className="text-lg font-bold">{totalSelected}</div>
                    <div className="text-xs opacity-70 mt-0.5">In Cart</div>
                  </div>
                  <div className="bg-white/10 rounded-xl py-2.5">
                    <div className="text-lg font-bold">
                      {discountRate > 0 ? "20%" : "0%"}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Courses;