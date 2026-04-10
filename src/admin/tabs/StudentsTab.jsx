import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaGraduationCap, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getStudents, getStudentStats, updateStudent, graduateStudent } from '../api/adminApi';

const StudentsTab = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, suspended: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [graduateModal, setGraduateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [graduationNotes, setGraduationNotes] = useState('');

  // Load students and stats
  useEffect(() => {
    if (!token) {
      console.warn('StudentsTab: No token provided');
      toast.error('Authentication token missing');
      return;
    }
    loadStudentsAndStats();
  }, [currentPage, pageSize, search, statusFilter, token]);

  const loadStudentsAndStats = async () => {
    setLoading(true);
    try {
      // Load students
      const query = {
        page: currentPage,
        limit: pageSize,
        search,
        status: statusFilter
      };
      const queryString = new URLSearchParams(query).toString();
      console.log(`Fetching students with token: ${token ? '✓ Present' : '✗ Missing'}`, { queryString });
      
      const studentsRes = await getStudents(token, queryString);
      setStudents(studentsRes.data);
      setTotalPages(studentsRes.pagination.pages);

      // Load stats
      console.log('Fetching student stats...');
      const statsRes = await getStudentStats(token);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load students/stats:', error);
      const errorMsg = error?.message || 'Failed to load students';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setViewModal(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      personalInformation: { ...student.personalInformation } || {},
      academicInformation: { ...student.academicInformation } || {},
      financialInformation: { ...student.financialInformation } || {},
      nextOfKin: { ...student.nextOfKin } || {},
      upfrontFee: student.upfrontFee || 0,
      adminNotes: student.adminNotes || ''
    });
    setEditModal(true);
  };

  const handleGraduateClick = (student) => {
    setSelectedStudent(student);
    setGraduationNotes('');
    setGraduateModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateStudent(token, selectedStudent._id, editFormData);
      toast.success('Student updated successfully');
      setEditModal(false);
      loadStudentsAndStats();
    } catch (error) {
      toast.error('Failed to update student');
    }
  };

  const handleGraduate = async () => {
    try {
      // Check if fees completed
      if (selectedStudent.courseFee > selectedStudent.upfrontFee) {
        toast.error('Student has not completed school fees. Cannot graduate.');
        return;
      }

      await graduateStudent(token, selectedStudent._id, { graduationNotes });
      toast.success('Student graduated successfully');
      setGraduateModal(false);
      loadStudentsAndStats();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to graduate student';
      toast.error(errorMsg);
    }
  };

  const feesCompleted = selectedStudent && selectedStudent.courseFee <= selectedStudent.upfrontFee;

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Students" value={stats.total} color="blue" />
        <StatCard label="Active" value={stats.active} color="green" />
        <StatCard label="Inactive" value={stats.inactive} color="gray" />
        <StatCard label="Suspended" value={stats.suspended} color="red" />
        <StatCard label="Completed" value={stats.completed} color="purple" />
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, admission number..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admission #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {student.admissionNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.personalInformation?.firstName} {student.personalInformation?.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.personalInformation?.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === 'active' ? 'bg-green-100 text-green-800' :
                        student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        student.status === 'suspended' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewClick(student)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg cursor-pointer"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleGraduateClick(student)}
                          className={`p-2 rounded-lg ${
                            student.courseFee <= student.upfrontFee
                              ? 'text-green-600 hover:bg-green-100 cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          title={student.courseFee <= student.upfrontFee ? "Graduate" : "Cannot graduate - fees incomplete"}
                          disabled={student.courseFee > student.upfrontFee}
                        >
                          <FaGraduationCap />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewModal && selectedStudent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8">
          <div className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-50 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-900 px-8 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Student Details</p>
                  <h3 className="mt-1 text-2xl font-bold">
                    {selectedStudent.personalInformation?.firstName} {selectedStudent.personalInformation?.lastName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">{selectedStudent.admissionNumber}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${
                  selectedStudent.status === 'active' ? 'border-green-400 bg-green-50/10 text-green-400' :
                  selectedStudent.status === 'inactive' ? 'border-gray-400 bg-gray-50/10 text-gray-400' :
                  selectedStudent.status === 'suspended' ? 'border-red-400 bg-red-50/10 text-red-400' :
                  'border-blue-400 bg-blue-50/10 text-blue-400'
                }`}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Summary Cards */}
              <div className="mb-6 grid grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Admission #</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{selectedStudent.admissionNumber}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Course</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{selectedStudent.courseName}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Email</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedStudent.personalInformation?.email}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Start Date</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{new Date(selectedStudent.startDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-5">
                <ViewSection title="Personal Information">
                  <ViewField label="Full Name" value={`${selectedStudent.personalInformation?.firstName} ${selectedStudent.personalInformation?.lastName}`} />
                  <ViewField label="Email" value={selectedStudent.personalInformation?.email} />
                  <ViewField label="Phone" value={selectedStudent.personalInformation?.phoneNumber} />
                  <ViewField label="Date of Birth" value={selectedStudent.personalInformation?.dateOfBirth ? new Date(selectedStudent.personalInformation.dateOfBirth).toLocaleDateString() : '-'} />
                  <ViewField label="Gender" value={selectedStudent.personalInformation?.gender} />
                  <ViewField label="Citizenship" value={selectedStudent.personalInformation?.citizenship} />
                  <ViewField label="ID/Passport" value={selectedStudent.personalInformation?.idOrPassportNumber} />
                </ViewSection>

                <ViewSection title="Academic Information">
                  <ViewField label="Qualification" value={selectedStudent.academicInformation?.highestQualification} />
                  <ViewField label="KCSE Grade" value={selectedStudent.academicInformation?.kcseGradeOrEquivalent} />
                  <ViewField label="Course" value={selectedStudent.academicInformation?.course} />
                  <ViewField label="Training Mode" value={selectedStudent.academicInformation?.modeOfTraining} />
                </ViewSection>

                <ViewSection title="Course Details">
                  <ViewField label="Course Name" value={selectedStudent.courseName} />
                  <ViewField label="Duration" value={`${selectedStudent.duration} ${selectedStudent.durationType}`} />
                  <ViewField label="Course Fee" value={`KES ${selectedStudent.courseFee?.toLocaleString()}`} />
                  <ViewField label="Upfront Fee Paid" value={`KES ${selectedStudent.upfrontFee?.toLocaleString()}`} />
                  <ViewField label="Balance Due" value={`KES ${(selectedStudent.courseFee - selectedStudent.upfrontFee).toLocaleString()}`} />
                </ViewSection>

                <ViewSection title="Emergency Contact">
                  <ViewField label="Next of Kin" value={selectedStudent.nextOfKin?.fullName} />
                  <ViewField label="Relationship" value={selectedStudent.nextOfKin?.relationship} />
                  <ViewField label="Phone" value={selectedStudent.nextOfKin?.phoneNumber} />
                </ViewSection>

                {selectedStudent.adminNotes && (
                  <ViewSection title="Admin Notes" className="col-span-2">
                    <p className="text-sm text-slate-700">{selectedStudent.adminNotes}</p>
                  </ViewSection>
                )}
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewModal(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && selectedStudent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-900 px-8 py-5 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Edit Student</p>
                <h3 className="mt-1 text-2xl font-bold">
                  {selectedStudent.personalInformation?.firstName} {selectedStudent.personalInformation?.lastName}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Personal Information Section */}
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-2">First Name</label>
                    <input
                      type="text"
                      value={editFormData.personalInformation?.firstName || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        personalInformation: { ...editFormData.personalInformation, firstName: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={editFormData.personalInformation?.lastName || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        personalInformation: { ...editFormData.personalInformation, lastName: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-2">Email</label>
                    <input
                      type="email"
                      value={editFormData.personalInformation?.email || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        personalInformation: { ...editFormData.personalInformation, email: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-2">Phone</label>
                    <input
                      type="text"
                      value={editFormData.personalInformation?.phoneNumber || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        personalInformation: { ...editFormData.personalInformation, phoneNumber: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Notes Section */}
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">Admin Notes</h4>
                <textarea
                  value={editFormData.adminNotes || ''}
                  onChange={(e) => setEditFormData({
                    ...editFormData,
                    adminNotes: e.target.value
                  })}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end border-t border-slate-200 bg-slate-50 px-8 py-4">
              <button
                onClick={() => setEditModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Graduate Modal */}
      {graduateModal && selectedStudent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8">
          <div className="w-full max-w-lg rounded-2xl bg-white">
            {/* Header */}
            <div className="border-b border-slate-200 bg-slate-900 px-8 py-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">Graduation Checklist</p>
              <h3 className="mt-1 text-2xl font-bold">Graduate Student</h3>
              <p className="mt-1 text-sm text-slate-300">
                {selectedStudent.personalInformation?.firstName} {selectedStudent.personalInformation?.lastName}
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Requirements Checklist */}
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-yellow-900">Requirements for Graduation:</h4>
                <div className="space-y-2">
                  <GraduationCheck
                    label="School Fees Completed"
                    completed={feesCompleted}
                    details={`Course Fee: KES ${selectedStudent.courseFee?.toLocaleString()} | Paid: KES ${selectedStudent.upfrontFee?.toLocaleString()}`}
                  />
                </div>
              </div>

              {/* Warnings */}
              {!feesCompleted && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-900">
                    ⚠️ Student cannot graduate until all school fees are paid.
                  </p>
                </div>
              )}

              {/* Graduation Notes */}
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">Graduation Notes</h4>
                <textarea
                  value={graduationNotes}
                  onChange={(e) => setGraduationNotes(e.target.value)}
                  rows="3"
                  placeholder="Add any notes for graduation record (optional)..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end border-t border-slate-200 bg-slate-50 px-8 py-4">
              <button
                onClick={() => setGraduateModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGraduate}
                disabled={!feesCompleted}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  feesCompleted
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    : 'cursor-not-allowed bg-gray-400'
                }`}
              >
                Confirm Graduation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const ViewField = ({ label, value }) => {
  let displayValue = value;

  // Handle objects - try to extract a meaningful string representation
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    // Try common object properties
    if (value.name) {
      displayValue = value.name;
    } else if (value.title) {
      displayValue = value.title;
    } else if (value.firstName && value.lastName) {
      displayValue = `${value.firstName} ${value.lastName}`;
    } else {
      displayValue = JSON.stringify(value);
    }
  }

  return (
    <div className="border-b border-slate-200 pb-2">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{displayValue || '-'}</p>
    </div>
  );
};

const ViewSection = ({ title, children, className = '' }) => (
  <div className={`rounded-xl border border-slate-200 bg-white p-4 ${className}`}>
    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-2">{title}</h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const GraduationCheck = ({ label, completed, details }) => (
  <div className="flex items-start gap-3">
    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
      completed ? 'bg-green-500' : 'bg-red-500'
    }`}>
      {completed ? (
        <span className="text-white text-sm">✓</span>
      ) : (
        <span className="text-white text-sm">✗</span>
      )}
    </div>
    <div>
      <p className={`font-medium text-sm ${completed ? 'text-green-700' : 'text-red-700'}`}>
        {label}
      </p>
      <p className="text-sm text-slate-600 mt-1">{details}</p>
    </div>
  </div>
);

export default StudentsTab;
