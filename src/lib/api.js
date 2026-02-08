async function request(path, options = {}) {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  const response = await fetch(path, {
    credentials: 'include',
    headers,
    ...options,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.details = payload?.details;
    throw error;
  }

  return payload;
}

export async function getProjects() {
  return request('/api/projects', { method: 'GET' });
}

export async function adminLogin(email, password) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogout() {
  return request('/api/admin/logout', { method: 'POST' });
}

export async function getAdminSession() {
  return request('/api/admin/me', { method: 'GET' });
}

export async function getAdminProjects() {
  return request('/api/admin/projects', { method: 'GET' });
}

export async function createProject(project) {
  const body =
    typeof FormData !== 'undefined' && project instanceof FormData
      ? project
      : JSON.stringify(project);

  return request('/api/admin/projects', {
    method: 'POST',
    body,
  });
}

export async function updateProject(id, project) {
  const body =
    typeof FormData !== 'undefined' && project instanceof FormData
      ? project
      : JSON.stringify(project);

  return request(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body,
  });
}

export async function deleteProject(id) {
  return request(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  });
}
