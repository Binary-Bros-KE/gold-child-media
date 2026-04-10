import React, { useEffect, useMemo, useState } from 'react';
import { FaCheck, FaEye, FaFileAlt, FaGraduationCap, FaTimesCircle, FaTrash, FaUser, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { admitStudent, deleteApplication, getApplications, getCourses, rejectApplication } from '../api/adminApi';

export default function ApplicationsTab({ token }) {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Admit modal state
    const [admitTarget, setAdmitTarget] = useState(null);
    const [courses, setCourses] = useState([]);
    const [admitForm, setAdmitForm] = useState({
        admissionNumber: '',
        startDate: '',
        courseId: '',
        upfrontFee: '',
        adminNotes: ''
    });
    const [isLoadingCourses, setIsLoadingCourses] = useState(false);

    const loadApplications = async () => {
        try {
            setIsLoading(true);
            const response = await getApplications(token);
            setApplications(response);
        } catch (loadError) {
            const messageText = loadError instanceof Error ? loadError.message : 'Failed to fetch applications.';
            toast.error(messageText);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCourses = async () => {
        try {
            setIsLoadingCourses(true);
            const response = await getCourses(token);
            setCourses(response);
        } catch (coursesError) {
            console.error('Failed to load courses:', coursesError);
        } finally {
            setIsLoadingCourses(false);
        }
    };

    const openAdmitModal = async (application) => {
        setAdmitTarget(application);
        setAdmitForm({
            admissionNumber: '',
            startDate: '',
            courseId: '',
            upfrontFee: '',
            adminNotes: ''
        });
        await loadCourses();
    };

    const closeAdmitModal = () => {
        setAdmitTarget(null);
        setAdmitForm({
            admissionNumber: '',
            startDate: '',
            courseId: '',
            upfrontFee: '',
            adminNotes: ''
        });
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        loadApplications();
    }, [token]);

    const sortedApplications = useMemo(() => {
        return [...applications].sort((first, second) => {
            const firstRejected = first.status === 'rejected';
            const secondRejected = second.status === 'rejected';

            if (firstRejected !== secondRejected) {
                return firstRejected ? 1 : -1;
            }

            const firstDate = new Date(first.submittedAt || first.createdAt || 0).getTime();
            const secondDate = new Date(second.submittedAt || second.createdAt || 0).getTime();

            return secondDate - firstDate;
        });
    }, [applications]);

    const stats = useMemo(() => {
        const total = applications.length;
        const pending = applications.filter((application) => (application.status || 'pending') === 'pending').length;
        const accepted = applications.filter((application) => {
            const status = application.status || 'pending';
            return status === 'admitted' || status === 'accepted';
        }).length;
        const rejected = applications.filter((application) => (application.status || 'pending') === 'rejected').length;

        return { total, pending, accepted, rejected };
    }, [applications]);

    const closeRejectModal = () => {
        setRejectTarget(null);
        setRejectionReason('');
    };

    const handleConfirmReject = async () => {
        if (!rejectTarget) {
            return;
        }

        try {
            setIsSubmitting(true);
            await rejectApplication(token, rejectTarget._id, rejectionReason.trim());
            toast.success('Application rejected successfully.');
            closeRejectModal();
            await loadApplications();
        } catch (rejectError) {
            const messageText = rejectError instanceof Error ? rejectError.message : 'Failed to reject application.';
            toast.error(messageText);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setIsSubmitting(true);
            await deleteApplication(token, deleteTarget._id);
            toast.success('Application deleted successfully.');
            setDeleteTarget(null);
            if (selectedApplication?._id === deleteTarget._id) {
                setSelectedApplication(null);
            }
            await loadApplications();
        } catch (deleteError) {
            const messageText = deleteError instanceof Error ? deleteError.message : 'Failed to delete application.';
            toast.error(messageText);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmAdmit = async () => {
        if (!admitTarget || !admitForm.admissionNumber || !admitForm.startDate || !admitForm.courseId || admitForm.upfrontFee === '') {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            setIsSubmitting(true);

            await admitStudent(token, admitTarget._id, {
                admissionNumber: admitForm.admissionNumber,
                startDate: admitForm.startDate,
                courseId: admitForm.courseId,
                upfrontFee: parseFloat(admitForm.upfrontFee),
                adminNotes: admitForm.adminNotes
            });

            toast.success('Student admitted successfully.');
            closeAdmitModal();
            if (selectedApplication?._id === admitTarget._id) {
                setSelectedApplication(null);
            }
            await loadApplications();
        } catch (admitError) {
            const messageText = admitError instanceof Error ? admitError.message : 'Failed to admit student.';
            toast.error(messageText);
        } finally {
            setIsSubmitting(false);
        }
    };

    const ViewField = ({ label, value }) => (
        <div className='border-b border-slate-200 pb-2'>
            <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>{label}</p>
            <p className='mt-1 text-sm font-semibold text-secondary'>{value || '-'}</p>
        </div>
    );

    const ViewSection = ({ icon, title, children }) => (
        <div className='rounded-xl border border-slate-200 bg-white p-4'>
            <div className='mb-4 flex items-center gap-2 border-b border-slate-200 pb-2'>
                <span className='text-primary'>{icon}</span>
                <h4 className='text-sm font-bold uppercase tracking-wide text-secondary'>{title}</h4>
            </div>
            <div className='space-y-3'>{children}</div>
        </div>
    );

    return (
        <section className='space-y-6'>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-bold text-secondary'>Applications</h2>
                <p className='mt-1 text-sm text-slate-600'>
                    Manage and review student applications
                </p>
            </div>

            <div className='grid grid-cols-4 gap-4'>
                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Total App</p>
                    <p className='mt-2 text-3xl font-bold text-secondary'>{stats.total}</p>
                </div>
                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Pending</p>
                    <p className='mt-2 text-3xl font-bold text-secondary'>{stats.pending}</p>
                </div>
                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Accepted</p>
                    <p className='mt-2 text-3xl font-bold text-secondary'>{stats.accepted}</p>
                </div>
                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Rejected</p>
                    <p className='mt-2 text-3xl font-bold text-secondary'>{stats.rejected}</p>
                </div>
            </div>

            <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
                <table className='min-w-full text-left text-sm'>
                    <thead className='bg-slate-100 text-secondary'>
                        <tr>
                            <th className='px-4 py-3'>Application #</th>
                            <th className='px-4 py-3'>Course</th>
                            <th className='px-4 py-3'>Status</th>
                            <th className='px-4 py-3'>Submitted</th>
                            <th className='px-4 py-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td className='px-4 py-4 text-slate-500' colSpan={7}>
                                    Loading applications...
                                </td>
                            </tr>
                        ) : sortedApplications.length === 0 ? (
                            <tr>
                                <td className='px-4 py-4 text-slate-500' colSpan={7}>
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            <>
                                {sortedApplications.map((application, index) => {
                                    // Add divider before rejected section
                                    const isFirstRejected = index > 0 && application.status === 'rejected' && sortedApplications[index - 1].status !== 'rejected';
                                    
                                    return (
                                        <React.Fragment key={`app-${application._id}`}>
                                            {isFirstRejected && (
                                                <tr className='border-t-2 border-t-red-300 bg-red-100'>
                                                    <td colSpan={5} className='px-4 py-2'>
                                                        <p className='text-xs font-bold uppercase tracking-wide text-red-600 flex items-center gap-2'>
                                                            <FaTimesCircle /> Rejected Applications
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                            <tr className={`border-t border-slate-100 ${
                                              application.status === 'rejected' 
                                                ? 'bg-red-50 hover:bg-red-100' 
                                                : 'hover:bg-slate-50'
                                            } transition-colors`}>
                                                <td className='px-4 py-3'>
                                                    <span className='font-bold text-secondary'>{application.personalInformation?.firstName} {application.personalInformation?.lastName}</span><br />
                                                    <span className='text-xs text-slate-600'>{application.applicationNumber}</span> <br />
                                                    <span className='text-xs text-slate-600'>{application.personalInformation?.email}</span>
                                                </td>
                                                <td className='px-4 py-3'>
                                                    {application.academicInformation?.course?.title || application.academicInformation?.course?.name || '-'}
                                                </td>
                                                <td className='px-4 py-3'>
                                                    {application.status === 'rejected' ? (
                                                        <div className='inline-flex items-center gap-2 rounded-full border-2 border-red-400 bg-white px-3 py-1'>
                                                            <FaTimesCircle className='text-red-500 text-sm' />
                                                            <span className='text-sm font-bold text-red-600'>Rejected</span>
                                                        </div>
                                                    ) : application.status === 'admitted' || application.status === 'accepted' ? (
                                                        <div className='inline-flex items-center gap-2 rounded-full border-2 border-green-400 bg-white px-3 py-1'>
                                                            <FaCheckCircle className='text-green-500 text-sm' />
                                                            <span className='text-sm font-bold text-green-600'>Accepted</span>
                                                        </div>
                                                    ) : (
                                                        <div className='inline-flex items-center gap-2 rounded-full border-2 border-blue-400 bg-white px-3 py-1'>
                                                            <FaClock className='text-blue-500 text-sm' />
                                                            <span className='text-sm font-bold text-blue-600'>Pending</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className='px-4 py-3 text-xs text-slate-600'>
                                                    {application.submittedAt ? new Date(application.submittedAt).toLocaleString() : '-'}
                                                </td>
                                                <td className='px-4 py-3'>
                                                    <div className='flex items-center gap-2'>
                                                        <button
                                                            type='button'
                                                            title='View Application'
                                                            onClick={() => setSelectedApplication(application)}
                                                            className='rounded-md border border-secondary p-2 text-secondary hover:bg-slate-100 cursor-pointer'
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {application.status !== 'rejected' && (
                                                            <>
                                                                <button
                                                                    type='button'
                                                                    title='Admit Application'
                                                                    onClick={() => openAdmitModal(application)}
                                                                    className='rounded-md border border-green-500 p-2 text-green-500 hover:bg-green-100 cursor-pointer'
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                                <button
                                                                    type='button'
                                                                    title='Reject Application'
                                                                    onClick={() => setRejectTarget(application)}
                                                                    className='rounded-md border border-amber-300 p-2 text-amber-700 hover:bg-amber-50 cursor-pointer'
                                                                >
                                                                    <FaTimesCircle />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            type='button'
                                                            title='Delete Application'
                                                            onClick={() => setDeleteTarget(application)}
                                                            className='rounded-md border border-red-300 p-2 text-red-700 hover:bg-red-50 cursor-pointer'
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedApplication ? (
                <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8'>
                    <div className='max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-50 shadow-2xl'>
                        <div className='sticky top-0 z-10 border-b border-slate-200 bg-secondary px-8 py-5 text-white'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Application Overview</p>
                                    <h3 className='mt-1 text-2xl font-bold'>
                                        {selectedApplication.personalInformation?.firstName} {selectedApplication.personalInformation?.lastName}
                                    </h3>
                                    <p className='mt-1 text-sm text-slate-200'>{selectedApplication.applicationNumber}</p>
                                </div>
                                <span className='rounded-full border border-primary px-3 py-1 text-xs font-bold uppercase text-primary'>
                                    {selectedApplication.status || 'pending'}
                                </span>
                            </div>
                        </div>

                        <div className='p-8'>
                            <div className='mb-6 grid grid-cols-4 gap-4'>
                                <div className='rounded-xl border border-slate-200 bg-white p-4'>
                                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Submitted</p>
                                    <p className='mt-1 text-sm font-semibold text-secondary'>
                                        {selectedApplication.submittedAt ? new Date(selectedApplication.submittedAt).toLocaleString() : '-'}
                                    </p>
                                </div>
                                <div className='rounded-xl border border-slate-200 bg-white p-4'>
                                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Course</p>
                                    <p className='mt-1 text-sm font-semibold text-secondary'>
                                        {selectedApplication.academicInformation?.course?.title || selectedApplication.academicInformation?.course?.name || '-'}
                                    </p>
                                </div>
                                <div className='rounded-xl border border-slate-200 bg-white p-4'>
                                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Email</p>
                                    <p className='mt-1 text-sm font-semibold text-secondary'>{selectedApplication.personalInformation?.email || '-'}</p>
                                </div>
                                <div className='rounded-xl border border-slate-200 bg-white p-4'>
                                    <p className='text-[11px] font-bold uppercase tracking-wide text-primary'>Rejection Reason</p>
                                    <p className='mt-1 text-sm font-semibold text-secondary'>{selectedApplication.rejectionReason || 'N/A'}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5'>
                                <ViewSection icon={<FaUser />} title='Personal Information'>
                                    <ViewField
                                        label='Full Name'
                                        value={`${selectedApplication.personalInformation?.firstName || ''} ${selectedApplication.personalInformation?.lastName || ''}`.trim()}
                                    />
                                    <ViewField label='Phone Number' value={selectedApplication.personalInformation?.phoneNumber} />
                                    <ViewField label='Date of Birth' value={selectedApplication.personalInformation?.dateOfBirth} />
                                    <ViewField label='Gender' value={selectedApplication.personalInformation?.gender} />
                                    <ViewField label='Citizenship' value={selectedApplication.personalInformation?.citizenship} />
                                    <ViewField label='ID / Passport Number' value={selectedApplication.personalInformation?.idOrPassportNumber} />
                                </ViewSection>

                                <ViewSection icon={<FaGraduationCap />} title='Academic Information'>
                                    <ViewField label='Highest Qualification' value={selectedApplication.academicInformation?.highestQualification} />
                                    <ViewField label='KCSE / Equivalent Grade' value={selectedApplication.academicInformation?.kcseGradeOrEquivalent} />
                                    <ViewField
                                        label='Preferred Course'
                                        value={selectedApplication.academicInformation?.course?.title || selectedApplication.academicInformation?.course?.name}
                                    />
                                    <ViewField label='Preferred Intake Month' value={selectedApplication.academicInformation?.preferredIntakeMonth} />
                                    <ViewField label='Preferred Start Date' value={selectedApplication.academicInformation?.preferredStartDate} />
                                    <ViewField label='Mode of Training' value={selectedApplication.academicInformation?.modeOfTraining} />
                                </ViewSection>

                                <ViewSection icon={<FaFileAlt />} title='Financial & Discovery Information'>
                                    <ViewField
                                        label='Discovery Channels'
                                        value={Array.isArray(selectedApplication.discoveryChannels)
                                            ? selectedApplication.discoveryChannels.join(', ')
                                            : '-'}
                                    />
                                    <ViewField label='Fee Payer Name' value={selectedApplication.financialInformation?.feePayerName} />
                                    <ViewField label='Fee Payer Phone Number' value={selectedApplication.financialInformation?.feePayerPhoneNumber} />
                                </ViewSection>

                                <ViewSection icon={<FaUsers />} title='Next of Kin & Declaration'>
                                    <ViewField label='Next of Kin Name' value={selectedApplication.nextOfKin?.fullName} />
                                    <ViewField label='Relationship' value={selectedApplication.nextOfKin?.relationship} />
                                    <ViewField label='Next of Kin Phone' value={selectedApplication.nextOfKin?.phoneNumber} />
                                    <ViewField
                                        label='Rules Accepted'
                                        value={selectedApplication.declarations?.rulesAccepted ? 'Yes' : 'No'}
                                    />
                                </ViewSection>
                            </div>

                            <div className='mt-6 flex justify-end'>
                                <button
                                    type='button'
                                    onClick={() => setSelectedApplication(null)}
                                    className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-secondary hover:bg-slate-100'
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {rejectTarget ? (
                <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8'>
                    <div className='w-full max-w-lg rounded-2xl bg-white p-6'>
                        <h3 className='text-xl font-bold text-secondary'>⚠️ Reject Application</h3>
                        <p className='mt-2 text-sm text-slate-700'>
                            Are you sure you want to reject this application? Please provide a reason for rejection.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(event) => setRejectionReason(event.target.value)}
                            placeholder='Enter rejection reason (optional)'
                            className='mt-4 h-28 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                        />
                        <div className='mt-5 flex justify-end gap-3'>
                            <button
                                type='button'
                                onClick={closeRejectModal}
                                className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-secondary hover:bg-slate-100 cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                disabled={isSubmitting}
                                onClick={handleConfirmReject}
                                className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {deleteTarget ? (
                <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8'>
                    <div className='w-full max-w-lg rounded-2xl bg-white p-6'>
                        <h3 className='text-xl font-bold text-secondary'>Delete Application</h3>
                        <p className='mt-2 text-sm text-slate-700'>Are you sure you want to permanently delete this application?</p>
                        <div className='mt-5 flex justify-end gap-3'>
                            <button
                                type='button'
                                onClick={() => setDeleteTarget(null)}
                                className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-secondary hover:bg-slate-100 cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                disabled={isSubmitting}
                                onClick={handleConfirmDelete}
                                className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {admitTarget ? (
                <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8'>
                    <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8'>
                        <h3 className='text-2xl font-bold text-secondary'>Admit Student</h3>
                        <p className='mt-1 text-sm text-slate-600'>
                            {admitTarget.personalInformation?.firstName} {admitTarget.personalInformation?.lastName} -{' '}
                            {admitTarget.applicationNumber}
                        </p>

                        <div className='mt-6 space-y-4'>
                            <div>
                                <label className='block text-sm font-semibold text-secondary'>Admission Number *</label>
                                <input
                                    type='text'
                                    value={admitForm.admissionNumber}
                                    onChange={(event) =>
                                        setAdmitForm((prev) => ({
                                            ...prev,
                                            admissionNumber: event.target.value
                                        }))
                                    }
                                    placeholder='e.g., GOLD-2026-001'
                                    className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-secondary'>Start Date *</label>
                                <input
                                    type='date'
                                    value={admitForm.startDate}
                                    onChange={(event) =>
                                        setAdmitForm((prev) => ({
                                            ...prev,
                                            startDate: event.target.value
                                        }))
                                    }
                                    className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-secondary'>Select Course *</label>
                                <select
                                    value={admitForm.courseId}
                                    onChange={(event) =>
                                        setAdmitForm((prev) => ({
                                            ...prev,
                                            courseId: event.target.value
                                        }))
                                    }
                                    className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                                    required
                                    disabled={isLoadingCourses}
                                >
                                    <option value=''>
                                        {isLoadingCourses ? 'Loading courses...' : 'Select a course'}
                                    </option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                <p className='mt-2 text-xs text-slate-500'>
                                    Student applied for: <strong>{admitTarget.academicInformation?.course?.title || admitTarget.academicInformation?.course?.name || '-'}</strong>
                                </p>
                            </div>

                            {admitForm.courseId && courses.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4'>
                                        <div>
                                            <label className='block text-xs font-semibold uppercase tracking-wide text-primary'>
                                                Course Fee
                                            </label>
                                            <p className='mt-2 text-lg font-bold text-secondary'>
                                                {courses.find((c) => c.id === admitForm.courseId)?.courseFee || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className='block text-xs font-semibold uppercase tracking-wide text-primary'>
                                                Duration
                                            </label>
                                            <p className='mt-2 text-lg font-bold text-secondary'>
                                                {(() => {
                                                    const course = courses.find((c) => c.id === admitForm.courseId);
                                                    return course ? `${course.duration} ${course.durationType}` : '-';
                                                })()}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            <div>
                                <label className='block text-sm font-semibold text-secondary'>Amount Paid (Upfront Fee) *</label>
                                <input
                                    type='number'
                                    value={admitForm.upfrontFee}
                                    onChange={(event) =>
                                        setAdmitForm((prev) => ({
                                            ...prev,
                                            upfrontFee: event.target.value
                                        }))
                                    }
                                    placeholder='0.00'
                                    className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                                    required
                                    step='0.01'
                                    min='0'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-secondary'>Admin Notes</label>
                                <textarea
                                    value={admitForm.adminNotes}
                                    onChange={(event) =>
                                        setAdmitForm((prev) => ({
                                            ...prev,
                                            adminNotes: event.target.value
                                        }))
                                    }
                                    placeholder='Add any additional notes (optional)'
                                    className='mt-2 h-24 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                                />
                            </div>
                        </div>

                        <div className='mt-6 flex justify-end gap-3'>
                            <button
                                type='button'
                                onClick={closeAdmitModal}
                                className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-secondary hover:bg-slate-100 cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                disabled={isSubmitting || isLoadingCourses}
                                onClick={handleConfirmAdmit}
                                className='rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
                            >
                                {isSubmitting ? 'Admitting...' : 'Admit Student'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
