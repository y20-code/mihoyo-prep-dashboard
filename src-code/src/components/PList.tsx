import { useState } from 'react';
import {List,Card} from 'antd';
import { useNavigate } from 'react-router-dom';

function PList() {

    const navigate = useNavigate();

    const [data, setData] = useState([
        { 
            key: 1, 
            title: '练习 1:弹窗与表单(Modal & Form)', 
            description: '学习如何使用 Modal 控制显示，以及 Form 获取数据'
        },
        { 
            key: 2, 
            title: '练习 2:待定...', 
            description: '下个练习做这里'
        },

    ]);

    return (
        <Card title="练习列表">
            <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                    // renderItem: 负责把每一条数据渲染成样子
                    <List.Item 
                        onClick={() =>{
                            navigate(`/Practice/${item.key}`)
                        }}
                        style={{cursor: 'pointer'}}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default PList;