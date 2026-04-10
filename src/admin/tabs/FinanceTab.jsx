import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getStudents, updateStudent } from '../api/adminApi';

const FinanceTab = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [financeStats, setFinanceStats] = useState({
    totalStudents: 0,
    expectedFees: 0,
    collectedFees: 0,
    pendingFees: 0
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Update fee modal
  const [updateFeeModal, setUpdateFeeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newFeeAmount, setNewFeeAmount] = useState('');

  // Load students data
  useEffect(() => {
    if (!token) {
      console.warn('FinanceTab: No token provided');
      toast.error('Authentication token missing');
      return;
    }
    loadFinanceData();
  }, [currentPage, pageSize, search, token]);

  const loadFinanceData = async () => {
    setLoading(true);
    try {
      const query = {
        page: currentPage,
        limit: pageSize,
        search
      };
      const queryString = new URLSearchParams(query).toString();
      const studentsRes = await getStudents(token, queryString);
      
      setStudents(studentsRes.data);
      setTotalPages(studentsRes.pagination.pages);

      // Calculate finance stats
      const allStudentsRes = await getStudents(token, '?page=1&limit=10000');
      const allStudents = allStudentsRes.data;

      const expectedFees = allStudents.reduce((sum, s) => sum + (s.courseFee || 0), 0);
      const collectedFees = allStudents.reduce((sum, s) => sum + (s.upfrontFee || 0), 0);
      const pendingFees = expectedFees - collectedFees;

      setFinanceStats({
        totalStudents: allStudents.length,
        expectedFees,
        collectedFees,
        pendingFees
      });
    } catch (error) {
      console.error('Failed to load finance data:', error);
      const errorMsg = error?.message || 'Failed to load finance data';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFeeClick = (student) => {
    setSelectedStudent(student);
    setNewFeeAmount(student.upfrontFee?.toString() || '0');
    setUpdateFeeModal(true);
  };

  const handleSaveFee = async () => {
    if (!newFeeAmount || isNaN(newFeeAmount)) {
      toast.error('Please enter a valid fee amount');
      return;
    }

    try {
      const amount = parseFloat(newFeeAmount);
      await updateStudent(token, selectedStudent._id, { upfrontFee: amount });
      toast.success('Fee updated successfully');
      setUpdateFeeModal(false);
      loadFinanceData();
    } catch (error) {
      toast.error('Failed to update fee');
    }
  };

  const calculateBalance = (student) => {
    return Math.max(0, (student.courseFee || 0) - (student.upfrontFee || 0));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Finance Dashboard</h1>
        <p className="text-slate-600 mt-1">Track student fees and payment status</p>
      </div>

      {/* Finance Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard 
          label="Total Students" 
          value={financeStats.totalStudents} 
          color="blue"
          icon="👥"
        />
        <StatCard 
          label="Expected Fees" 
          value={`KES ${financeStats.expectedFees.toLocaleString()}`} 
          color="purple"
          icon="💰"
        />
        <StatCard 
          label="Collected Fees" 
          value={`KES ${financeStats.collectedFees.toLocaleString()}`} 
          color="green"
          icon="✓"
        />
        <StatCard 
          label="Pending Fees" 
          value={`KES ${financeStats.pendingFees.toLocaleString()}`} 
          color="red"
          icon="⏳"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student name, email, admission number..."
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

      {/* Students Finance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Expected Fee</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Paid Fee</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Balance</th>
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
                students.map((student) => {
                  const balance = calculateBalance(student);
                  return (
                    <tr key={student._id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {student.admissionNumber} <br />
                        {student.personalInformation?.firstName} {student.personalInformation?.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {student.courseName}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                        KES {(student.courseFee || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-700 text-right">
                        KES {(student.upfrontFee || 0).toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold text-right ${
                        balance === 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        KES {balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleUpdateFeeClick(student)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg cursor-pointer inline-flex items-center gap-2"
                          title="Update Fee"
                        >
                          <FaEdit />
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })
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

      {/* Update Fee Modal */}
      {updateFeeModal && selectedStudent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8">
          <div className="w-full max-w-md rounded-2xl bg-slate-50 shadow-2xl">
            {/* Header */}
            <div className="border-b border-slate-200 bg-slate-900 px-8 py-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Update Fee Payment</p>
              <h3 className="mt-1 text-2xl font-bold">
                {selectedStudent.personalInformation?.firstName} {selectedStudent.personalInformation?.lastName}
              </h3>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Course and Current Info */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Student Details</p>
                <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Course:</span>
                    <span className="font-semibold text-slate-900">{selectedStudent.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expected Fee:</span>
                    <span className="font-semibold text-slate-900">KES {(selectedStudent.courseFee || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-600">Current Paid:</span>
                    <span className="font-semibold text-green-700">KES {(selectedStudent.upfrontFee || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Fee Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wide text-slate-600">New Amount Paid (KES)</label>
                <input
                  type="number"
                  value={newFeeAmount}
                  onChange={(e) => setNewFeeAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                {newFeeAmount && !isNaN(newFeeAmount) && (
                  <div className={`text-sm ${
                    parseFloat(newFeeAmount) > selectedStudent.courseFee
                      ? 'text-red-600'
                      : parseFloat(newFeeAmount) === selectedStudent.courseFee
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {parseFloat(newFeeAmount) > selectedStudent.courseFee && (
                      <span>⚠️ Amount exceeds expected fee</span>
                    )}
                    {parseFloat(newFeeAmount) === selectedStudent.courseFee && (
                      <span>✓ Fee fully paid</span>
                    )}
                    {parseFloat(newFeeAmount) < selectedStudent.courseFee && (
                      <span>Balance: KES {(selectedStudent.courseFee - parseFloat(newFeeAmount)).toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setUpdateFeeModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFee}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  Save Fee
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
const StatCard = ({ label, value, color, icon }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};

export default FinanceTab;
