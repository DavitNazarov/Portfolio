import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/dashboard/Modal";
import { useDashboardList } from "@/hooks/useDashboardList";
import DashboardCreateButton from "@/features/dashboard/components/DashboardCreateButton";
import DashboardEmptyState from "@/features/dashboard/components/DashboardEmptyState";
import DashboardError from "@/features/dashboard/components/DashboardError";
import DashboardLoading from "@/features/dashboard/components/DashboardLoading";
import DashboardRetry from "@/features/dashboard/components/DashboardRetry";

export default function DashboardCrudPage({ config }) {
  const dashboard = useDashboardList(config.resource);
  const FormComponent = config.FormComponent;
  const ListComponent = config.ListComponent;

  return (
    <DashboardLayout
      title={config.layout.title}
      subtitle={config.layout.subtitle}
      icon={config.layout.icon}
      iconColor={config.layout.iconColor}
      action={
        <DashboardCreateButton onClick={dashboard.openCreate}>
          {config.layout.actionLabel}
        </DashboardCreateButton>
      }
    >
      <Modal
        open={dashboard.modalOpen}
        onClose={dashboard.closeModal}
        title={dashboard.editing ? config.modal.editTitle : config.modal.createTitle}
      >
        <FormComponent
          editing={dashboard.editing}
          error={dashboard.error}
          form={dashboard.form}
          onCancel={dashboard.closeModal}
          onSubmit={dashboard.save}
          setForm={dashboard.setForm}
        />
      </Modal>

      <DashboardError
        message={dashboard.loadError || (!dashboard.modalOpen ? dashboard.error : "")}
      />

      {dashboard.loading ? (
        <DashboardLoading />
      ) : dashboard.loadError ? (
        <DashboardRetry onRetry={dashboard.reload} />
      ) : dashboard.list.length === 0 ? (
        <DashboardEmptyState
          actionLabel={config.emptyState.actionLabel}
          message={config.emptyState.message}
          onAction={dashboard.openCreate}
        />
      ) : (
        <ListComponent
          editingId={dashboard.editing}
          items={dashboard.list}
          onEdit={dashboard.openEdit}
          onRemove={dashboard.remove}
        />
      )}
    </DashboardLayout>
  );
}
