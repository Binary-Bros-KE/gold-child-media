import React, { useState, useEffect } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAlumni, getAlumniStats } from '../api/adminApi';

const AlumniTab = ({ token }) => {
  const [alumni, setAlumni] = useState([]);
  const [stats, setStats] = useState({ total: 0, graduatedThisYear: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // View modal
  const [viewModal, setViewModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Load alumni and stats
  useEffect(() => {
    if (!token) {
      console.warn('AlumniTab: No token provided');
      toast.error('Authentication token missing');
      return;
    }
    loadAlumniAndStats();
  }, [currentPage, pageSize, search, token]);

  const loadAlumniAndStats = async () => {
    setLoading(true);
    try {
      // Load alumni
      const query = {
        page: currentPage,
        limit: pageSize,
        search
      };
      const queryString = new URLSearchParams(query).toString();
      console.log(`Fetching alumni with token: ${token ? '✓ Present' : '✗ Missing'}`, { queryString });
      
      const alumniRes = await getAlumni(token, queryString);
      setAlumni(alumniRes.data);
      setTotalPages(alumniRes.pagination.pages);

      // Load stats
      console.log('Fetching alumni stats...');
      const statsRes = await getAlumniStats(token);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load alumni/stats:', error);
      const errorMsg = error?.message || 'Failed to load alumni';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (alum) => {
    setSelectedAlumni(alum);
    setViewModal(true);
  };

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="Total Alumni" value={stats.total} color="blue" />
        <StatCard label="Graduated This Year" value={stats.graduatedThisYear} color="green" />
      </div>

      {/* Search and Filters */}
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

      {/* Alumni Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admission #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Alumni Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Graduation Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Loading alumni...
                  </td>
                </tr>
              ) : alumni.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No alumni found
                  </td>
                </tr>
              ) : (
                alumni.map((alum) => (
                  <tr key={alum._id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {alum.admissionNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {alum.personalInformation?.firstName} {alum.personalInformation?.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {alum.personalInformation?.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {alum.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(alum.graduationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewClick(alum)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg cursor-pointer transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
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
      {viewModal && selectedAlumni && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8">
          <div className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-50 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-300 border-slate-200 bg-slate-900 px-8 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Alumni Details</p>
                  <h3 className="mt-1 text-2xl font-bold">
                    {selectedAlumni.personalInformation?.firstName} {selectedAlumni.personalInformation?.lastName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">{selectedAlumni.admissionNumber}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Summary Cards */}
              <div className="mb-6 grid grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Admission #</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{selectedAlumni.admissionNumber}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Course</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{selectedAlumni.courseName}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Graduated</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{new Date(selectedAlumni.graduationDate).toLocaleDateString()}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Email</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedAlumni.personalInformation?.email}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-5">
                <ViewSection title="Personal Information">
                  <ViewField label="Full Name" value={`${selectedAlumni.personalInformation?.firstName} ${selectedAlumni.personalInformation?.lastName}`} />
                  <ViewField label="Email" value={selectedAlumni.personalInformation?.email} />
                  <ViewField label="Phone" value={selectedAlumni.personalInformation?.phoneNumber} />
                  <ViewField label="Date of Birth" value={selectedAlumni.personalInformation?.dateOfBirth ? new Date(selectedAlumni.personalInformation.dateOfBirth).toLocaleDateString() : '-'} />
                  <ViewField label="Gender" value={selectedAlumni.personalInformation?.gender} />
                  <ViewField label="Citizenship" value={selectedAlumni.personalInformation?.citizenship} />
                </ViewSection>

                <ViewSection title="Academic Information">
                  <ViewField label="Qualification" value={selectedAlumni.academicInformation?.highestQualification} />
                  <ViewField label="KCSE Grade" value={selectedAlumni.academicInformation?.kcseGradeOrEquivalent} />
                  <ViewField label="Course" value={selectedAlumni.academicInformation?.course} />
                  <ViewField label="Training Mode" value={selectedAlumni.academicInformation?.modeOfTraining} />
                </ViewSection>

                <ViewSection title="Course Details">
                  <ViewField label="Course Name" value={selectedAlumni.courseName} />
                  <ViewField label="Start Date" value={selectedAlumni.startDate ? new Date(selectedAlumni.startDate).toLocaleDateString() : '-'} />
                  <ViewField label="Duration" value={`${selectedAlumni.duration} ${selectedAlumni.durationType}`} />
                  <ViewField label="Course Fee" value={`KES ${selectedAlumni.courseFee?.toLocaleString()}`} />
                </ViewSection>

                <ViewSection title="Graduation Information">
                  <ViewField label="Graduation Date" value={new Date(selectedAlumni.graduationDate).toLocaleDateString()} />
                  {selectedAlumni.graduationNotes && (
                    <div className="text-sm mt-2">
                      <p className="font-bold text-slate-600 mb-1">Notes:</p>
                      <p className="text-slate-700">{selectedAlumni.graduationNotes}</p>
                    </div>
                  )}
                </ViewSection>

                <ViewSection title="Emergency Contact">
                  <ViewField label="Next of Kin" value={selectedAlumni.nextOfKin?.fullName} />
                  <ViewField label="Relationship" value={selectedAlumni.nextOfKin?.relationship} />
                  <ViewField label="Phone" value={selectedAlumni.nextOfKin?.phoneNumber} />
                </ViewSection>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewModal(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 cursor-pointer transition"
                >
                  Close
                </button>
              </div>
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
    <div className="space-y-1">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">{label}</p>
      <p className="text-slate-900 font-semibold">{displayValue || '-'}</p>
    </div>
  );
};

const ViewSection = ({ title, children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-600">{title}</h4>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

export default AlumniTab;
