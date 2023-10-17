/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { url } from "../../helpers";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
};

const MyUpload: React.FC<Props> = ({ setValue, defaultValue }) => {
  const [cookie] = useCookies(["token"]);
  const props: UploadProps = {
    name: "file",
    action: `${url}/file-router/upload`,
    headers: {
      authorization: cookie.token,
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setValue(info.file.response.file_url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => setValue(""),
  };
  return (
    <Upload
      {...props}
      maxCount={1}
      defaultFileList={
        defaultValue
          ? [
              {
                uid: "-1",
                name: "image",
                status: "done",
                url: defaultValue,
              },
            ]
          : []
      }
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default memo(MyUpload);
