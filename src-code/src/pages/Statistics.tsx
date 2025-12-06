// src/pages/Statistics.tsx
import {useMemo} from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { CheckCircleOutlined, FormOutlined } from '@ant-design/icons';
import { type PlanItem } from "../types";

interface StatisticsProps {
    plansV: PlanItem[]
}

function Statistics({ plansV }: StatisticsProps) {
    

    // 2. 使用 useMemo 缓存计算结果
    // 只有当 plansV 发生变化时，这里才会重新执行
    // 如果父组件因为其他原因 render 了，这里直接复用旧值！
    const {completedCount,totalCount,todoCount} = useMemo(() => {
        console.log("正在重新计算统计数据...");
        const total = plansV.length;
        const completed = plansV.filter(p => p.isCompleted).length;
        return {
            completedCount:completed,
            totalCount:total,
            todoCount:total - completed 
        }

    },[plansV]);


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