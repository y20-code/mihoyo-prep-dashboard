import {useState,useEffect, useCallback} from "react"
import type { PlanType,PlanItem } from "../types"

export function usePlans(){

    const [plans,setPlans] = useState<PlanItem[]>(() =>{
        const saved = localStorage.getItem("mihoyo-plans");
        if (saved) {
            try {
                return JSON.parse(saved); // 把字符串变回数组
            } catch (e) {
                return []; // 如果数据坏了，就返回空
            }
        }
        return [];
    })

    useEffect(() => {
        localStorage.setItem("mihoyo-plans",JSON.stringify(plans))
    },[plans])

    //添加一个任务
    const addPlan = useCallback((content:string,type:PlanType) =>{
        const newPlan:PlanItem = {
            id:Date.now(),
            content,
            isCompleted:false,
            type,
            createdAt:Date.now()
        };

        setPlans(plans => [...plans,newPlan])
    },[]);

    //删除一个任务
    const deletePlan = useCallback((id: number) => {
        setPlans(prev => prev.filter((item) => item.id !== id));
    }, []);

    // 3. 切换状态 (打钩/取消)
    const toggleTodo = useCallback((id: number) => {
        setPlans(prev => prev.map((item) => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
        }));
    }, []);
    

    return {addPlan,deletePlan,toggleTodo,plans}
}