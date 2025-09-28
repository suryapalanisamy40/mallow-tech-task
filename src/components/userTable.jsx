import React from "react";
import { Table, Button } from "antd";

const UserTable = ({ users = [], onEdit, onDelete }) => {
    const columns = [
        {
            dataIndex: "avatar",
            key: "avatar",
            render: (text) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={text}
                        alt="avatar"
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%" }}
                    />
                </div>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (mailId) => <span style={{ color: "#1677ff" }}>{mailId}</span>,
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => onEdit(record)}
                        style={{ marginRight: 8 }}
                    >
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => onDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
    ];

    return (
        <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
            scroll={{ x: 700 }}
            pagination={{ pageSize: 5 }}
        />
    );
};

export default UserTable;
