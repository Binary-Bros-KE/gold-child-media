import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../api/adminApi';

const emptyCreateForm = {
  name: '',
  description: '',
  duration: '',
  durationType: 'months',
  courseFee: '',
  status: 'active'
};

export default function CoursesTab({ token }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [editForm, setEditForm] = useState(emptyCreateForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const selectedCourse = courses.find((course) => course.id === selectedCourseId) || null;

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const response = await getCourses(token);
      setCourses(response);
    } catch (loadError) {
      const messageText = loadError instanceof Error ? loadError.message : 'Failed to fetch courses.';
      toast.error(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    loadCourses();
  }, [token]);

  useEffect(() => {
    if (!selectedCourse) {
      setEditForm(emptyCreateForm);
      return;
    }

    setEditForm({
      name: selectedCourse.name,
      description: selectedCourse.description,
      duration: selectedCourse.duration.toString(),
      durationType: selectedCourse.durationType,
      courseFee: selectedCourse.courseFee.toString(),
      status: selectedCourse.status
    });
  }, [selectedCourse]);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      if (!createForm.name || !createForm.description || !createForm.duration || !createForm.courseFee) {
        toast.error('All fields are required.');
        setIsSubmitting(false);
        return;
      }

      await createCourse(token, {
        name: createForm.name,
        description: createForm.description,
        duration: parseInt(createForm.duration, 10),
        durationType: createForm.durationType,
        courseFee: parseFloat(createForm.courseFee),
        status: createForm.status
      });

      setCreateForm(emptyCreateForm);
      toast.success('Course created successfully.');
      await loadCourses();
    } catch (createError) {
      const createErrorMessage = createError instanceof Error ? createError.message : 'Failed to create course.';
      toast.error(createErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCourseId) {
      toast.error('Please select a course to update.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!editForm.name || !editForm.description || !editForm.duration || !editForm.courseFee) {
        toast.error('All fields are required.');
        setIsSubmitting(false);
        return;
      }

      await updateCourse(token, selectedCourseId, {
        name: editForm.name,
        description: editForm.description,
        duration: parseInt(editForm.duration, 10),
        durationType: editForm.durationType,
        courseFee: parseFloat(editForm.courseFee),
        status: editForm.status
      });

      toast.success('Course updated successfully.');
      setSelectedCourseId('');
      await loadCourses();
    } catch (updateError) {
      const updateErrorMessage = updateError instanceof Error ? updateError.message : 'Failed to update course.';
      toast.error(updateErrorMessage);
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
      await deleteCourse(token, deleteTarget.id);
      toast.success('Course deleted successfully.');
      setDeleteTarget(null);
      if (selectedCourseId === deleteTarget.id) {
        setSelectedCourseId('');
      }
      await loadCourses();
    } catch (deleteError) {
      const deleteErrorMessage = deleteError instanceof Error ? deleteError.message : 'Failed to delete course.';
      toast.error(deleteErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='space-y-6'>
      <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-secondary'>Courses</h2>
        <p className='mt-1 text-sm text-slate-600'>Create, update, and manage courses.</p>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <form className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm' onSubmit={handleCreateSubmit}>
          <h3 className='text-lg font-semibold text-secondary'>Create New Course</h3>
          <div className='mt-4 space-y-3'>
            <input
              value={createForm.name}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, name: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Course Name'
              required
            />
            <textarea
              value={createForm.description}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, description: event.target.value }))}
              className='h-20 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Description'
              required
            />
            <div className='grid grid-cols-2 gap-2'>
              <input
                type='number'
                value={createForm.duration}
                onChange={(event) => setCreateForm((prev) => ({ ...prev, duration: event.target.value }))}
                className='rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                placeholder='Duration'
                required
              />
              <select
                value={createForm.durationType}
                onChange={(event) => setCreateForm((prev) => ({ ...prev, durationType: event.target.value }))}
                className='rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              >
                <option value='hours'>Hours</option>
                <option value='days'>Days</option>
                <option value='weeks'>Weeks</option>
                <option value='months'>Months</option>
              </select>
            </div>
            <input
              type='number'
              value={createForm.courseFee}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, courseFee: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Course Fee'
              required
              step='0.01'
            />
            <select
              value={createForm.status}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, status: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-4 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Create Course
          </button>
        </form>

        <form className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm' onSubmit={handleUpdateSubmit}>
          <h3 className='text-lg font-semibold text-secondary'>Update Selected Course</h3>
          <div className='mt-4 space-y-3'>
            <input
              value={editForm.name}
              onChange={(event) => setEditForm((prev) => ({ ...prev, name: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Course Name'
              required
            />
            <textarea
              value={editForm.description}
              onChange={(event) => setEditForm((prev) => ({ ...prev, description: event.target.value }))}
              className='h-20 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Description'
              required
            />
            <div className='grid grid-cols-2 gap-2'>
              <input
                type='number'
                value={editForm.duration}
                onChange={(event) => setEditForm((prev) => ({ ...prev, duration: event.target.value }))}
                className='rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
                placeholder='Duration'
                required
              />
              <select
                value={editForm.durationType}
                onChange={(event) => setEditForm((prev) => ({ ...prev, durationType: event.target.value }))}
                className='rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              >
                <option value='hours'>Hours</option>
                <option value='days'>Days</option>
                <option value='weeks'>Weeks</option>
                <option value='months'>Months</option>
              </select>
            </div>
            <input
              type='number'
              value={editForm.courseFee}
              onChange={(event) => setEditForm((prev) => ({ ...prev, courseFee: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Course Fee'
              required
              step='0.01'
            />
            <select
              value={editForm.status}
              onChange={(event) => setEditForm((prev) => ({ ...prev, status: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-4 rounded-lg bg-secondary px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cur'
          >
            Update Course
          </button>
        </form>
      </div>

      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-slate-100 text-secondary'>
            <tr>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3'>Duration</th>
              <th className='px-4 py-3'>Fee</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className='px-4 py-4 text-slate-500' colSpan={5}>
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td className='px-4 py-4 text-slate-500' colSpan={5}>
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.id}
                  className={`border-t border-slate-100 ${selectedCourseId === course.id ? 'bg-amber-50' : 'bg-white'}`}
                >
                  <td className='px-4 py-3'>
                    <p className='font-semibold text-secondary'>{course.name}</p>
                    <p className='text-xs text-slate-500'>{course.description.substring(0, 40)}...</p>
                  </td>
                  <td className='px-4 py-3'>
                    {course.duration} {course.durationType}
                  </td>
                  <td className='px-4 py-3'>{course.courseFee}</td>
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-bold ${
                        course.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => setSelectedCourseId(course.id)}
                        className='rounded-md border border-slate-300 p-2 text-secondary hover:bg-slate-100'
                      >
                        <FaEdit />
                      </button>
                      <button
                        type='button'
                        onClick={() => setDeleteTarget(course)}
                        className='rounded-md border border-red-300 p-2 text-red-700 hover:bg-red-50'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget ? (
        <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-8'>
          <div className='w-full max-w-lg rounded-2xl bg-white p-6'>
            <h3 className='text-xl font-bold text-secondary'>Delete Course</h3>
            <p className='mt-2 text-sm text-slate-700'>
              Are you sure you want to permanently delete the course <strong>{deleteTarget.name}</strong>?
            </p>
            <div className='mt-5 flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => setDeleteTarget(null)}
                className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-secondary hover:bg-slate-100'
              >
                Cancel
              </button>
              <button
                type='button'
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
