import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  blockAdminUser,
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  unblockAdminUser,
  updateAdminUser
} from '../api/adminApi';

const emptyCreateForm = {
  username: '',
  fullName: '',
  role: 'admin',
  password: ''
};

const emptyEditForm = {
  username: '',
  fullName: '',
  role: 'admin',
  password: ''
};

export default function AdminManagementTab({ token, currentUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [editForm, setEditForm] = useState(emptyEditForm);

  const isSuperAdmin = currentUser?.role === 'super_admin';

  const selectedUser = useMemo(() => users.find((user) => user.id === selectedUserId) || null, [users, selectedUserId]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const result = await getAdminUsers(token);
      setUsers(result);
    } catch (loadError) {
      const loadErrorMessage = loadError instanceof Error ? loadError.message : 'Failed to load admin users.';
      toast.error(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    loadUsers();
  }, [token]);

  useEffect(() => {
    if (!selectedUser) {
      setEditForm(emptyEditForm);
      return;
    }

    setEditForm({
      username: selectedUser.username,
      fullName: selectedUser.fullName,
      role: selectedUser.role,
      password: ''
    });
  }, [selectedUser]);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    if (!isSuperAdmin) {
      toast.error('Only super admins can create admin users.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createAdminUser(token, createForm);
      setCreateForm(emptyCreateForm);
      toast.success('Admin user created successfully.');
      await loadUsers();
    } catch (createError) {
      const createErrorMessage = createError instanceof Error ? createError.message : 'Failed to create admin user.';
      toast.error(createErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    if (!isSuperAdmin) {
      toast.error('Only super admins can update admin users.');
      return;
    }

    if (!selectedUserId) {
      toast.error('Select an admin user from the table first.');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        username: editForm.username,
        fullName: editForm.fullName,
        role: editForm.role
      };

      if (editForm.password.trim()) {
        payload.password = editForm.password;
      }

      await updateAdminUser(token, selectedUserId, payload);
      toast.success('Admin user updated successfully.');
      await loadUsers();
    } catch (updateError) {
      const updateErrorMessage = updateError instanceof Error ? updateError.message : 'Failed to update admin user.';
      toast.error(updateErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlockToggle = async (user) => {
    if (!isSuperAdmin) {
      toast.error('Only super admins can block or unblock users.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (user.isBlocked) {
        await unblockAdminUser(token, user.id);
        toast.success(`Unblocked ${user.username}.`);
      } else {
        await blockAdminUser(token, user.id);
        toast.success(`Blocked ${user.username}.`);
      }

      await loadUsers();
    } catch (statusError) {
      const statusErrorMessage = statusError instanceof Error ? statusError.message : 'Failed to change user status.';
      toast.error(statusErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!isSuperAdmin) {
      toast.error('Only super admins can delete admin users.');
      return;
    }

    try {
      setIsSubmitting(true);
      await deleteAdminUser(token, userId);

      if (selectedUserId === userId) {
        setSelectedUserId('');
      }

      toast.success('Admin user deleted successfully.');
      await loadUsers();
    } catch (deleteError) {
      const deleteErrorMessage = deleteError instanceof Error ? deleteError.message : 'Failed to delete admin user.';
      toast.error(deleteErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='space-y-6'>
      <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-secondary'>Admin Management</h2>
        <p className='mt-1 text-sm text-slate-600'>Manage admin accounts with full CRUD operations.</p>
        {!isSuperAdmin ? (
          <p className='mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-800'>
            Your current role is <strong>{currentUser?.role || 'unknown'}</strong>. Only super admins can modify records.
          </p>
        ) : null}
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <form className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm' onSubmit={handleCreateSubmit}>
          <h3 className='text-lg font-semibold text-secondary'>Create New Admin</h3>
          <div className='mt-4 space-y-3'>
            <input
              value={createForm.username}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, username: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Username'
              required
            />
            <input
              value={createForm.fullName}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Full Name'
              required
            />
            <select
              value={createForm.role}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, role: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
            >
              <option value='admin'>admin</option>
              <option value='super_admin'>super_admin</option>
            </select>
            <input
              type='password'
              value={createForm.password}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, password: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Password (min 6 chars)'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting || !isSuperAdmin}
            className='mt-4 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Create Admin
          </button>
        </form>

        <form className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm' onSubmit={handleUpdateSubmit}>
          <h3 className='text-lg font-semibold text-secondary'>Update Selected Admin</h3>
          <div className='mt-4 space-y-3'>
            <input
              value={editForm.username}
              onChange={(event) => setEditForm((prev) => ({ ...prev, username: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Username'
              disabled={!selectedUserId}
              required
            />
            <input
              value={editForm.fullName}
              onChange={(event) => setEditForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='Full Name'
              disabled={!selectedUserId}
              required
            />
            <select
              value={editForm.role}
              onChange={(event) => setEditForm((prev) => ({ ...prev, role: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              disabled={!selectedUserId}
            >
              <option value='admin'>admin</option>
              <option value='super_admin'>super_admin</option>
            </select>
            <input
              type='password'
              value={editForm.password}
              onChange={(event) => setEditForm((prev) => ({ ...prev, password: event.target.value }))}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              placeholder='New Password (optional)'
              disabled={!selectedUserId}
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting || !selectedUserId || !isSuperAdmin}
            className='mt-4 rounded-lg bg-secondary px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Update Admin
          </button>
        </form>
      </div>

      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-slate-100 text-secondary'>
            <tr>
              <th className='px-4 py-3'>Username</th>
              <th className='px-4 py-3'>Full Name</th>
              <th className='px-4 py-3'>Role</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className='px-4 py-4 text-slate-500' colSpan={5}>
                  Loading admin users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className='px-4 py-4 text-slate-500' colSpan={5}>
                  No admin users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t border-slate-100 ${selectedUserId === user.id ? 'bg-amber-50' : 'bg-white'}`}
                >
                  <td className='px-4 py-3'>{user.username}</td>
                  <td className='px-4 py-3'>{user.fullName}</td>
                  <td className='px-4 py-3'>{user.role}</td>
                  <td className='px-4 py-3'>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className='px-4 py-3'>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => setSelectedUserId(user.id)}
                        className='rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-secondary hover:bg-slate-50'
                      >
                        Select
                      </button>
                      <button
                        type='button'
                        disabled={isSubmitting || !isSuperAdmin}
                        onClick={() => handleBlockToggle(user)}
                        className='rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-secondary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        type='button'
                        disabled={isSubmitting || !isSuperAdmin}
                        onClick={() => handleDelete(user.id)}
                        className='rounded-md border border-red-300 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
