export const PROJECT_CATEGORIES = ['Kitchen', 'Bathroom', 'Living Room', 'Other'];

const CATEGORY_SET = new Set(PROJECT_CATEGORIES);

const trimToString = (value) => (typeof value === 'string' ? value.trim() : '');
const splitImageString = (value) =>
  value
    .split(/\r?\n/)
    .map((item) => trimToString(item))
    .filter(Boolean);

function uniqueNonEmpty(values) {
  const seen = new Set();
  const output = [];

  for (const value of values) {
    const normalized = trimToString(value);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    output.push(normalized);
  }

  return output;
}

function parseImageListJson(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function normalizeImageList(input) {
  if (Array.isArray(input)) {
    return uniqueNonEmpty(input);
  }

  if (typeof input === 'string') {
    const parsed = parseImageListJson(input);
    if (Array.isArray(parsed)) {
      return uniqueNonEmpty(parsed);
    }
    return uniqueNonEmpty(splitImageString(input));
  }

  return [];
}

export function normalizeProjectImages(images, image = '') {
  return uniqueNonEmpty([...normalizeImageList(images), trimToString(image)]);
}

export function normalizeMaterials(input) {
  if (Array.isArray(input)) {
    return input.map((item) => trimToString(item)).filter(Boolean);
  }

  if (typeof input === 'string') {
    return input
      .split(/\r?\n|,/)
      .map((item) => trimToString(item))
      .filter(Boolean);
  }

  return [];
}

function validateField(errors, key, value, { required = true, max = 0 } = {}) {
  if (!value && required) {
    errors[key] = 'Ce champ est requis.';
    return;
  }

  if (value && max > 0 && value.length > max) {
    errors[key] = `Ce champ doit contenir ${max} caracteres maximum.`;
  }
}

export function validateProjectPayload(payload, { partial = false } = {}) {
  const normalizedImages = normalizeProjectImages(payload?.images, payload?.image);
  const normalized = {
    title: trimToString(payload?.title),
    category: trimToString(payload?.category),
    image: normalizedImages[0] || '',
    images: normalizedImages,
    description: trimToString(payload?.description),
    detailedDescription: trimToString(payload?.detailedDescription),
    timeline: trimToString(payload?.timeline),
    budget: trimToString(payload?.budget),
    materials: normalizeMaterials(payload?.materials),
  };

  const errors = {};

  const requireField = (key) => !partial || Object.prototype.hasOwnProperty.call(payload, key);

  if (requireField('title')) {
    validateField(errors, 'title', normalized.title, { required: true, max: 255 });
  }

  if (requireField('category')) {
    if (!normalized.category) {
      errors.category = 'La categorie est requise.';
    } else if (!CATEGORY_SET.has(normalized.category)) {
      errors.category = `Categorie invalide. Valeurs autorisees: ${PROJECT_CATEGORIES.join(', ')}`;
    }
  }

  if (requireField('images') || requireField('image')) {
    if (normalized.images.length === 0) {
      errors.images = 'Ajoutez au moins une image.';
    }
  }

  if (requireField('description')) {
    validateField(errors, 'description', normalized.description, { required: true });
  }

  if (requireField('detailedDescription')) {
    validateField(errors, 'detailedDescription', normalized.detailedDescription, { required: true });
  }

  if (requireField('timeline')) {
    validateField(errors, 'timeline', normalized.timeline, { required: true, max: 120 });
  }

  if (requireField('budget')) {
    validateField(errors, 'budget', normalized.budget, { required: true, max: 120 });
  }

  if (requireField('materials') && normalized.materials.length === 0) {
    errors.materials = 'Ajoutez au moins un materiau.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: normalized };
}

export function toProjectDto(project) {
  const images = normalizeProjectImages(project?.images, project?.image);

  return {
    id: project.id,
    title: project.title,
    category: project.category,
    image: images[0] || '',
    images,
    description: project.description,
    detailedDescription: project.detailedDescription,
    timeline: project.timeline,
    budget: project.budget,
    materials: Array.isArray(project.materials) ? project.materials : [],
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
