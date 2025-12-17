import {useState,useEffect, useCallback} from "react"
import type { PlanType,PlanItem } from "../types"

import { planService } from "../services/planService";

export function usePlans(){

    const [loading,setLoading] = useState(false);

    const [plans,setPlans] = useState<PlanItem[]>([]);

    const fetchPlans = useCallback (async () =>{
        setLoading (true);

        try {
            const data = await planService.getAll();
            setPlans(data);
        } finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchPlans();
    },[fetchPlans])

    //添加一个任务
    const addPlan = async (content:string,type:PlanType) =>{
        const tempId = Date.now();

        await planService.add(content,type);

        await fetchPlans();
    };

    //删除一个任务
    const deletePlan = async(id: number) => {
        await planService.delete(id);
        setPlans(prev => prev.filter((item) => item.id !== id));
    };

    // 3. 切换状态 (打钩/取消)
    const toggleTodo = async(id: number) => {
        setPlans(prev => prev.map((item) => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted };
            }else{
                return item;
            }
        }));

        await planService.toggle(id);
    };
    

    return {addPlan,deletePlan,toggleTodo,plans,loading}
}