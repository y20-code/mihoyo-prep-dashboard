// src/pages/Statistics.tsx
import { Card, Col, Row, Statistic } from 'antd';
import { CheckCircleOutlined, FormOutlined } from '@ant-design/icons';
import { type PlanItem } from "../types";

interface StatisticsProps {
    plansV: PlanItem[]
}

function Statistics({ plansV }: StatisticsProps) {
    // 计算已完成
    const completedCount = plansV.filter(p => p.isCompleted).length;
    // 计算总数
    const totalCount = plansV.length;
    // 计算未完成
    const todoCount = totalCount - completedCount;

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="已完成任务"
                            value={completedCount}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                            suffix={`/ ${totalCount}`}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="待办任务"
                            value={todoCount}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<FormOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Statistics;