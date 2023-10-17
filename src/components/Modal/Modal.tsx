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
    width = 500,
  }: {
    children: React.ReactNode;
    variant: "view" | "delete" | "update" | "add";
    onOk: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    okButton: boolean;
    cancelButton: boolean;
    width?: number;
  }) => {
    const modal = useModal();
    return (
      <Modal
        width={width}
        title={variant}
        onOk={async () => {
          modal.hide();
          okButton && (await onOk());
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
