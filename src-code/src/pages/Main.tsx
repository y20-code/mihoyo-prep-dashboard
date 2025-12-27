import { useState, useEffect, useMemo } from 'react' // 引入 useEffect
import type{ PlanType, PlanItem } from '../types'
import { useNavigate } from 'react-router-dom';
//引入 Ant Design 组件
import { Input, Select, Button, List, Checkbox, Tag, Typography, Card, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useDebounce } from '../hooks/useDebounce';

const { Option } = Select;
const { Title } = Typography;

interface MainProps{
    onAdd: (content:string,type:PlanType) => void;
    plansV: PlanItem[];
    onDelete: (id:number) => void;
    onToggle: (id: number) => void;
    loading?: boolean;
}

// 子组件：可拖拽的 Item
function SortableItem({item, onDelete, onToggle, navigate, typeColors}: any){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging, // 可以利用这个属性改变拖拽时的样式
    } = useSortable({id: item.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // 拖拽时稍微提高层级，变透明一点
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <List.Item
                actions={[
                    // 注意：拖拽时最好避免触发删除，但这里为了简单先保留
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => {
                        // 阻止事件冒泡，防止点击删除时触发了拖拽或者跳转
                        e.stopPropagation(); 
                        // e.preventDefault(); // 有时候需要
                        onDelete(item.id)
                    }}/>
                ]}
                onClick={() => {navigate(`/detail/${item.id}`)}}
                // NOTE 3: 修正颜色代码 #f0f0f0
                style={{cursor:'grab', background:'#fff', marginBottom:8, border:'1px solid #f0f0f0', borderRadius:4, padding:12}}
            >
                <List.Item.Meta
                    avatar={<Checkbox checked={item.isCompleted} onClick={(e) => e.stopPropagation()} onChange={() => onToggle(item.id)} />}
                    title={<Typography.Text delete={item.isCompleted} style={{ color: item.isCompleted ? '#999' : 'inherit' }}>{item.content}</Typography.Text>}
                    description={<Tag color={typeColors[item.type]}>{item.type.toUpperCase()}</Tag>}
                />  
            </List.Item>
        </div>
    );
}

function Main({onAdd, plansV, onDelete, onToggle, loading}: MainProps){

    const [inputValue, setInputValue] = useState<string>("");
    const [selectValue, setSelectValue] = useState<PlanType>('algorithm')
    const [searchTerm, setSearchTerm] = useState("");
    
    // 搜索相关
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    // 颜色映射
    const typeColors: Record<PlanType, string> = {
        algorithm: 'magenta',
        theory: 'geekblue',
        project: 'gold'
    };

    // --- 拖拽排序逻辑 ---
    const [localPlans, setLocalPlans] = useState(plansV);

    // NOTE 2: 改成 useEffect。只有当 plansV (父组件数据) 变化时，才同步到本地
    useEffect(() => {
        setLocalPlans(plansV);
    }, [plansV]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // 避免鼠标只是点一下 click 也触发拖拽
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if(active.id !== over?.id){
            setLocalPlans((prevPlans) =>{
                const oldIndex = prevPlans.findIndex(plan => plan.id === active.id);
                const newIndex = prevPlans.findIndex(plan => plan.id === over?.id);
                return arrayMove(prevPlans, oldIndex, newIndex);
            });
        }
    }

    // --- 搜索过滤逻辑 ---
    const filteredPlans = useMemo(() => {
        if (!debouncedSearchTerm) return plansV;
        return plansV.filter(plan => 
            plan.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [plansV, debouncedSearchTerm]);

    const handleAdd = () =>{
        if (!inputValue.trim()) return;
        onAdd(inputValue, selectValue)
        setInputValue("");
    }

    return(
        <div style={{ padding: '20px' }}>
            <Card  
                title={<Title level={3} style={{margin:0}} >🚀 米哈游备战任务板</Title>} 
                variant="outlined"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
                <Input 
                    placeholder="🔍 搜索任务..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: 20 }}
                    allowClear
                    prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                />

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
            
                {/* NOTE 1: 核心修改 
                   如果有搜索词 -> 显示普通 List (用 filteredPlans)
                   如果没有搜索词 -> 显示 DndContext (用 localPlans)
                */}
                {debouncedSearchTerm ? (
                    // 搜索模式：不可拖拽
                    <List
                        loading={loading}
                        dataSource={filteredPlans}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => {e.stopPropagation(); onDelete(item.id)}}/>]}
                                onClick={() => navigate(`/detail/${item.id}`)}
                                style={{cursor: 'pointer'}}
                            >
                                <List.Item.Meta
                                    avatar={<Checkbox checked={item.isCompleted} onClick={(e) => e.stopPropagation()} onChange={() => onToggle(item.id)} />}
                                    title={<Typography.Text delete={item.isCompleted} style={{ color: item.isCompleted ? '#999' : 'inherit' }}>{item.content}</Typography.Text>}
                                    description={<Tag color={typeColors[item.type]}>{item.type.toUpperCase()}</Tag>}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    // 正常模式：可拖拽
                    <DndContext 
                        sensors={sensors} 
                        collisionDetection={closestCenter} 
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext 
                            items={localPlans.map(p => p.id)} 
                            strategy={verticalListSortingStrategy}
                        >
                            <div style={{marginTop: 20}}>
                                {localPlans.map((item) => (
                                    <SortableItem 
                                        key={item.id} 
                                        item={item} 
                                        onDelete={onDelete}
                                        onToggle={onToggle}
                                        navigate={navigate}
                                        typeColors={typeColors}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            
            </Card>
        </div>
    )
}

export default Main;