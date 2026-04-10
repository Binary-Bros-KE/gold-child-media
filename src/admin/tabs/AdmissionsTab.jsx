import { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCourses, admitStudentManually } from '../api/adminApi';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const QUALIFICATION_OPTIONS = ['KCSE', 'DIPLOMA', 'DEGREE', 'MASTERS', 'OTHER'];
const DISCOVERY_OPTIONS = ['Instagram', 'Facebook', 'Tiktok', 'Through a friend', 'Other'];

const AdmissionsTab = ({ token }) => {
  const [formData, setFormData] = useState({
    admissionNumber: '',
    personalInformation: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      citizenship: '',
      idOrPassportNumber: ''
    },
    academicInformation: {
      highestQualification: '',
      kcseGradeOrEquivalent: '',
      course: { id: null, name: null, name: null },
      modeOfTraining: ''
    },
    financialInformation: {
      feePayerName: '',
      feePayerPhoneNumber: ''
    },
    nextOfKin: {
      fullName: '',
      relationship: '',
      phoneNumber: ''
    },
    discoveryChannels: [],
    startDate: '',
    courseId: '',
    courseName: '',
    duration: '',
    durationType: '',
    courseFee: 0,
    upfrontFee: '',
    adminNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      loadCourses();
    }
  }, [token]);

  const loadCourses = async () => {
    try {
      setIsLoadingCourses(true);
      const response = await getCourses(token);
      setCourses(response);
    } catch (error) {
      console.error('Failed to load courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const selectedCourse = useMemo(() => {
    if (!formData.courseId) return null;
    return courses.find(c => String(c.id) === String(formData.courseId));
  }, [formData.courseId, courses]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.admissionNumber.trim()) newErrors.admissionNumber = 'Admission number is required';
    if (!formData.personalInformation.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.personalInformation.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.personalInformation.email.trim()) newErrors.email = 'Email is required';
    if (!formData.personalInformation.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.personalInformation.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.personalInformation.gender) newErrors.gender = 'Gender is required';
    if (!formData.personalInformation.citizenship.trim()) newErrors.citizenship = 'Citizenship is required';
    if (!formData.personalInformation.idOrPassportNumber.trim()) newErrors.idOrPassportNumber = 'ID/Passport is required';

    if (!formData.academicInformation.highestQualification) newErrors.highestQualification = 'Qualification is required';
    if (!formData.academicInformation.kcseGradeOrEquivalent.trim()) newErrors.kcseGradeOrEquivalent = 'KCSE grade is required';
    if (!formData.courseId) newErrors.courseId = 'Course selection is required';
    if (!formData.academicInformation.modeOfTraining) newErrors.modeOfTraining = 'Training mode is required';
    if (formData.discoveryChannels.length === 0) newErrors.discoveryChannels = 'Select at least one discovery channel';

    if (!formData.financialInformation.feePayerName.trim()) newErrors.feePayerName = 'Fee payer name is required';
    if (!formData.financialInformation.feePayerPhoneNumber.trim()) newErrors.feePayerPhoneNumber = 'Fee payer phone is required';

    if (!formData.nextOfKin.fullName.trim()) newErrors.noKinName = 'Next of kin name is required';
    if (!formData.nextOfKin.relationship.trim()) newErrors.noKinRelationship = 'Relationship is required';
    if (!formData.nextOfKin.phoneNumber.trim()) newErrors.noKinPhone = 'Next of kin phone is required';

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (formData.upfrontFee === '' || isNaN(formData.upfrontFee)) newErrors.upfrontFee = 'Upfront fee is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCourseChange = (courseId) => {
    const course = courses.find(c => String(c.id) === String(courseId));
    setFormData(prev => ({
      ...prev,
      courseId,
      courseName: course?.name || '',
      duration: course?.duration || 0,
      durationType: course?.durationType || '',
      courseFee: course?.courseFee || 0,
      academicInformation: {
        ...prev.academicInformation,
        course: {
          id: course?.id || null,
          name: course?.name || null,
          name: course?.name || null
        }
      }
    }));
  };

  const toggleDiscoveryChannel = (channel) => {
    setFormData(prev => ({
      ...prev,
      discoveryChannels: prev.discoveryChannels.includes(channel)
        ? prev.discoveryChannels.filter(c => c !== channel)
        : [...prev.discoveryChannels, channel]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        admissionNumber: formData.admissionNumber,
        personalInformation: formData.personalInformation,
        academicInformation: formData.academicInformation,
        financialInformation: formData.financialInformation,
        nextOfKin: formData.nextOfKin,
        discoveryChannels: formData.discoveryChannels,
        startDate: formData.startDate,
        courseId: formData.courseId,
        courseName: formData.courseName,
        duration: formData.duration,
        durationType: formData.durationType,
        courseFee: formData.courseFee,
        upfrontFee: parseFloat(formData.upfrontFee),
        adminNotes: formData.adminNotes
      };

      await admitStudentManually(token, payload);
      toast.success('Student admitted successfully');

      // Reset form
      setFormData({
        admissionNumber: '',
        personalInformation: { firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '', citizenship: '', idOrPassportNumber: '' },
        academicInformation: { highestQualification: '', kcseGradeOrEquivalent: '', course: { id: null, name: null, name: null }, modeOfTraining: '' },
        financialInformation: { feePayerName: '', feePayerPhoneNumber: '' },
        nextOfKin: { fullName: '', relationship: '', phoneNumber: '' },
        discoveryChannels: [],
        startDate: '',
        courseId: '',
        courseName: '',
        duration: '',
        durationType: '',
        courseFee: 0,
        upfrontFee: '',
        adminNotes: ''
      });
      setErrors({});
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to admit student';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      }
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    // Clear error for this field
    if (errors[path]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[path];
        return newErrors;
      });
    }
  };

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-slate-900'>Manual Admissions</h2>
        <p className='mt-1 text-sm text-slate-600'>
          Manually admit students to Goldchild without application process
        </p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow p-6 md:p-8 space-y-8'>
        {/* Personal Information */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>👤</span> Personal Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InputField
              label='First Name *'
              value={formData.personalInformation.firstName}
              onChange={(val) => updateField('personalInformation.firstName', val)}
              error={errors.firstName}
            />
            <InputField
              label='Last Name *'
              value={formData.personalInformation.lastName}
              onChange={(val) => updateField('personalInformation.lastName', val)}
              error={errors.lastName}
            />
            <InputField
              label='Email *'
              type='email'
              value={formData.personalInformation.email}
              onChange={(val) => updateField('personalInformation.email', val)}
              error={errors.email}
            />
            <InputField
              label='Phone Number *'
              value={formData.personalInformation.phoneNumber}
              onChange={(val) => updateField('personalInformation.phoneNumber', val)}
              error={errors.phoneNumber}
            />
            <InputField
              label='Date of Birth *'
              type='date'
              value={formData.personalInformation.dateOfBirth}
              onChange={(val) => updateField('personalInformation.dateOfBirth', val)}
              error={errors.dateOfBirth}
            />
            <SelectField
              label='Gender *'
              value={formData.personalInformation.gender}
              options={GENDER_OPTIONS}
              onChange={(val) => updateField('personalInformation.gender', val)}
              error={errors.gender}
            />
            <InputField
              label='Citizenship *'
              value={formData.personalInformation.citizenship}
              onChange={(val) => updateField('personalInformation.citizenship', val)}
              error={errors.citizenship}
            />
            <InputField
              label='ID / Passport Number *'
              value={formData.personalInformation.idOrPassportNumber}
              onChange={(val) => updateField('personalInformation.idOrPassportNumber', val)}
              error={errors.idOrPassportNumber}
            />
          </div>
        </section>

        {/* Academic Information */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>🎓</span> Academic Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <SelectField
              label='Highest Qualification *'
              value={formData.academicInformation.highestQualification}
              options={QUALIFICATION_OPTIONS}
              onChange={(val) => updateField('academicInformation.highestQualification', val)}
              error={errors.highestQualification}
            />
            <InputField
              label='KCSE Grade or Equivalent *'
              value={formData.academicInformation.kcseGradeOrEquivalent}
              onChange={(val) => updateField('academicInformation.kcseGradeOrEquivalent', val)}
              error={errors.kcseGradeOrEquivalent}
              placeholder='e.g. D+, C, A-, First Class'
            />

            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Course Selection *</label>
              <select
                value={formData.courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                disabled={isLoadingCourses}
                className='w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>{isLoadingCourses ? 'Loading courses...' : 'Select a course'}</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {errors.courseId && <p className='text-red-600 text-sm mt-1'>{errors.courseId}</p>}
            </div>

            {selectedCourse && (
              <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <div>
                  <p className='text-xs font-bold uppercase text-blue-600 mb-1'>Course Fee</p>
                  <p className='text-lg font-bold text-slate-900'>KES {selectedCourse.courseFee.toLocaleString()}</p>
                </div>
                <div>
                  <p className='text-xs font-bold uppercase text-blue-600 mb-1'>Duration</p>
                  <p className='text-lg font-bold text-slate-900'>{selectedCourse.duration} {selectedCourse.durationType}</p>
                </div>
                <div className='md:col-span-2'>
                  <p className='text-xs font-bold uppercase text-blue-600 mb-1'>Course Name</p>
                  <p className='text-sm font-bold text-slate-900'>{selectedCourse.name}</p>
                </div>
              </div>
            )}

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Mode of Training *</label>
              <div className='flex gap-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='radio'
                    checked={formData.academicInformation.modeOfTraining === 'Physical Classes'}
                    onChange={() => updateField('academicInformation.modeOfTraining', 'Physical Classes')}
                    className='w-4 h-4'
                  />
                  <span className='text-sm'>Physical Classes</span>
                </label>
                <label className='flex items-center gap-2'>
                  <input
                    type='radio'
                    checked={formData.academicInformation.modeOfTraining === 'Online Classes'}
                    onChange={() => updateField('academicInformation.modeOfTraining', 'Online Classes')}
                    className='w-4 h-4'
                  />
                  <span className='text-sm'>Online Classes</span>
                </label>
              </div>
              {errors.modeOfTraining && <p className='text-red-600 text-sm mt-1'>{errors.modeOfTraining}</p>}
            </div>
          </div>
        </section>

        {/* How They Found Us */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>🔍</span> How Did They Find Us?
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {DISCOVERY_OPTIONS.map(option => (
              <label key={option} className='flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50'>
                <input
                  type='checkbox'
                  checked={formData.discoveryChannels.includes(option)}
                  onChange={() => toggleDiscoveryChannel(option)}
                  className='w-4 h-4'
                />
                <span className='text-sm font-medium text-slate-700'>{option}</span>
              </label>
            ))}
          </div>
          {errors.discoveryChannels && <p className='text-red-600 text-sm mt-2'>{errors.discoveryChannels}</p>}
        </section>

        {/* Financial Information */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>💰</span> Financial Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InputField
              label='Who Will Pay Fee? *'
              value={formData.financialInformation.feePayerName}
              onChange={(val) => updateField('financialInformation.feePayerName', val)}
              error={errors.feePayerName}
            />
            <InputField
              label='Fee Payer Phone *'
              value={formData.financialInformation.feePayerPhoneNumber}
              onChange={(val) => updateField('financialInformation.feePayerPhoneNumber', val)}
              error={errors.feePayerPhoneNumber}
            />
          </div>
        </section>

        {/* Next of Kin */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>👨‍👩‍👧</span> Next of Kin
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <InputField
              label='Full Name *'
              value={formData.nextOfKin.fullName}
              onChange={(val) => updateField('nextOfKin.fullName', val)}
              error={errors.noKinName}
            />
            <InputField
              label='Relationship *'
              value={formData.nextOfKin.relationship}
              onChange={(val) => updateField('nextOfKin.relationship', val)}
              error={errors.noKinRelationship}
            />
            <InputField
              label='Phone Number *'
              value={formData.nextOfKin.phoneNumber}
              onChange={(val) => updateField('nextOfKin.phoneNumber', val)}
              error={errors.noKinPhone}
            />
          </div>
        </section>

        {/* Admission Details */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>📋</span> Admission Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <InputField
              label='Admission Number *'
              value={formData.admissionNumber}
              onChange={(val) => updateField('admissionNumber', val)}
              error={errors.admissionNumber}
              placeholder='e.g. GOLD-2026-001'
            />
            <InputField
              label='Start Date *'
              type='date'
              value={formData.startDate}
              onChange={(val) => updateField('startDate', val)}
              error={errors.startDate}
            />
            <InputField
              label='Upfront Fee Paid (KES) *'
              type='number'
              step='0.01'
              min='0'
              value={formData.upfrontFee}
              onChange={(val) => updateField('upfrontFee', val)}
              error={errors.upfrontFee}
              placeholder='0.00'
            />
          </div>
          {formData.courseFee > 0 && formData.upfrontFee && (
            <div className='mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded'>
              <p className='text-sm text-slate-700'>
                <span className='font-semibold'>Balance Due:</span> KES {Math.max(0, formData.courseFee - parseFloat(formData.upfrontFee || 0)).toLocaleString()}
              </p>
            </div>
          )}
        </section>

        {/* Admin Notes */}
        <section>
          <h3 className='text-xl font-bold text-slate-900 mb-5 flex items-center gap-2'>
            <span className='text-2xl'>📝</span> Admin Notes
          </h3>
          <textarea
            value={formData.adminNotes}
            onChange={(e) => updateField('adminNotes', e.target.value)}
            placeholder='Add any additional notes (optional)'
            rows='4'
            className='w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </section>

        {/* Submit Button */}
        <div className='flex gap-3 justify-end pt-6 border-t border-slate-200'>
          <button
            type='reset'
            className='px-6 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold hover:bg-slate-50 cursor-pointer'
          >
            Reset
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer'
          >
            {isSubmitting ? 'Admitting...' : 'Admit Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, value, onChange, error, type = 'text', placeholder = '', step, min }) => (
  <div>
    <label className='block text-sm font-semibold text-slate-700 mb-2'>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      step={step}
      min={min}
      className='w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    />
    {error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
  </div>
);

const SelectField = ({ label, value, options, onChange, error }) => (
  <div>
    <label className='block text-sm font-semibold text-slate-700 mb-2'>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    >
      <option value=''>Select an option</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
  </div>
);

export default AdmissionsTab;
