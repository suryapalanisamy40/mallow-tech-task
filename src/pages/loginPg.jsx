import { Form, Input, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import useRedux from "../hooks/useRedux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getLoginRequest, resetGetLogin } from "../redux/login/actions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { dispatch, appSelector } = useRedux();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { getLoginSuccess, getLoginList, getLoginFailure, error } =
        appSelector((state) => ({
            getLoginSuccess: state.loginReducer.getLoginSuccess,
            getLoginList: state.loginReducer.getLoginList,
            getLoginFailure: state.loginReducer.getLoginFailure,
            error: state.loginReducer.errorMessage,
        }));

    const onSubmit = (values) => {
        setLoading(true);
        dispatch(getLoginRequest(values));
    };

    useEffect(() => {
        if (getLoginSuccess) {
            setLoading(false);
            localStorage.setItem("loginInfo", JSON.stringify(getLoginList));
            navigate("/users");
            dispatch(resetGetLogin());
        } else if (getLoginFailure) {
            setLoading(false);
        }
    }, [getLoginSuccess, getLoginFailure, dispatch, getLoginList]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#dedede",
            }}
        >
            <Form
                name="login"
                onFinish={onSubmit}
                layout="vertical"
                style={{
                    width: 500,
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                initialValues={{
                    // email: "eve.holt@reqres.in",
                    // password: "cityslicka",
                    remember: true,
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                        { type: "email", message: "Invalid email" },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
