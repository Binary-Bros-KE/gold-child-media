const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
export const ADMIN_TOKEN_KEY = 'goldchild_admin_token';

const buildHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (endpoint, { method = 'GET', body, token } = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`API Request: ${method} ${endpoint}`, { hasToken: !!token });
  
  const response = await fetch(url, {
    method,
    headers: buildHeaders(token),
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    console.error(`API Error: ${response.status} - ${errorMessage}`, { endpoint, data });
    throw new Error(errorMessage);
  }

  return data;
};

export const loginAdmin = async ({ username, password }) => {
  const response = await request('/api/admin/auth/login', {
    method: 'POST',
    body: { username, password }
  });

  return response.data;
};

export const getCurrentAdmin = async (token) => {
  const response = await request('/api/admin/auth/me', { token });
  return response.data.user;
};

export const getAdminUsers = async (token) => {
  const response = await request('/api/admin/users', { token });
  return response.data;
};

export const createAdminUser = async (token, payload) => {
  const response = await request('/api/admin/users', {
    method: 'POST',
    token,
    body: payload
  });

  return response.data;
};

export const updateAdminUser = async (token, userId, payload) => {
  const response = await request(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    token,
    body: payload
  });

  return response.data;
};

export const blockAdminUser = async (token, userId) => {
  const response = await request(`/api/admin/users/${userId}/block`, {
    method: 'PATCH',
    token
  });

  return response.data;
};

export const unblockAdminUser = async (token, userId) => {
  const response = await request(`/api/admin/users/${userId}/unblock`, {
    method: 'PATCH',
    token
  });

  return response.data;
};

export const deleteAdminUser = async (token, userId) => {
  await request(`/api/admin/users/${userId}`, {
    method: 'DELETE',
    token
  });
};

export const getApplications = async (token) => {
  const response = await request('/api/applications/admin', { token });
  return response.data;
};

export const rejectApplication = async (token, applicationId, rejectionReason) => {
  const response = await request(`/api/applications/admin/${applicationId}/reject`, {
    method: 'PATCH',
    token,
    body: { rejectionReason }
  });

  return response.data;
};

export const deleteApplication = async (token, applicationId) => {
  await request(`/api/applications/admin/${applicationId}`, {
    method: 'DELETE',
    token
  });
};

export const admitStudent = async (token, applicationId, payload) => {
  const response = await request(`/api/applications/admin/${applicationId}/admit`, {
    method: 'POST',
    token,
    body: payload
  });

  return response.data;
};

export const getCourses = async (token) => {
  const response = await request('/api/courses/admin', { token });
  return response.data;
};

export const createCourse = async (token, payload) => {
  const response = await request('/api/courses/admin', {
    method: 'POST',
    token,
    body: payload
  });

  return response.data;
};

export const updateCourse = async (token, courseId, payload) => {
  const response = await request(`/api/courses/admin/${courseId}`, {
    method: 'PATCH',
    token,
    body: payload
  });

  return response.data;
};

export const deleteCourse = async (token, courseId) => {
  await request(`/api/courses/admin/${courseId}`, {
    method: 'DELETE',
    token
  });
};

// Students API
export const getStudents = async (token, queryString = '') => {
  const endpoint = `/api/students/admin${queryString ? `?${queryString}` : ''}`;
  const response = await request(endpoint, { token });
  return response;
};

export const getStudentStats = async (token) => {
  const response = await request('/api/students/admin/stats/all', { token });
  return response;
};

export const getStudent = async (token, studentId) => {
  const response = await request(`/api/students/admin/${studentId}`, { token });
  return response.data;
};

export const updateStudent = async (token, studentId, payload) => {
  const response = await request(`/api/students/admin/${studentId}`, {
    method: 'PATCH',
    token,
    body: payload
  });

  return response.data;
};

export const graduateStudent = async (token, studentId, payload) => {
  const response = await request(`/api/students/admin/${studentId}/graduate`, {
    method: 'POST',
    token,
    body: payload
  });

  return response.data;
};

// Alumni API
export const getAlumni = async (token, queryString = '') => {
  const endpoint = `/api/students/alumni/admin${queryString ? `?${queryString}` : ''}`;
  const response = await request(endpoint, { token });
  return response;
};

export const getAlumniStats = async (token) => {
  const response = await request('/api/students/alumni/stats/all', { token });
  return response;
};

// Manual admission (create student directly)
export const admitStudentManually = async (token, payload) => {
  const response = await request('/api/students/admin/manual', {
    method: 'POST',
    token,
    body: payload
  });

  return response.data;
};

// Get dashboard statistics
export const getDashboardStats = async (token) => {
  const response = await request('/api/students/admin/dashboard', { token });
  return response.data;
};