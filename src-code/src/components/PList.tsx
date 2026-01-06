import { useState } from 'react';
import {List,Card,message} from 'antd';
import { useNavigate } from 'react-router-dom';


interface PracticeItem {
    key:number;
    title:string;
    description:string;
    path?:string;
}
function PList() {

    const navigate = useNavigate();

    const [data, setData] = useState<PracticeItem[]>([
        { 
            key: 1, 
            title: '练习 1:按钮Button', 
            description: '掌握 type(样式)、size(尺寸)、shape(形状) 和 danger(危险状态) 的组合使用。',
            path:'button',
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
                            if (item.path){
                                navigate(`/Practice/${item.path}`)
                            } else {
                                message.info('该练习尚未完成，敬请期待！')
                            }
                            
                        }}
                        style={{ cursor: item.path ? 'pointer' : 'not-allowed' }}
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

