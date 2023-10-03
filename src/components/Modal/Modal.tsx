/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-refresh/only-export-components */
import { Modal } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export default NiceModal.create(
  ({
    children,
    variant,
    onOk,
    okButton = true,
    cancelButton = true,
  }: {
    children: React.ReactNode;
    variant: "view" | "delete" | "update";
    onOk: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    okButton: boolean;
    cancelButton: boolean;
  }) => {
    const modal = useModal();
    return (
      <Modal
        title={variant}
        onOk={async () => {
          if (variant == "view") {
            modal.hide();
          }
          await onOk();
        }}
        visible={modal.visible}
        onCancel={() => modal.hide()}
        afterClose={() => modal.remove()}
        okButtonProps={{ style: { display: okButton ? "block" : "none" } }}
        cancelButtonProps={{
          style: { display: cancelButton ? "block" : "none" },
        }}
      >
        {children}
      </Modal>
    );
  }
);
