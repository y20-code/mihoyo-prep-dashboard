import {useState} from 'react'
import type{PlanType, PlanItem} from '../types'



interface planInputProps{
    onAdd: (content:string,type:PlanType) => void;
    plansV: PlanItem[];
    onDelete: (id:number) => void;
    onToggle: (id: number) => void;
}

function Main({onAdd,plansV,onDelete,onToggle}:planInputProps){

    const [inputValue,setInputValue] = useState<string>("");
    const [selectValue,setSelectValue] = useState<PlanType>('algorithm')


    const handleAdd = () =>{
        if (!inputValue.trim()) return;

        onAdd(inputValue,selectValue)

        setInputValue("");
    }


    const handleKeyDown = (e:React.KeyboardEvent) =>{
        if(e.key ==="Enter") handleAdd()
    }

    


    return(
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="请输入任务"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <select value={selectValue} onChange={(e) => setSelectValue(e.target.value as PlanType )}>
                    <option value="algorithm" >algorithm</option>
                    <option value="theory" >theory</option>
                    <option value="project" >project</option>
                </select>
            </div>
            
            <ul>
                {plansV.map((item) => 
                    (
                        <li key={item.id}>{item.content}
                            
                            <input 
                                type="checkbox" 
                                checked={item.isCompleted}
                                onChange={() => onToggle(item.id)}
                            />

                            <span style={{ 
                                textDecoration: item.isCompleted ? 'line-through' : 'none',
                                color: item.isCompleted ? '#888' : '#000',
                                flex: 1 
                            }}>
                            {item.content} 
                            <span style={{ fontSize: '12px', marginLeft: '5px', color: '#666', background: '#f0f0f0', padding: '2px 5px', borderRadius: '4px' }}>
                                {item.type}
                            </span>
                        </span>
                        <button onClick={() => onDelete(item.id)}>x</button>
                        </li>
                        
                    )
                            
                        
                    )
                }
            </ul>
        </div>
    )
}

export default Main