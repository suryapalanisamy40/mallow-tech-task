import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    useEffect(() => {
        if (visible) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        } else {
            form.resetFields();
        }
    }, [visible, initialValues, form]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit User" : "Create New User"}
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: "Please enter first name" }]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[{ required: true, message: "Please enter last name" }]}
                >
                    <Input placeholder="Please enter last name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please enter email!" },
                        { type: "email", message: "Invalid email" }
                    ]}
                >
                    <Input placeholder="Please enter email" />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Profile Image URL"
                    rules={[{ required: true, message: "Please enter profile image link" }]}
                >
                    <Input placeholder="Please enter profile image link" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
