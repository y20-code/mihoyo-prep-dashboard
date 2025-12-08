import { useState, useEffect, useRef } from 'react';
import { Button, Card, Progress, Typography, Space } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Focus() {
    const DEFAULT_TIME = 25 * 60; // 25分钟 = 1500秒
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
    const [isActive, setIsActive] = useState(false);
    
    // 💡 为什么不用 let timer? 
    // 因为组件每次渲染都会重置局部变量。必须用 useRef 存定时器 ID，它在渲染间是持久的。
    const timerRef = useRef<number | null>(null);

    // 格式化时间：把 1500 变成 "25:00"
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // 开始/暂停逻辑
    const toggleTimer = () => {
        if (isActive) {
            // 暂停：清除定时器
            if (timerRef.current) clearInterval(timerRef.current);
            setIsActive(false);
        } else {
            // 开始：设置定时器
            setIsActive(true);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!); // 倒计时结束
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    // 重置
    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsActive(false);
        setTimeLeft(DEFAULT_TIME);
    };

    // 组件卸载时，一定要清理定时器！(防止内存泄漏)
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Card title="🍅 番茄专注钟" bordered={false} style={{ maxWidth: 400, margin: '0 auto' }}>
                <div style={{ marginBottom: 30 }}>
                    <Progress 
                        type="circle" 
                        percent={(timeLeft / DEFAULT_TIME) * 100} 
                        format={() => formatTime(timeLeft)}
                        size={200}
                        strokeColor={isActive ? '#1890ff' : '#faad14'}
                    />
                </div>
                
                <Space size="large">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={isActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />} 
                        size="large" 
                        onClick={toggleTimer}
                    />
                    <Button 
                        shape="circle" 
                        icon={<ReloadOutlined />} 
                        size="large" 
                        onClick={resetTimer}
                    />
                </Space>
                <div style={{ marginTop: 20, color: '#888' }}>
                    {isActive ? '保持专注...' : '准备好了吗？'}
                </div>
            </Card>
        </div>
    );
}

export default Focus;