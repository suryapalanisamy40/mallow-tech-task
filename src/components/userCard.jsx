import React from "react";
import { Card, Row, Col, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserCard = ({ users = [], onEdit, onDelete }) => {
    return (
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 20 }}>
            {users.map((user) => (
                <Col key={user.id} xs={24} sm={12} md={8}>
                    <div className="user-card-wrapper" style={{ position: "relative" }}>
                        <Card
                            bordered
                            hoverable
                            className="user-card"
                            style={{
                                textAlign: "center",
                                overflow: "hidden",
                                transition: "background 0.3s",
                            }}
                            cover={
                                <img
                                    alt={user.first_name}
                                    src={user.avatar}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        margin: "20px auto 10px",
                                        display: "block",
                                    }}
                                />
                            }
                        >
                            <h2 style={{ marginBottom: 4 }}>
                                {user.first_name} {user.last_name}
                            </h2>
                            <h3 style={{ marginBottom: 0, color: "#808080" }}>
                                {user.email}
                            </h3>
                        </Card>

                        <div className="card-icons">
                            <Tooltip title="Edit">
                                <div
                                    onClick={() => onEdit && onEdit(user)}
                                    style={{
                                        background: "#1890ff",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        padding: 12,
                                        cursor: "pointer",
                                    }}
                                >
                                    <EditOutlined style={{ fontSize: 18 }} />
                                </div>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <div
                                    onClick={() => onDelete && onDelete(user.id)}
                                    style={{
                                        background: "#ff4d4f",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        padding: 12,
                                        cursor: "pointer",
                                    }}
                                >
                                    <DeleteOutlined style={{ fontSize: 18 }} />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default UserCard;
