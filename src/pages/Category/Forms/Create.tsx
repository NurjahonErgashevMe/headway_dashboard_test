/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Form, Space, Card, Typography } from "antd";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
// import { useQueryClient } from "@tanstack/react-query";
// import { useStore } from "../../../utils/store/store";
// import useCreate from "../../../hooks/useCreate";
import { CloseOutlined } from "@ant-design/icons";
type Props = {
  id: string;
};

const CategoryCreate: React.FC<Props> = () => {
  // const { state } = useStore();
  // const useCREATE = useCreate(`admin/category/${id}`);
  // const item = state?.find((item) => item.id === id);

  // const queryClient = useQueryClient();
  // const handleSubmit = (data: any) => {
  //   console.log(data);

  //   useCREATE.mutate(data, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["category"],
  //       });
  //       message.success("updated !");
  //     },
  //     onError: (err) => {
  //       console.log(err);

  //       message.error("error");
  //     },
  //   });
  // };
  const [form] = Form.useForm();
  return (
    <div className={classes.update}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
        onFinish={(value) => console.log(value)}
      >
        <Form.List name="children">
          {(fields: any, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field : any) => (
                <Card
                  size="small"
                  title={`Item ${field.name_uz + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name_uz);
                      }}
                    />
                  }
                >
                  <Form.Item label="Name uz" name={[field.name_uz, "name_uz"]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Name ru" name={[field.name_ru, "name_ru"]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Name ru" name={[field.name_en, "name_en"]}>
                    <Input />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="List">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Input placeholder="first" />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "second"]}
                              >
                                <Input placeholder="second" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(CategoryCreate);
