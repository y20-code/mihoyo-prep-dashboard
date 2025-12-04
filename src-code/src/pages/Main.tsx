import {useState} from 'react'
import type{PlanType, PlanItem} from '../types'
import { useNavigate } from 'react-router-dom';
//引入 Ant Design 组件
import {Input,Select,Button,List,Checkbox,Tag,Typography,Card,Space} from 'antd';
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';



const {Option} = Select;
const { Text, Title } = Typography;



interface MainProps{
    onAdd: (content:string,type:PlanType) => void;
    plansV: PlanItem[];
    onDelete: (id:number) => void;
    onToggle: (id: number) => void;
}

function Main({onAdd,plansV,onDelete,onToggle}:MainProps){

    

    const [inputValue,setInputValue] = useState<string>("");
    const [selectValue,setSelectValue] = useState<PlanType>('algorithm')

    const navigate = useNavigate();

    // 定义一个颜色映射，方便 Tag 使用
    const typeColors: Record<PlanType, string> = {
        algorithm: 'magenta',
        theory: 'geekblue',
        project: 'gold'
    };


    const handleAdd = () =>{
        if (!inputValue.trim()) return;

        onAdd(inputValue,selectValue)

        setInputValue("");
    }

    // 
    // const handleKeyDown = (e:React.KeyboardEvent) =>{
    //     if(e.key ==="Enter") handleAdd()
    // }

    


    return(
        <div style={{ padding: '20px' }}>
            <Card  
                title={<Title level={3} style={{margin:0}} >🚀 米哈游备战任务板</Title>} 
                variant="outlined"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
            <Space.Compact style={{width:'100%', marginBottom: '20px' }}>
                <Select
                    defaultValue="algorithm"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e as PlanType)}
                    style={{ width: '120px' }}
                >
                    <Option value="algorithm">算法 🧠</Option>
                    <Option value="theory">理论 📖</Option>
                    <Option value="project">项目 💻</Option>
                </Select>
                
                <Input 
                    placeholder='请输入任务'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleAdd}
                />
                
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    添加
                </Button>
                
            </Space.Compact>
            
            {/* 列表区 */}
            <List
                dataSource={plansV}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => {e.stopPropagation(); onDelete(item.id)}}/>
                        ]}
                        onClick={() =>{
                            navigate(`/detail/${item.id}`)
                        }}
                        style={{cursor: 'pointer'}}
                    >

                        <List.Item.Meta
                            // avatar 放勾选框
                            avatar={
                                <Checkbox 
                                    checked={item.isCompleted}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => onToggle(item.id)} 
                                />
                            }
                            // title 放主要内容
                            title={
                                <Typography.Text delete={item.isCompleted} style={{ color: item.isCompleted ? '#999' : 'inherit' }}>
                                    {item.content}
                                </Typography.Text>
                            }
                            // description 放标签
                            description={
                                <Tag color={typeColors[item.type]}>
                                    {item.type.toUpperCase()}
                                </Tag>
                            }
                            
                        />
                    </List.Item>
                )}
            />

            
            </Card>
        </div>
    )
}

export default Main