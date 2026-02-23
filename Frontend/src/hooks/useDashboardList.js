import { useState, useEffect, useCallback } from "react";
import { api, apiPublic } from "@/lib/api";

/**
 * Manages list CRUD state for dashboard pages: load, modal, form, save, delete.
 * @param {Object} config
 * @param {string} config.listPath - API path for fetching
 * @param {string} config.dataKey - Response key (e.g. "projects", "experiences", "education")
 * @param {boolean} config.publicList - If true, use apiPublic for fetching (no auth)
 * @param {Object} config.emptyForm - Initial form state
 * @param {Function} config.formFromItem - (item) => form values for editing
 * @param {Function} config.buildPayload - (form) => API payload
 * @param {string} config.createPath - API path for create
 * @param {Function} config.updatePath - (id) => API path for update
 * @param {Function} config.deletePath - (id) => API path for delete
 * @param {string} config.confirmMessage - Message for delete confirmation
 */
export function useDashboardList({
  listPath,
  dataKey,
  emptyForm,
  formFromItem,
  buildPayload,
  createPath,
  updatePath,
  deletePath,
  publicList = false,
  confirmMessage = "Delete this item?",
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = publicList ? await apiPublic(listPath) : await api(listPath);
      setList(data[dataKey] ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [listPath, dataKey, publicList]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }, [emptyForm]);

  const openEdit = useCallback(
    (item) => {
      setEditing(item._id);
      setForm(formFromItem(item));
      setModalOpen(true);
    },
    [formFromItem]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setForm(emptyForm);
    setEditing(null);
  }, [emptyForm]);

  const save = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      const payload = buildPayload(form);
      try {
        if (editing) {
          await api(updatePath(editing), { method: "PATCH", body: payload });
        } else {
          await api(createPath, { method: "POST", body: payload });
        }
        closeModal();
        load();
      } catch (err) {
        setError(err.message);
      }
    },
    [editing, form, buildPayload, updatePath, createPath, closeModal, load]
  );

  const remove = useCallback(
    async (id) => {
      if (!confirm(confirmMessage)) return;
      setError("");
      try {
        await api(deletePath(id), { method: "DELETE" });
        load();
      } catch (err) {
        setError(err.message);
      }
    },
    [deletePath, load, confirmMessage]
  );

  return {
    list,
    loading,
    error,
    editing,
    form,
    setForm,
    modalOpen,
    openCreate,
    openEdit,
    closeModal,
    save,
    remove,
  };
}
