import {useState} from 'react';
import {Button,Card,Input,Typography,message} from "antd";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const {Title} = Typography;


function Login() {
    const [username,setUsername] = useState('');
    const { login } = useAuth();
    const navigate  = useNavigate();

    const handleLogin = () => {
        if (!username.trim()) return message.error('请输入名字')

        login(username);
        message.success(`欢迎，${username}！`);

        navigate("/dashboard",{ replace: true});
    }


    return (
        <div style={{ height: '100vh', display:'flex',justifyContent:"center",alignItems:"center",backgroundColor:"#f0f2f5" }}>
            <Card>
                <Title level={3}>🚀 米哈游备战台</Title>
                <div style={{marginTop:20}}>
                    <Input
                        placeholder="请输入你的昵称"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onPressEnter={handleLogin}
                    />
                    <Button type="primary" block size="large" style={{ marginTop: 20 }} onClick={handleLogin}>
                        立即开始
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Login;