import { useMemo, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { courses } from "../../data/courses";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL

const APPLICATION_ENDPOINT = `${API_BASE_URL}/api/applications/student`;

const prepareStudentApplicationPayload = ({ formData, courses }) => {
  const selectedCourse = courses.find((course) => String(course.id) === formData.courseId);

  return {
    personalInformation: {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.phoneNumber.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      citizenship: formData.citizenship.trim(),
      idOrPassportNumber: formData.idOrPassportNumber.trim(),
    },
    academicInformation: {
      highestQualification: formData.highestQualification,
      kcseGradeOrEquivalent: formData.kcseGradeOrEquivalent.trim(),
      course: {
        id: selectedCourse?.id ?? null,
        name: selectedCourse?.name ?? null,
        title: selectedCourse?.title ?? formData.courseId,
      },
      preferredIntakeMonth: formData.preferredIntakeMonth,
      preferredStartDate: formData.preferredStartDate || null,
      modeOfTraining: formData.modeOfTraining,
    },
    discoveryChannels: formData.discoveryChannels,
    financialInformation: {
      feePayerName: formData.feePayerName.trim(),
      feePayerPhoneNumber: formData.feePayerPhoneNumber.trim(),
    },
    nextOfKin: {
      fullName: formData.nextOfKinName.trim(),
      relationship: formData.nextOfKinRelationship.trim(),
      phoneNumber: formData.nextOfKinPhone.trim(),
    },
    declarations: {
      rulesAccepted: formData.acceptRules,
    },
    submittedAt: new Date().toISOString(),
  };
};

const submitStudentApplication = async ({ payload, signal }) => {
  const response = await fetch(APPLICATION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  let responseBody = null;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const errorMessage =
      responseBody?.message ||
      responseBody?.error ||
      "Application submission failed. Please try again.";

    throw new Error(errorMessage);
  }

  return responseBody;
};

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  citizenship: "",
  idOrPassportNumber: "",
  highestQualification: "",
  kcseGradeOrEquivalent: "",
  courseId: "",
  preferredIntakeMonth: "",
  preferredStartDate: "",
  modeOfTraining: "",
  discoveryChannels: [],
  feePayerName: "",
  feePayerPhoneNumber: "",
  nextOfKinName: "",
  nextOfKinRelationship: "",
  nextOfKinPhone: "",
  acceptRules: false,
};

const RULES_AND_REGULATIONS = [
  "Students must attend all classes and practicals, punctually and without exception.",
  "All assignments must be done and submitted for evaluation and grading.",
  "Students must avail themselves physically to sit for exams.",
  "Students must exhibit a high degree of discipline, morality, professionalism and adherence to the culture of the Institution.",
  "Students are expected to understand and promote the Institution's Philosophy/Mission, ideas and culture.",
  "For general decorum and health promotion in the Institution, no member of the Goldchild community will be allowed to smoke or be drunk while within the Institution's premises.",
  "Tuition and any other fees must be paid as per the laid down regulations.",
  "Any fees payment default will result in suspension from class attendance/program suspension.",
  "Mutual respect must be cultivated by all the parties and responsibilities within the entire Goldchild Community.",
  "The Goldchild management will provide an enabling environment and learning facilitation for academic and professional success.",
  "No student will be graduated if he/she has not: a) regularly attended all tuition and other mandatory sessions, b) done, submitted and passed all tests/assignments/projects/research, c) paid all college fees/dues.",
  "I consent to the school photographing, recording, and using my image, voice, assignments, and course-related work for educational, promotional, and marketing purposes. This includes use on social media, websites, online platforms, and other official communication channels.I understand that this may be done without further notice or compensation."
];

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const QUALIFICATION_OPTIONS = ["KCSE", "DIPLOMA", "DEGREE", "MASTERS", "OTHER"];
const INTAKE_OPTIONS = ["January", "March", "April", "July", "October"];
const DISCOVERY_OPTIONS = [
  "Instagram",
  "Facebook",
  "Tiktok",
  "Through a friend",
  "Other",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d][\d\s-]{7,19}$/;

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close success modal"
        >
          <FaTimes />
        </button>

        <div className="text-center">
          <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted</h3>
          <p className="text-gray-600 mb-6">
            Your student registration was submitted successfully. Our admissions team will contact you soon.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentRegistrationPage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const courseOptions = useMemo(
    () => courses.map((course) => ({ id: String(course.id), title: course.title })),
    []
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.citizenship.trim()) newErrors.citizenship = "Citizenship is required.";
    if (!formData.idOrPassportNumber.trim()) {
      newErrors.idOrPassportNumber = "ID / Passport number is required.";
    }

    if (!formData.highestQualification) {
      newErrors.highestQualification = "Highest qualification is required.";
    }

    if (!formData.kcseGradeOrEquivalent.trim()) {
      newErrors.kcseGradeOrEquivalent = "KCSE grade or equivalent is required.";
    }

    if (!formData.courseId) newErrors.courseId = "Please select a course.";
    if (!formData.preferredIntakeMonth) {
      newErrors.preferredIntakeMonth = "Preferred intake month is required.";
    }

    if (!formData.modeOfTraining) newErrors.modeOfTraining = "Select a mode of training.";

    if (formData.discoveryChannels.length === 0) {
      newErrors.discoveryChannels = "Select at least one option.";
    }

    if (!formData.feePayerName.trim()) newErrors.feePayerName = "This field is required.";

    if (!formData.feePayerPhoneNumber.trim()) {
      newErrors.feePayerPhoneNumber = "This field is required.";
    } else if (!phoneRegex.test(formData.feePayerPhoneNumber.trim())) {
      newErrors.feePayerPhoneNumber = "Enter a valid phone number.";
    }

    if (!formData.nextOfKinName.trim()) newErrors.nextOfKinName = "This field is required.";
    if (!formData.nextOfKinRelationship.trim()) {
      newErrors.nextOfKinRelationship = "This field is required.";
    }

    if (!formData.nextOfKinPhone.trim()) {
      newErrors.nextOfKinPhone = "This field is required.";
    } else if (!phoneRegex.test(formData.nextOfKinPhone.trim())) {
      newErrors.nextOfKinPhone = "Enter a valid phone number.";
    }

    if (!formData.acceptRules) {
      newErrors.acceptRules = "You must accept the rules and regulations.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const toggleDiscoveryChannel = (channel) => {
    const alreadySelected = formData.discoveryChannels.includes(channel);

    const updatedChannels = alreadySelected
      ? formData.discoveryChannels.filter((item) => item !== channel)
      : [...formData.discoveryChannels, channel];

    updateField("discoveryChannels", updatedChannels);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = prepareStudentApplicationPayload({ formData, courses });
      await submitStudentApplication({ payload });

      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setSubmitError("");
      setIsSuccessModalOpen(true);
    } catch (error) {
      setSubmitError(error.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-secondary rounded-2xl p-8 md:p-10 text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Student Registration Form</h1>
          <p className="text-orange-100">
            Complete all required fields marked with an asterisk (*) to submit your application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="First Name *" value={formData.firstName} onChange={(value) => updateField("firstName", value)} error={errors.firstName} />
              <InputField label="Last Name *" value={formData.lastName} onChange={(value) => updateField("lastName", value)} error={errors.lastName} />
              <InputField label="Email *" type="email" value={formData.email} onChange={(value) => updateField("email", value)} error={errors.email} />
              <InputField label="Phone Number *" value={formData.phoneNumber} onChange={(value) => updateField("phoneNumber", value)} error={errors.phoneNumber} />
              <InputField label="Date of Birth *" type="date" value={formData.dateOfBirth} onChange={(value) => updateField("dateOfBirth", value)} error={errors.dateOfBirth} />

              <SelectField
                label="Gender *"
                value={formData.gender}
                options={GENDER_OPTIONS}
                onChange={(value) => updateField("gender", value)}
                error={errors.gender}
              />

              <InputField label="Citizenship *" value={formData.citizenship} onChange={(value) => updateField("citizenship", value)} error={errors.citizenship} />
              <InputField label="ID / Passport Number *" value={formData.idOrPassportNumber} onChange={(value) => updateField("idOrPassportNumber", value)} error={errors.idOrPassportNumber} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Highest Qualification *"
                value={formData.highestQualification}
                options={QUALIFICATION_OPTIONS}
                onChange={(value) => updateField("highestQualification", value)}
                error={errors.highestQualification}
              />

              <InputField
                label="KCSE Grade or Equivalent *"
                value={formData.kcseGradeOrEquivalent}
                onChange={(value) => updateField("kcseGradeOrEquivalent", value)}
                error={errors.kcseGradeOrEquivalent}
                placeholder="e.g. D+, C, A-, First Class"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Course You're Applying For *</label>
                <select
                  value={formData.courseId}
                  onChange={(event) => updateField("courseId", event.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.courseId && <p className="text-red-600 text-sm mt-1">{errors.courseId}</p>}
              </div>

              <SelectField
                label="Preferred Intake Month *"
                value={formData.preferredIntakeMonth}
                options={INTAKE_OPTIONS}
                onChange={(value) => updateField("preferredIntakeMonth", value)}
                error={errors.preferredIntakeMonth}
              />

              <InputField
                label="Preferred Start Date"
                type="date"
                value={formData.preferredStartDate}
                onChange={(value) => updateField("preferredStartDate", value)}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Mode of Training *</label>
                <div className="flex flex-wrap gap-4">
                  <RadioOption
                    label="Physical Classes"
                    checked={formData.modeOfTraining === "Physical Classes"}
                    onChange={() => updateField("modeOfTraining", "Physical Classes")}
                  />
                  <RadioOption
                    label="Online Classes"
                    checked={formData.modeOfTraining === "Online Classes"}
                    onChange={() => updateField("modeOfTraining", "Online Classes")}
                  />
                </div>
                {errors.modeOfTraining && <p className="text-red-600 text-sm mt-1">{errors.modeOfTraining}</p>}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">How You Found Us</h2>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              How did you learn about GOLDCHILD? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {DISCOVERY_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.discoveryChannels.includes(option)}
                    onChange={() => toggleDiscoveryChannel(option)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-gray-800 text-sm font-medium">{option}</span>
                </label>
              ))}
            </div>
            {errors.discoveryChannels && <p className="text-red-600 text-sm mt-2">{errors.discoveryChannels}</p>}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Who Will Pay Your Fee? *"
                value={formData.feePayerName}
                onChange={(value) => updateField("feePayerName", value)}
                error={errors.feePayerName}
              />

              <InputField
                label="Fee Payer Phone Number *"
                value={formData.feePayerPhoneNumber}
                onChange={(value) => updateField("feePayerPhoneNumber", value)}
                error={errors.feePayerPhoneNumber}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Next of Kin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputField
                label="Next of Kin Name *"
                value={formData.nextOfKinName}
                onChange={(value) => updateField("nextOfKinName", value)}
                error={errors.nextOfKinName}
              />

              <InputField
                label="Relationship *"
                value={formData.nextOfKinRelationship}
                onChange={(value) => updateField("nextOfKinRelationship", value)}
                error={errors.nextOfKinRelationship}
              />

              <InputField
                label="Next of Kin Phone *"
                value={formData.nextOfKinPhone}
                onChange={(value) => updateField("nextOfKinPhone", value)}
                error={errors.nextOfKinPhone}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Rules and Regulations</h2>
            <div className="border border-gray-200 rounded-xl p-4 max-h-72 overflow-y-auto bg-gray-50">
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
                {RULES_AND_REGULATIONS.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>

            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptRules}
                onChange={(event) => updateField("acceptRules", event.target.checked)}
                className="w-4 h-4 mt-1 accent-primary"
              />
              <span className="text-gray-800 font-medium">
                I have read and accept to adhere to the rules and regulations *
              </span>
            </label>
            {errors.acceptRules && <p className="text-red-600 text-sm mt-2">{errors.acceptRules}</p>}
          </section>

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-secondary text-white font-semibold px-7 py-3 rounded-lg hover:opacity-95 transition-opacity disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, value, options, onChange, error }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

const RadioOption = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-primary"
    />
    <span className="text-sm font-medium">{label}</span>
  </label>
);

export default StudentRegistrationPage;
