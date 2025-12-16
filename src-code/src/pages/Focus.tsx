import { useState} from 'react';
import { Button, Card, Progress, Typography, Space,List,Tag } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import {useTimer} from '../hooks/useTimer';

const { Title } = Typography;

interface FocusRecord {
    id:number;
    completedAt:string;
    duration:number;
}

function Focus() {
    const DEFAULT_TIME = 25 * 60; // 25分钟 = 1500秒
    const [history,setHistory] = useState<FocusRecord[]>([]);

    const { timeLeft, isActive, start, pause, reset, formattedTime } = useTimer(DEFAULT_TIME, () => {
        const now = new Date();
        const record: FocusRecord = {
            id: Date.now(),
            completedAt: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
            duration: DEFAULT_TIME / 60
        };
        setHistory(prev => [record, ...prev]);
    });
    

    

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Card title="🍅 番茄专注钟" bordered={false} style={{ maxWidth: 400, margin: '0 auto' }}>
                <div style={{ marginBottom: 30 }}>
                    <Progress 
                        type="circle" 
                        percent={(timeLeft / DEFAULT_TIME) * 100} 
                        format={() => formattedTime}
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
                        onClick={isActive ? pause : start}
                    />
                    <Button 
                        shape="circle" 
                        icon={<ReloadOutlined />} 
                        size="large" 
                        onClick={reset}
                    />
                </Space>
                <div style={{ marginTop: 20, color: '#888' }}>
                    {isActive ? '保持专注...' : '准备好了吗？'}
                </div>
            </Card>

            <div style={{ marginTop: 30 }}>
                <Title level={4}>专注记录</Title>
                <List
                    bordered
                    dataSource={history}
                    renderItem={(item) => (
                        <List.Item>
                            <span>🕒 完成于 {item.completedAt}</span>
                            <Tag color="green">专注 {item.duration} 分钟</Tag>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Focus;