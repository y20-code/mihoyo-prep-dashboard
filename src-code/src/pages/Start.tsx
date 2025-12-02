import { Button } from 'antd'; // 引入 Ant Design 组件试试
import { useNavigate } from 'react-router-dom';
function Start() {

    const navigate = useNavigate()

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>🌌 米哈游备战台 (Mihoyo Prep)</h1>
        <p>Day 1: 环境搭建完成，Ready to go!</p>
        
        
        <Button 
                type="primary" 
                size="large" 
                style={{ marginTop: '20px' }}
                onClick={() => navigate('/main')}>
            启动！🚀
        </Button>
        </div>
    );
}

export default Start;