import { useEffect, useMemo, useState } from "react";
import { Button, Input, notification, Space, Row, Col } from "antd";
import useRedux from "../hooks/useRedux";
import Loader from "../components/loader";
import UserTable from "../components/userTable";
import UserCard from "../components/userCard";
import UserModal from "../components/userModal";
import {
  getUserRequest,
  resetGetUser,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  resetDeleteUser,
  resetCreateUser,
  resetUpdateUser,
} from "../redux/user/actions";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  TableOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const UsersPage = () => {
  const { dispatch, appSelector } = useRedux();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [state, setState] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const {
    getUserList,
    getUserSuccess,
    getUserFailure,
    createUserSuccess,
    createUserData,
    createUserFailure,
    updateUserSuccess,
    updateUserData,
    updateUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    errorMessage,
  } = appSelector((state) => ({
    getUserList: state.userReducer.getUserList,
    getUserSuccess: state.userReducer.getUserSuccess,
    getUserFailure: state.userReducer.getUserFailure,
    createUserSuccess: state.userReducer.createUserSuccess,
    createUserData: state.userReducer.createUserData,
    createUserFailure: state.userReducer.createUserFailure,
    updateUserSuccess: state.userReducer.updateUserSuccess,
    updateUserData: state.userReducer.updateUserData,
    updateUserFailure: state.userReducer.updateUserFailure,
    deleteUserSuccess: state.userReducer.deleteUserSuccess,
    deleteUserFailure: state.userReducer.deleteUserFailure,
    errorMessage: state.userReducer.errorMessage,
  }));

  const openNotification = (message, status = "info", icon, placement = "topRight") => {
    api.open({
      message,
      placement,
      icon: icon,
      type: status,
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getUserRequest());
  }, [dispatch]);

  useEffect(() => {
    if (getUserSuccess) {
      setLoading(false);
      setState(getUserList);
      dispatch(resetGetUser());
    } else if (getUserFailure) {
      setLoading(false);
      setState([]);
      dispatch(resetGetUser());
    }
  }, [getUserSuccess, getUserFailure, dispatch, getUserList]);

  useEffect(() => {
    if (deleteUserSuccess) {
      setState((prev) => prev.filter((u) => u.id !== deleteId));
      setDeleteId(null);
      setLoading(false);
      openNotification(
        "User deleted successfully",
        "success",
        <CheckCircleOutlined style={{ color: "green" }} />,
        "topRight"
      );
      dispatch(resetDeleteUser());
    } else if (deleteUserFailure) {
      setLoading(false);
      openNotification(
        "Failed to delete user data",
        "error",
        <CloseCircleOutlined style={{ color: "red" }} />,
        "topRight"
      );
      resetDeleteUser();
    }
  }, [deleteUserSuccess, deleteUserFailure]);

  useEffect(() => {
    if (createUserSuccess) {
      closeModal();
      setState((prev) => [createUserData, ...prev]);
      openNotification(
        "User created successfully",
        "success",
        <CheckCircleOutlined style={{ color: "green" }} />,
        "topRight"
      );
      resetCreateUser();
    } else if (createUserFailure) {
      openNotification(
        "Failed to create user",
        "error",
        <CloseCircleOutlined style={{ color: "red" }} />,
        "topRight"
      );
      setLoading(false);
      resetCreateUser();
    }
  }, [createUserSuccess, createUserFailure, createUserData]);

  useEffect(() => {
    if (updateUserSuccess) {
      closeModal();
      const data = state.map((item) => {
        if (item.id === user.id) {
          return {
            id: user.id,
            ...updateUserData,
          };
        }
        return item;
      });
      setState(data);
      openNotification(
        "User updated successfully",
        "success",
        <CheckCircleOutlined style={{ color: "green" }} />,
        "topRight"
      );
      resetUpdateUser();
    } else if (updateUserFailure) {
      openNotification(
        "Failed to update user",
        "error",
        <CloseCircleOutlined style={{ color: "red" }} />,
        "topRight"
      );
      setLoading(false);
      resetUpdateUser();
    }
  }, [updateUserSuccess, updateUserFailure, updateUserData]);

  const filteredUsers = useMemo(() => {
    return state.filter(
      (u) =>
        u.first_name.toLowerCase().includes(search.toLowerCase()) ||
        u.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [state, search]);

  const handleEdit = (user) => {
    setUser(user);
    setModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleteId(id);
    setLoading(true);
    dispatch(deleteUserRequest(id));
  };

  const handleModalSubmit = (values) => {
    setLoading(true);
    if (user) {
      dispatch(updateUserRequest(values, user.id));
    } else {
      dispatch(createUserRequest(values));
    }
  };

  const createModal = () => {
    setUser(null);
    setModal(true);
    setLoading(false);
  }

  const closeModal = () => {
    setUser(null);
    setModal(false);
    setLoading(false);
  }

  return (
    <div style={{ background: "#dedede", minHeight: "100vh", padding: 20 }}>
      {contextHolder}

      <div
        style={{
          background: "white",
          padding: 20,
          margin: "0 auto ",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: 1200,
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Users</h2>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Space wrap>
              <Button
                icon={<TableOutlined />}
                type={view === "list" ? "primary" : "default"}
                onClick={() => setView("list")}
              >
                Table
              </Button>
              <Button
                icon={<AppstoreOutlined />}
                type={view === "card" ? "primary" : "default"}
                onClick={() => setView("card")}
              >
                Card
              </Button>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: "right" }}>
            <Space wrap>
              <Input
                placeholder="Input search text"
                suffix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: "white", minWidth: 200 }}
              />
              <Button type="primary" onClick={() => { createModal() }}>
                Create User
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div
        style={{
          background: "white",
          margin: "0 auto",
          padding: 20,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          maxWidth: 1200,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {loading ? (
          <Loader text="Loading users..." />
        ) : view === "list" ? (
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <UserCard users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete} />
        )}
      </div>

      <UserModal
        visible={modal}
        initialValues={user}
        onCancel={() => closeModal()}
        onSubmit={handleModalSubmit}
      />

      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default UsersPage;
