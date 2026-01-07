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
            title: '练习 2:悬浮按钮', 
            description: '使用 Group 进行分组，掌握 BackTop 回到顶部功能以及 tooltip 悬浮提示。',
            path:'float-button',
        },
        { 
            key: 3, 
            title: '练习 3:排版 Typography', 
            description: '使用 editable 属性实现文本编辑',
            path:'Typography',
        }

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

