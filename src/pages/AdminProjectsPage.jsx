import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  createProject,
  deleteProject,
  getAdminProjects,
  getAdminSession,
  adminLogout,
  updateProject,
} from '@/lib/api';

const categoryOptions = [
  { value: 'Kitchen', label: 'Cuisine' },
  { value: 'Bathroom', label: 'Salle de Bain' },
  { value: 'Living Room', label: 'Salon' },
  { value: 'Other', label: 'Autre' },
];

const createInitialFormState = () => ({
  title: '',
  category: 'Kitchen',
  images: [],
  description: '',
  detailedDescription: '',
  timeline: '',
  budget: '',
  materialsText: '',
});

function getProjectImages(project) {
  const imagesFromArray = Array.isArray(project?.images) ? project.images : [];
  const trimmedImages = imagesFromArray
    .map((image) => (typeof image === 'string' ? image.trim() : ''))
    .filter(Boolean);

  if (trimmedImages.length > 0) {
    return [...new Set(trimmedImages)];
  }

  const fallbackImage = typeof project?.image === 'string' ? project.image.trim() : '';
  return fallbackImage ? [fallbackImage] : [];
}

function toPayload(formState) {
  const formData = new FormData();
  formData.append('title', formState.title.trim());
  formData.append('category', formState.category);
  formData.append('description', formState.description.trim());
  formData.append('detailedDescription', formState.detailedDescription.trim());
  formData.append('timeline', formState.timeline.trim());
  formData.append('budget', formState.budget.trim());
  formData.append('materials', formState.materialsText);
  formData.append('images', JSON.stringify(formState.images));

  return formData;
}

function fromProject(project) {
  return {
    title: project.title || '',
    category: project.category || 'Kitchen',
    images: getProjectImages(project),
    description: project.description || '',
    detailedDescription: project.detailedDescription || '',
    timeline: project.timeline || '',
    budget: project.budget || '',
    materialsText: Array.isArray(project.materials) ? project.materials.join('\n') : '',
  };
}

function AdminProjectsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminEmail, setAdminEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(createInitialFormState());
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([]);
  const imageInputRef = useRef(null);

  const editingProject = useMemo(
    () => projects.find((project) => project.id === editingId) || null,
    [projects, editingId],
  );

  const refreshProjects = useCallback(async () => {
    const response = await getAdminProjects();
    setProjects(Array.isArray(response.projects) ? response.projects : []);
  }, []);

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      try {
        const session = await getAdminSession();
        if (!mounted) return;
        setAdminEmail(session.admin.email);
        await refreshProjects();
      } catch {
        if (mounted) {
          navigate('/admin/login', { replace: true });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    boot();

    return () => {
      mounted = false;
    };
  }, [navigate, refreshProjects]);

  const resetForm = () => {
    setEditingId(null);
    setFormState(createInitialFormState());
    setSelectedImageFiles([]);
    setSelectedImagePreviews([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormState(fromProject(project));
    setSelectedImageFiles([]);
    setSelectedImagePreviews([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedImageFiles(files);
  };

  const clearSelectedImageFiles = () => {
    setSelectedImageFiles([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleRemoveExistingImage = (imageToDelete) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToDelete),
    }));
  };

  useEffect(() => {
    if (selectedImageFiles.length === 0) {
      setSelectedImagePreviews([]);
      return;
    }

    const objectUrls = selectedImageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImagePreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImageFiles]);

  const handleDelete = async (project) => {
    const confirmed = window.confirm(`Supprimer le projet "${project.title}" ?`);
    if (!confirmed) return;

    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      toast({
        title: 'Projet supprime',
        description: 'Le projet a ete supprime avec succes.',
      });

      if (editingId === project.id) {
        resetForm();
      }
    } catch (error) {
      toast({
        title: 'Suppression impossible',
        description: error.message || 'Une erreur est survenue.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const payload = toPayload(formState);
    for (const file of selectedImageFiles) {
      payload.append('imageFiles', file);
    }

    try {
      if (editingId) {
        const response = await updateProject(editingId, payload);
        setProjects((prev) =>
          prev.map((project) => (project.id === editingId ? response.project : project)),
        );
        toast({
          title: 'Projet mis a jour',
          description: 'Les modifications ont ete enregistrees.',
        });
      } else {
        const response = await createProject(payload);
        setProjects((prev) => [...prev, response.project].sort((a, b) => a.id - b.id));
        toast({
          title: 'Projet ajoute',
          description: 'Le nouveau projet est maintenant visible.',
        });
      }

      resetForm();
    } catch (error) {
      toast({
        title: 'Enregistrement impossible',
        description: error.message || 'Verifiez les informations du formulaire.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      navigate('/admin/login', { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <p className="text-slate-700 font-medium">Chargement de l espace admin...</p>
      </div>
    );
  }

  const previewImages = selectedImagePreviews.length > 0
    ? selectedImagePreviews
    : formState.images;

  return (
    <>
      <Helmet>
        <title>Admin Projects | Lapi Renov</title>
      </Helmet>

      <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gestion des projets</h1>
              <p className="text-slate-600 text-sm">Connecte en tant que {adminEmail}</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-slate-900 hover:bg-slate-800 text-white w-full md:w-auto"
            >
              Deconnexion
            </Button>
          </header>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingProject ? 'Modifier un projet' : 'Ajouter un projet'}
              </h2>
              {editingProject && (
                <Button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-900"
                >
                  Annuler
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Titre</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleChange('title', event.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Categorie</label>
                <select
                  value={formState.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Image du projet
                </label>
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                  onChange={handleImageFileChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required={!editingProject}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {editingProject
                    ? 'Laissez vide pour conserver les images actuelles. Un nouveau lot remplace la galerie.'
                    : 'Formats acceptes: PNG, JPG, WEBP, GIF. Max 5 MB.'}
                </p>
                {selectedImageFiles.length > 0 && (
                  <Button
                    type="button"
                    onClick={clearSelectedImageFiles}
                    className="mt-3 bg-slate-200 hover:bg-slate-300 text-slate-900"
                  >
                    Retirer les fichiers selectionnes
                  </Button>
                )}
                {previewImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {previewImages.map((image, index) => (
                      <div key={`${image}-${index}`} className="relative">
                        <img
                          src={image}
                          alt={`Apercu du projet ${index + 1}`}
                          className="h-28 w-full object-cover rounded-lg border border-slate-200"
                        />
                        {selectedImageFiles.length === 0 && editingProject && (
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(image)}
                            className="absolute top-1.5 right-1.5 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white hover:bg-black/80"
                          >
                            Retirer
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">Description courte</label>
                <textarea
                  value={formState.description}
                  onChange={(event) => handleChange('description', event.target.value)}
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">Description detaillee</label>
                <textarea
                  value={formState.detailedDescription}
                  onChange={(event) => handleChange('detailedDescription', event.target.value)}
                  rows={5}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Duree</label>
                <input
                  type="text"
                  value={formState.timeline}
                  onChange={(event) => handleChange('timeline', event.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="6 semaines"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Budget</label>
                <input
                  type="text"
                  value={formState.budget}
                  onChange={(event) => handleChange('budget', event.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="25 000 EUR - 30 000 EUR"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Materiaux (une ligne par materiau)
                </label>
                <textarea
                  value={formState.materialsText}
                  onChange={(event) => handleChange('materialsText', event.target.value)}
                  rows={4}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg"
                >
                  {isSaving
                    ? 'Enregistrement...'
                    : editingProject
                    ? 'Mettre a jour le projet'
                    : 'Ajouter le projet'}
                </Button>
              </div>
            </form>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Projets existants</h2>
              <span className="text-sm font-medium text-slate-600">{projects.length} projet(s)</span>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-sm text-slate-600">
                      {project.category} | {project.timeline} | {project.budget}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {getProjectImages(project).length} image(s)
                    </p>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      Modifier
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleDelete(project)}
                      className="bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      Supprimer
                    </Button>
                  </div>
                </article>
              ))}

              {projects.length === 0 && (
                <p className="text-slate-600">Aucun projet pour le moment.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminProjectsPage;
